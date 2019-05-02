import React, { Component } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
} from 'reactstrap';

const urlListarFornecedores = 'http://localhost:3000/#/fornecedores/listar';
class FornecedorForm extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      categorias: [],
      produtos: [],
      razaoSocial: '',
      nomeFantasia: '',
      cnpj: '',
      endereco: '',
    };
    this.initilize();
  }

  async initilize() {
    if (this.getUrlParameter()) {
      await axios
        .get('http://localhost:8080/api/fornecedores/buscar/' + this.getUrlParameter())
        .then(res => {
          this.setState({
            razaoSocial: res.data.razaoSocial,
            nomeFantasia: res.data.nomeFantasia,
            cnpj: res.data.cnpj,
            endereco: res.data.endereco,
          });
        });
    }
  }

  getUrlParameter() {
    var url = window.location.toString().split('/');
    var id = url[url.length - 1];
    if (!isNaN(id)) {
      return parseInt(url[url.length - 1]);
    } else {
      return '';
    }
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

  editar() {
    axios
      .post('http://localhost:8080/api/fornecedores/salvar', {
        id: this.getUrlParameter(),
        nomeFantasia: this.state.nomeFantasia,
        razaoSocial: this.state.razaoSocial,
        cnpj: this.state.cnpj,
        endereco: this.state.endereco,
      })
      .then(res => {
        if (res.status === 200) {
          window.location.href = urlListarFornecedores;
        }
      })
      .catch(error => {
        this.setState = {
          error: true,
        };
      });
  }

  salvar() {
    axios
      .post('http://localhost:8080/api/fornecedores/salvar', {
        nomeFantasia: this.state.nomeFantasia,
        razaoSocial: this.state.razaoSocial,
        cnpj: this.state.cnpj,
        endereco: this.state.endereco,
      })
      .then(res => {
        if (res.status === 200) {
          window.location.href = urlListarFornecedores;
        }
      })
      .catch(error => {
        this.setState = {
          error: true,
        };
      });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    if (this.getUrlParameter()) {
      this.editar();
    } else {
      this.salvar();
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Col xs="12" md="12">
          <Card>
            <CardHeader>
              <strong>Fornecedor </strong> - Cadastrar
            </CardHeader>
            <CardBody>
              <Form id="cliente-form" className="form-horizontal" onSubmit={e => this.onSubmit(e)}>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Razão Social do Fornecedor*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="text-input"
                      required
                      name="razaoSocial"
                      placeholder="Razão social"
                      value={this.state.razaoSocial}
                      onChange={e => this.onChange(e)}
                    />
                    <FormText color="muted">Digite a razão social.</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="cpf-input">Nome Fantasia do Fornecedor*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="descricao-input"
                      name="nomeFantasia"
                      placeholder="Nome Fantasia"
                      autoComplete="descricao"
                      value={this.state.nomeFantasia}
                      onChange={e => this.onChange(e)}
                    />
                    <FormText className="help-block">Digite o nome fantasia.</FormText>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="cpf-input">CNPJ do Fornecedor*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="descricao-input"
                      name="cnpj"
                      placeholder="CNPJ"
                      autoComplete="descricao"
                      value={this.state.cnpj}
                      onChange={e => this.onChange(e)}
                    />
                    <FormText className="help-block">Digite o CNPJ.</FormText>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="cpf-input">Endereço do Fornecedor*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="descricao-input"
                      name="endereco"
                      placeholder="Endereço"
                      autoComplete="descricao"
                      value={this.state.endereco}
                      onChange={e => this.onChange(e)}
                    />
                    <FormText className="help-block">Digite o endereço.</FormText>
                  </Col>
                </FormGroup>

                <FormGroup row />
                <Button size="sm" color="success">
                  <i className="fa fa-dot-circle-o" /> Cadastrar
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}

export default FornecedorForm;
