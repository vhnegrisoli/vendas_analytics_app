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
      precoTotal: 0.0,
      qtdTotal: 0.0
    };

    axios.get('http://localhost:8080/api/produtos/todos').then(res => {
      this.setState({
        produtos: res.data,
      });
    });
  }

  componentWillMount() { }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState(prevState => {
      return { fadeIn: !prevState };
    });
  }

  handleChangeCliente(e) {
    axios.get('http://localhost:8080/api/clientes/todos').then(res => {
      this.setState({
        clientes: res.data,
      });
    });

  }

  onSubmit(e) {
    let data = new FormData(e.target);
    axios.post('http://localhost:8080/api/clientes/salvar', {
      id: data.get('id'),
      nome: data.get('nome'),
      email: data.get('email'),
      cpf: data.get('cpf'),
      rg: data.get('rg'),
      telefone: data.get('telefone'),
      dataNascimento: data.get('dataNascimento'),
      rua: data.get('rua'),
      cep: data.get('cep'),
      complemento: data.get('complemento'),
      cidade: data.get('cidade'),
      numero: data.get('numero'),
      estado: {
        id: data.get('estado'),
      },
    });
  }

  precoOnClick(e) {
    let data = new FormData(e.target);
    this.setState = {
      precoTotal: data.get('produtos')
    }
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
              <Form
                id="cliente-form"
                className="form-horizontal"
                onSubmit={this.onSubmit.bind(this)}
              >
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Cliente*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="select"
                      name="estado"
                      onClick={this.handleChangeCliente.bind(this)}
                      required
                      id="estado"
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
                          <td><CustomInput onClick={this.precoOnClick.bind(this)} type="checkbox" name="produto" id={produto.id} value={produto.preco}></CustomInput></td>
                          <td><Input type="number" name="quantidade" id={produto.id} ></Input></td>
                        </tr>

                      ))}

                    </tbody>
                  </Table>
                  <Table>
                    <tr>
                      <td><strong>Total de itens: {this.state.qtdTotal}</strong></td>
                      <td><strong>Total a pagar: R${this.state.precoTotal.toFixed(2)}</strong></td>
                    </tr>
                  </Table>
                </FormGroup>

                <FormGroup>
                  <Col xs="12" md="4">
                    <Label check> Aprovação*:<br></br><br></br>
                      <Input type="radio" name="aprovacao" id="aprovada" /> APROVADA <br></br>
                      <Input type="radio" name="aprovacao" id="aguardando" /> AGUARDANDO APROVAÇÃO<br></br>
                      <Input type="radio" name="aprovacao" id="rejeitada" /> REJEITADA<br></br>
                    </Label>
                  </Col>
                </FormGroup>

                <br></br>
                <Button type="submit" size="sm" color="success">
                  <i className="fa fa-dot-circle-o" />
                  Realizar venda
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
