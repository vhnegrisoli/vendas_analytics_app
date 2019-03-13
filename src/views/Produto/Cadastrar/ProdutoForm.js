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
  Row,
} from 'reactstrap';
import { format } from 'path';

class ProdutoForm extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      categorias: [],
      fornecedores: [],
      nomeProduto: '',
      preco: 0.0,
      descricao: '',
      categoria: '',
      fornecedor: '',
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8080/api/categorias/todas').then(res => {
      this.setState({
        categorias: res.data,
      });
    });

    axios.get('http://localhost:8080/api/fornecedores/todos').then(res => {
      this.setState({
        fornecedores: res.data,
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

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getProdutoCadastro() {
    var produtoCadastro = {
      nomeProduto: this.state.nomeProduto,
      descricao: this.state.descricao,
      preco: this.state.preco,
      categoria: { id: this.state.categoria },
      fornecedor: { id: this.state.fornecedor },
    };
    return produtoCadastro;
  }

  onSubmit(e) {
    e.preventDefault();
    var produto = this.getProdutoCadastro();
    // console.log(produto);
    axios
      .post('http://localhost:8080/api/produtos/salvar', {
        nomeProduto: this.state.nomeProduto,
        descricao: this.state.descricao,
        preco: this.state.preco,
        categoria: { id: this.state.categoria },
        fornecedor: { id: this.state.fornecedor },
      })
      .then(res => {
        console.log(res.status);
      });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Col xs="12" md="12">
          <Card>
            <CardHeader>
              <strong>Produtos </strong> - Cadastrar
            </CardHeader>
            <CardBody>
              <Form id="cliente-form" onSubmit={e => this.onSubmit(e)} className="form-horizontal">
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Nome do Produto*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="text-input"
                      required
                      name="nomeProduto"
                      placeholder="Nome do Produto"
                      value={this.state.nomeProduto}
                      onChange={e => this.onChange(e)}
                    />
                    <FormText color="muted">Digite o nome do produto.</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="cpf-input">Descrição do Produto*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="descricao-input"
                      name="descricao"
                      placeholder="Descrição"
                      autoComplete="descricao"
                      value={this.state.descricao}
                      onChange={e => this.onChange(e)}
                    />
                    <FormText className="help-block">Adicione uma breve descrição.</FormText>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="cpf-input">Preço do Produto*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="number"
                      id="descricao-input"
                      name="preco"
                      placeholder="Preço"
                      autoComplete="descricao"
                      value={this.state.preco}
                      onChange={e => this.onChange(e)}
                    />
                    <FormText className="help-block">Informe o preço do produto.</FormText>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Categoria de Produto*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="select"
                      name="categoria"
                      required
                      id="select"
                      value={this.state.categoria}
                      onChange={e => this.onChange(e)}
                    >
                      <option value="0">Por favor, selecione uma categoria:</option>
                      {this.state.categorias.map(categoria => (
                        <option value={categoria.id}>{categoria.descricao}</option>
                      ))}
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row />

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Fornecedor do Produto*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="select"
                      name="fornecedor"
                      required
                      id="select"
                      value={this.state.fornecedor}
                      onChange={e => this.onChange(e)}
                    >
                      <option value="0">Por favor, selecione o fornecedor:</option>
                      {this.state.fornecedores.map(fornecedor => (
                        <option value={fornecedor.id}>{fornecedor.nomeFantasia}</option>
                      ))}
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row />
                <Button type="submit" size="sm" color="success">
                  <i className="fa fa-dot-circle-o" />
                  Cadastrar
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}

export default ProdutoForm;
