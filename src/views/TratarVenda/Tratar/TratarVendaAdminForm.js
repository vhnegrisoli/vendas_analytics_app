import React, { Component } from 'react';
import axios from 'axios';
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Table,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  CustomInput,
  Row,
} from 'reactstrap';
import { format } from 'path';
import { hidden } from 'ansi-colors';

let precoTotal = 0;
let produtosCarrinho = [];

class TratarVendaFormAdmin extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
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
    };

    axios.get('http://localhost:8080/api/produtos/todos').then(res => {
      this.setState({
        produtos: res.data,
      });
    });

    axios.get('http://localhost:8080/api/clientes/todos').then(res => {
      this.setState({
        clientes: res.data,
      });
    });
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState(prevState => {
      return { fadeIn: !prevState };
    });
  }

  onSubmit(e) {
    axios.post('http://localhost:8080/api/vendas/salvar', {
      aprovacao: this.state.aprovacao,
      produtos: {
        idProduto: this.state.produtos.id,
        quantidade: this.state.produtos.quantidade,
      },
    });
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getPreco(preco) {
    precoTotal = precoTotal + preco;
  }

  adicionaProduto(produto) {
    produto.quantidade = this.state.quantidade;
    produtosCarrinho.push(produto);
    this.setState({
      quantidade: 0,
    });
    this.forceUpdate();
    console.log(produtosCarrinho);
  }

  render() {
    return (
      <div className="animated fadeIn">
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
                                    nome: produto.nome,
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
                      <Table>
                        <thead>
                          {this.state.produtosAdicionados.idProduto ? (
                            <tr>
                              <th scope="col">Código do Produto</th>
                              <th scope="col">Quantidade</th>
                            </tr>
                          ) : (
                            'Você ainda não adicionou produtos'
                          )}
                        </thead>
                        <tbody>
                          {this.state.produtosAdicionados.map(item => (
                            <tr>
                              <td>{item.nomeProduto}</td>
                              <td>{item.descricao}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </CardHeader>
                  </Card>
                  <Table>
                    <tr>
                      <td>
                        <strong>Total de itens: {precoTotal}</strong>
                      </td>
                      <td>
                        <strong>Total a pagar: R${precoTotal.toFixed(2)}</strong>
                      </td>
                    </tr>
                  </Table>
                </FormGroup>

                <FormGroup>
                  <Col xs="12" md="4">
                    <Label check>
                      {' '}
                      Aprovação*:
                      <br />
                      <br />
                      <Input type="radio" name="aprovacao" id="aprovada" /> APROVADA <br />
                      <Input type="radio" name="aprovacao" id="aguardando" /> AGUARDANDO APROVAÇÃO
                      <br />
                      <Input type="radio" name="aprovacao" id="rejeitada" /> REJEITADA
                      <br />
                    </Label>
                  </Col>
                </FormGroup>

                <br />
                <Button type="submit" size="sm" color="success">
                  <i className="fa fa-dot-circle-o" /> Tratar venda
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}

export default TratarVendaFormAdmin;
