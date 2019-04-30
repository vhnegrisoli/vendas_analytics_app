import React, { Component } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Table,
  Modal,
  ModalHeader,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

let mensagemErro = '';

const urlAprovacaoVendas = 'http://localhost:3000/#/aprovar-venda';
class TratarVendaFormAdmin extends Component {
  constructor(props) {
    super(props);

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
      isLoading: true,
      detalheErro: [],
    };
    this.initialize();
  }

  async initialize() {
    await axios.get('http://localhost:8080/api/produtos/todos').then(res => {
      this.setState({
        produtos: res.data,
      });
    });

    await axios.get('http://localhost:8080/api/clientes/todos').then(res => {
      this.setState({
        clientes: res.data,
        isLoading: false,
      });
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

  async onSubmit() {
    this.toggle();
    await axios
      .post('http://localhost:8080/api/vendas/salvar', {
        clientes: { id: this.state.cliente },
        produtos: this.state.produtoVenda,
      })
      .then(res => {
        if (res.status === 200) {
          window.location.href = urlAprovacaoVendas;
        }
      })
      .catch(res => {
        this.state.detalheErro = res.response.data;
      });
    console.log(this.state.detalheErro);
    this.forceUpdate();
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
    if (this.state.quantidade > 0) {
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
    } else {
      this.errorModal();
    }
    this.forceUpdate();
  }

  removerProduto(id) {
    var array = [];
    for (var i = 0; i < this.state.produtosAdicionados.length; i++) {
      if (!this.state.produtosAdicionados[i].id === id) {
        array[i] = this.state.produtosAdicionados[i];
      }
    }
    console.log(array);
    this.setState({
      produtosAdicionados: array,
    });
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
                <strong>Tratar Venda </strong> - Administrador
              </CardHeader>
              <CardBody>
                <Form id="venda" className="form-horizontal" onSubmit={e => this.onSubmit(e)}>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Cliente*</Label>
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
                          Por favor, selecione um cliente:
                        </option>
                        {this.state.clientes.map(cliente => (
                          <option type="option" value={cliente.id}>
                            {cliente.nome}
                          </option>
                        ))}
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup name="produtos">
                    <Table responsive hover>
                      <thead>
                        <tr>
                          <th scope="col">Produto</th>
                          <th scope="col">Descrição do Produto</th>
                          <th scope="col">Preço</th>
                          <th scope="col">Fornecedor</th>
                          <th scope="col">Selecionar Item</th>
                          <th scope="col">Quantidade</th>
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
                              <Input
                                type="number"
                                name="quantidade"
                                id="quantidade"
                                value={this.state.produtoVenda.quantidade}
                                onChange={e => this.onChange(e)}
                              />
                            </td>
                            <td>
                              <Button
                                color="primary"
                                onClick={e =>
                                  this.adicionaProduto(
                                    {
                                      id: produto.id,
                                      nome: produto.nomeProduto,
                                      descricao: produto.descricao,
                                      preco: produto.preco,
                                      quantidade: null,
                                    },
                                    e,
                                  )
                                }
                              >
                                Adicionar produto
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Card>
                      <CardHeader>
                        Itens adicionados:
                        <br />
                        {this.state.produtosAdicionados.length === 0 ? (
                          <label>
                            <strong> Você não possui produtos adicionados</strong>
                          </label>
                        ) : (
                          <Table>
                            <thead>
                              <tr>
                                <th scope="col">Código do Produto</th>
                                <th scope="col">Nome do Produto</th>
                                <th scope="col">Preço do Produto</th>
                                <th scope="col">Quantidade</th>
                                <th scope="col">Remover</th>
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
                                      Remover item
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        )}
                      </CardHeader>
                    </Card>
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
                  </FormGroup>
                  <br />
                  <Button onClick={this.toggle} size="sm" color="success">
                    <i className="fa fa-dot-circle-o" /> Tratar venda
                  </Button>

                  <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                  >
                    <ModalHeader toggle={this.toggle}>Deseja salvar a venda?</ModalHeader>
                    <ModalFooter>
                      <Button color="primary" onClick={() => this.onSubmit()}>
                        Salvar
                      </Button>{' '}
                      <Button color="secondary" onClick={this.toggle}>
                        Cancelar
                      </Button>
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
            {this.state.detalheErro.details && (
              <Card>
                <CardHeader className="text-danger">
                  <strong>Erro ao salvar venda</strong>
                </CardHeader>
                <CardBody>
                  <h6 className="text-danger">
                    <strong>* {this.state.detalheErro.details}</strong>
                  </h6>
                </CardBody>
              </Card>
            )}
          </Col>
        )}
      </div>
    );
  }
}

export default TratarVendaFormAdmin;
