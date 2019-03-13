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

class UsuarioForm extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);

    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      clientes: [],
      permissoes: [],
      nome: '',
      email: '',
      senha: '',
      cliente: '',
      permissoesUsuario: '',
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8080/api/clientes/todos').then(res => {
      this.setState({
        clientes: res.data,
      });
    });

    axios.get('http://localhost:8080/api/usuarios/permissoes').then(res => {
      this.setState({
        permissoes: res.data,
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

  onSubmit(e) {
    e.preventDefault();
    axios
      .post('http://localhost:8080/api/usuarios/salvar', {
        nome: this.state.nome,
        email: this.state.email,
        senha: this.state.senha,
        cliente: { id: this.state.cliente },
        permissoesUsuario: { id: this.state.permissoesUsuario },
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
              <strong>Usuários de Clientes </strong> - Cadastrar
            </CardHeader>
            <CardBody>
              <Form id="cliente-form" className="form-horizontal" onSubmit={e => this.onSubmit(e)}>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Nome completo*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="nome"
                      required
                      name="nome"
                      placeholder="Nome completo"
                      value={this.state.nome}
                      onChange={e => this.onChange(e)}
                    />
                    <FormText color="muted">Digite o nome completo do usuário.</FormText>
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
                    <Label htmlFor="select">Cliente Proprietário*</Label>
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
                      <option value="0">Por favor, selecione o cliente:</option>
                      {this.state.clientes.map(cliente => (
                        <option value={cliente.id}>{cliente.nome}</option>
                      ))}
                    </Input>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Permissão*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="select"
                      name="permissoesUsuario"
                      required
                      id="permissoesUsuario"
                      value={this.state.permissoesUsuario}
                      onChange={e => this.onChange(e)}
                    >
                      <option value="0">
                        Por favor, selecione a permissão de acesso do usuário:
                      </option>
                      {this.state.permissoes.map(permissao => (
                        <option value={permissao.id}>
                          {permissao.permissao + ' - ' + permissao.descricao}
                        </option>
                      ))}
                    </Input>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="email-input">Crie uma senha*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="password"
                      id="senha"
                      name="senha"
                      placeholder="Senha"
                      autoComplete="email"
                      value={this.state.senha}
                      onChange={e => this.onChange(e)}
                    />
                    <FormText className="help-block">Crie uma senha.</FormText>
                  </Col>
                </FormGroup>
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

export default UsuarioForm;
