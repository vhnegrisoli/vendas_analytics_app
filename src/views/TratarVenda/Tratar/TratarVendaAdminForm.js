import React, { Component } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Form,
  FormText,
  FormGroup,
  Table,
  Modal,
  ModalHeader,
  ModalFooter,
  Input,
  Label,
} from 'reactstrap';
import InputMask from 'react-input-mask';
import { validate } from 'cpf-check';

let token = '';
let Authorization = '';
const urlAprovacaoVendas = 'https://vendas-analytics-app-hom.herokuapp.com/#/aprovar-venda';
let usuario = '';
let permissao = '';
class TratarVendaFormAdmin extends Component {
  constructor(props) {
    super(props);
    let tokenCookie = document.cookie.includes('token')
      ? document.cookie
          .split('token=')[1]
          .replace('"', '')
          .replace('"', '')
          .split(';')[0]
      : '';
    usuario = document.cookie.includes('user')
      ? document.cookie
          .split('user=')[1]
          .replace('"', '')
          .replace('"', '')
          .split(';')[0]
      : '';
    permissao = document.cookie.includes('permissao')
      ? document.cookie
          .split('permissao=')[1]
          .replace('"', '')
          .replace('"', '')
          .split(';')[0]
      : '';
    token = tokenCookie;
    if (tokenCookie === '') {
      window.location.href = 'https://vendas-analytics-app-hom.herokuapp.com/#/login';
    }
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      modal: false,
      errorModal: false,
      fadeIn: true,
      timeout: 300,
      clientes: [],
      produtos: [],
      produtosAdicionados: [],
      idProduto: '',
      cliente: '',
      produtoVenda: [],
      preco: 0.0,
      aprovacao: '',
      quantidade: 0,
      quantidades: [],
      nome: '',
      email: '',
      cpf: '',
      isLoading: true,
      detalheErro: [],
      cpfInvalidoMessage: false,
      isPostLoading: false,
      openProdutoModal: false,
      closeProdutoModal: false,
      produtoSelecionado: null,
    };
    Authorization = `Bearer ${token}`;
    this.initialize();
  }

  async initialize() {
    await axios
      .get('https://vendas-analytics-api-postgres.herokuapp.com/api/produtos/todos', {
        headers: { Authorization },
      })
      .then(res => {
        this.setState({
          produtos: res.data,
        });
      })
      .catch(error => {
        if (error.message.includes('401')) {
          window.location.href = 'https://vendas-analytics-app-hom.herokuapp.com/#/login';
        }
      });

    await axios
      .get('https://vendas-analytics-api-postgres.herokuapp.com/api/vendedores/todos', {
        headers: { Authorization },
      })
      .then(res => {
        this.setState({
          clientes: res.data,
          isLoading: false,
        });
        if (permissao === 'USER') {
          this.setState({
            cliente: res.data[0].id,
          });
        }
      });
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  toggleFade() {
    this.setState(prevState => {
      return { fadeIn: !prevState };
    });
  }

  errorModal() {
    this.setState(prevState => ({
      errorModal: !prevState.errorModal,
    }));
  }

  openProdutoModal(produto) {
    this.setState({
      openProdutoModal: true,
      closeProdutoModal: false,
      produtoSelecionado: produto,
    });
  }

  closeProdutoModal() {
    this.setState({ openProdutoModal: false, closeProdutoModal: true });
  }

  cpfCompleto(cpf) {
    return (
      cpf.substring(cpf.length - 1) !== '_' &&
      cpf.substring(cpf.length - 1) !== undefined &&
      cpf !== ''
    );
  }

  async onSubmit() {
    this.setState({ isPostLoading: true });
    if (!validate(this.state.cpf)) {
      this.setState({
        cpfInvalidoMessage: true,
        isPostLoading: false,
      });
    } else {
      this.toggle();
      await axios
        .post(
          'https://vendas-analytics-api-postgres.herokuapp.com/api/vendas/salvar',
          {
            vendedor: { id: this.state.cliente },
            produtos: this.state.produtoVenda,
            clienteNome: this.state.nome,
            clienteEmail: this.state.email,
            clienteCpf: this.state.cpf,
          },
          {
            headers: { Authorization },
          },
        )
        .then(res => {
          if (res.status === 200) {
            window.location.href = urlAprovacaoVendas;
          } else {
            this.setState({ isPostLoading: false });
          }
        })
        .catch(res => {
          this.setState({ isPostLoading: false });
          this.state.detalheErro = res.response.data;
        });
      this.forceUpdate();
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getPreco() {
    var precoTotal = 0;
    this.state.produtosAdicionados.map(
      preco => (precoTotal = precoTotal + preco.preco * preco.quantidade),
    );
    return precoTotal;
  }

  getQtd() {
    var qtdTotal = 0;
    this.state.produtosAdicionados.map(qtd => (qtdTotal = qtdTotal + parseInt(qtd.quantidade)));
    return qtdTotal;
  }

  adicionaProduto(produto) {
    var quantidade = this.state.quantidade;
    quantidade = this.validarQuantidade(quantidade);
    if (quantidade > 0) {
      if (this.produtoJaAdicionado(produto)) {
        this.tratarProdutoJaAdicionado(produto);
      } else {
        produto.quantidade = this.state.quantidade;
        var produtoVendaAdd = {
          id: { produtoId: produto.id },
          quantidade: produto.quantidade,
        };
        this.state.produtoVenda.push(produtoVendaAdd);
        this.state.produtosAdicionados.push(produto);
        this.setState({
          quantidade: 0,
        });
      }
      this.closeProdutoModal();
    } else {
      this.errorModal();
    }
    this.forceUpdate();
  }

  validarQuantidade(quantidade) {
    if (quantidade.includes('.')) {
      this.state.quantidade = parseInt(quantidade.split('.')[0]);
      return parseInt(quantidade.split('.')[0]);
    }
    return quantidade;
  }

  produtoJaAdicionado(produto) {
    for (var i = 0; i < this.state.produtosAdicionados.length; i++) {
      if (this.state.produtosAdicionados[i].id === produto.id) {
        return true;
      }
    }

    return false;
  }

  tratarProdutoJaAdicionado(produto) {
    for (var i = 0; i < this.state.produtosAdicionados.length; i++) {
      if (this.state.produtosAdicionados[i].id === produto.id) {
        this.state.produtosAdicionados[i].quantidade =
          parseInt(this.state.produtosAdicionados[i].quantidade) + parseInt(this.state.quantidade);
      }
    }
    for (var i = 0; i < this.state.produtoVenda.length; i++) {
      if (this.state.produtoVenda[i].id.produtoId === produto.id) {
        this.state.produtoVenda[i].quantidade = this.state.produtosAdicionados[i].quantidade;
      }
    }
  }

  removerProduto(id) {
    var array = [];
    var arrayProdutoVenda = [];
    this.state.produtosAdicionados.map(produto => {
      if (produto.id !== id) {
        array.push(produto);
      }
    });
    this.state.produtoVenda.map(produto => {
      if (produto.id.produtoId !== id) {
        arrayProdutoVenda.push(produto);
      }
    });
    this.state.produtosAdicionados = array;
    this.state.produtoVenda = arrayProdutoVenda;
    this.forceUpdate();
  }

  render() {
    return (
      <div className="animated fadeIn">
        {this.state.isLoading ? (
          <ReactLoading type={'spin'} />
        ) : (
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <strong>Tratar Venda </strong> - {usuario} | Cargo:{' '}
                {permissao === 'USER' ? 'Vendedor' : 'Administrador'}
              </CardHeader>
              <CardBody>
                <Form id="venda" className="form-horizontal" onSubmit={e => this.onSubmit(e)}>
                  {permissao !== 'USER' && (
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="select">Vendedor*</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input
                          type="select"
                          name="cliente"
                          required
                          id="cliente"
                          value={this.state.cliente}
                          onChange={e => this.onChange(e)}
                        >
                          <option type="option" value="0">
                            Por favor, selecione um vendedor:
                          </option>
                          {this.state.clientes.map(cliente => (
                            <option type="option" value={cliente.id}>
                              {cliente.nome}
                            </option>
                          ))}
                        </Input>
                      </Col>
                    </FormGroup>
                  )}
                  <FormGroup name="produtos">
                    <Table responsive hover>
                      <thead>
                        <tr>
                          <th scope="col">Produto</th>
                          <th scope="col">Descrição do Produto</th>
                          <th scope="col">Preço</th>
                          <th scope="col">Fornecedor</th>
                          <th scope="col">Adicionar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.produtos.map(produto => (
                          <tr>
                            <td>{produto.nomeProduto}</td>
                            <td>{produto.descricao}</td>
                            <td>{'R$' + parseFloat(produto.preco).toFixed(2)}</td>
                            <td>{produto.fornecedor.nomeFantasia}</td>
                            <td>
                              <Button
                                color="primary"
                                onClick={e =>
                                  this.openProdutoModal({
                                    id: produto.id,
                                    nome: produto.nomeProduto,
                                    descricao: produto.descricao,
                                    preco: produto.preco,
                                    quantidade: null,
                                  })
                                }
                              >
                                <span class="cui-cart" aria-hidden="true" />
                              </Button>
                              {this.state.produtoSelecionado && (
                                <Modal
                                  isOpen={this.state.openProdutoModal}
                                  toggle={() => this.closeProdutoModal()}
                                  className={this.props.className}
                                >
                                  <ModalHeader toggle={() => this.closeProdutoModal()}>
                                    Deseja adicionar o produto {this.state.produtoSelecionado.nome}?
                                  </ModalHeader>
                                  <ModalFooter>
                                    <Col md="9">
                                      <Label>Digite a quantidade:</Label>
                                      <Input
                                        type="number"
                                        name="quantidade"
                                        id="quantidade"
                                        min="1"
                                        value={this.state.produtoVenda.quantidade}
                                        onChange={e => this.onChange(e)}
                                      />
                                      <br />
                                      <Button
                                        color="primary"
                                        onClick={e =>
                                          this.adicionaProduto(this.state.produtoSelecionado, e)
                                        }
                                      >
                                        Adicionar produto
                                      </Button>{' '}
                                      <Button
                                        color="secondary"
                                        onClick={() => this.closeProdutoModal()}
                                      >
                                        Cancelar
                                      </Button>
                                    </Col>
                                  </ModalFooter>
                                </Modal>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Card>
                      <CardHeader>
                        <span class="cui-cart" aria-hidden="true" />{' '}
                        <strong>Carrinho de Compras</strong>
                      </CardHeader>
                      <CardBody>
                        {this.state.produtosAdicionados.length === 0 ? (
                          <label>
                            <strong> Carrinho vazio</strong>
                          </label>
                        ) : (
                          <Table>
                            <thead>
                              <tr>
                                <th scope="col">Código do Produto</th>
                                <th scope="col">Nome do Produto</th>
                                <th scope="col">Preço do Produto</th>
                                <th scope="col">Quantidade</th>
                                <th scope="col">Remover Item</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.produtosAdicionados.map(item => (
                                <tr>
                                  <td>{item.id}</td>
                                  <td>{item.nome}</td>
                                  <td>{'R$' + item.preco.toFixed(2)}</td>
                                  <td>{item.quantidade}</td>
                                  <td>
                                    <Button
                                      size="sm"
                                      color="danger"
                                      onClick={() => this.removerProduto(item.id)}
                                    >
                                      <span class="cui-delete" aria-hidden="true" /> Remover
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        )}
                      </CardBody>
                      <CardFooter>
                        <Table>
                          <tr>
                            <td>
                              <strong>Total de itens: {this.getQtd()}</strong>
                            </td>
                            <td>
                              <strong>Total a pagar: R${this.getPreco().toFixed(2)}</strong>
                            </td>
                          </tr>
                        </Table>
                      </CardFooter>
                    </Card>
                    <Card>
                      <CardHeader>
                        <span class="cui-user" aria-hidden="true" />{' '}
                        <strong>Dados do Cliente</strong>
                      </CardHeader>
                      <CardBody>
                        <FormGroup row>
                          <Col md="3">
                            <Label htmlFor="text-input">Nome completo*</Label>
                          </Col>
                          <Col xs="12" md="9">
                            <Input
                              type="text"
                              id="nome"
                              value={this.state.nome}
                              onChange={e => this.onChange(e)}
                              required
                              pattern="^[^\s].+[^\s]$"
                              name="nome"
                              placeholder="Nome completo"
                            />
                            <FormText color="muted">Digite o nome completo do vendedor.</FormText>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md="3">
                            <Label htmlFor="email-input">Email*</Label>
                          </Col>
                          <Col xs="12" md="9">
                            <Input
                              type="email"
                              id="email"
                              required
                              pattern="^[^\s].+[^\s]$"
                              name="email"
                              placeholder="Email"
                              autoComplete="email"
                              value={this.state.email}
                              onChange={e => this.onChange(e)}
                            />
                            <FormText className="help-block">Digite o email.</FormText>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md="3">
                            <Label htmlFor="cpf-input">CPF*</Label>
                          </Col>
                          <Col xs="12" md="9">
                            <Input
                              type="text"
                              mask="999.999.999-99"
                              tag={InputMask}
                              id="cpf"
                              required
                              pattern="^[^\s].+[^\s]$"
                              name="cpf"
                              placeholder="CPF"
                              autoComplete="cpf"
                              value={this.state.cpf}
                              onChange={e => this.onChange(e)}
                            />
                            <FormText className="help-block">Digite o CPF.</FormText>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col xs="12" md="12">
                            {this.cpfCompleto(this.state.cpf) && !validate(this.state.cpf) && (
                              <Alert color="danger">CPF INVÁLIDO!</Alert>
                            )}
                          </Col>
                        </FormGroup>
                      </CardBody>
                    </Card>
                  </FormGroup>
                  <br />
                  {this.state.isPostLoading ? (
                    <ReactLoading type={'spin'} color={'#59B459'} />
                  ) : (
                    <Button onClick={this.toggle} size="sm" color="success">
                      <i className="fa fa-dot-circle-o" /> Tratar venda
                    </Button>
                  )}
                  <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                  >
                    <ModalHeader toggle={this.toggle}>Deseja salvar a venda?</ModalHeader>
                    <ModalFooter>
                      {this.state.isPostLoading ? (
                        <ReactLoading type={'spin'} color={'#0080FF'} />
                      ) : (
                        <Button color="primary" onClick={() => this.onSubmit()}>
                          Salvar
                        </Button>
                      )}
                      {this.state.isPostLoading ? (
                        <ReactLoading type={'spin'} color={'#E5E5FF'} />
                      ) : (
                        <Button color="secondary" onClick={this.toggle}>
                          Cancelar
                        </Button>
                      )}
                    </ModalFooter>
                  </Modal>
                  <Modal
                    isOpen={this.state.errorModal}
                    toggle={this.errorModal}
                    className={this.props.className}
                  >
                    <ModalHeader>
                      Selecione ao menos uma quantidade para cada item e um cliente.
                    </ModalHeader>
                    <ModalFooter>
                      <Button color="secondary" onClick={() => this.errorModal()}>
                        Voltar
                      </Button>
                    </ModalFooter>
                  </Modal>
                </Form>
              </CardBody>
            </Card>
            {this.state.cpfInvalidoMessage && (
              <Alert color="danger">
                Não é possível salvar o vendedor pois o CPF está inválido!
              </Alert>
            )}
            {this.state.detalheErro.details && (
              <Alert color="danger">
                <strong>* Erro ao salvar venda: {this.state.detalheErro.details}</strong>
              </Alert>
            )}
          </Col>
        )}
      </div>
    );
  }
}

export default TratarVendaFormAdmin;
