import React, { Component } from 'react';
import axios from 'axios';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
} from 'reactstrap';
import ReactLoading from 'react-loading';

let token = '';
let Authorization = '';
let permissao;
const urlListarUsuarios = 'https://vendas-analytics-app-hom.herokuapp.com/#/usuarios/listar';
class UsuarioForm extends Component {
  constructor(props) {
    super(props);
    let tokenCookie = document.cookie.includes('token')
      ? document.cookie
          .split('token=')[1]
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
    if (permissao === 'USER') {
      window.location.href = 'https://vendas-analytics-app-hom.herokuapp.com/#/403';
    }
    if (tokenCookie === '') {
      window.location.href = 'https://vendas-analytics-app-hom.herokuapp.com/#/login';
    }
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
      situacao: null,
      situacoes: [{ situacao: 'ATIVO' }, { situacao: 'INATIVO' }],
      cliente: '',
      permissoesUsuario: '',
      errors: [],
      usuarioProprietario: '',
      admins: [],
      exibeProprietarios: false,
      errorSalvar: false,
      isPostLoading: false,
    };
    Authorization = `Bearer ${token}`;
    this.initialize();
  }

  async initialize() {
    if (this.getUrlParameter()) {
      await axios
        .get('https://vendas-analytics-api-postgres.herokuapp.com/api/usuarios/buscar/' + this.getUrlParameter(), {
          headers: { Authorization },
        })
        .then(res => {
          this.setState({
            nome: res.data.nome,
            email: res.data.email,
            senha: res.data.senha,
            vendedor: res.data.vendedor.id,
            permissoesUsuario: res.data.permissoesUsuario.id,
            situacao: res.data.situacao,
            usuarioProprietario: this.state.usuarioProprietario,
          });
        })
        .catch(error => {
          if (error.message.includes('401')) {
            window.location.href = 'https://vendas-analytics-app-hom.herokuapp.com/#/login';
          }
          if (error.message.includes('404')) {
            window.location.href = 'https://vendas-analytics-app-hom.herokuapp.com/#/usuarios/listar';
          }
        });
    }

    await axios
      .get('https://vendas-analytics-api-postgres.herokuapp.com/api/usuarios/buscar-administradores', {
        headers: { Authorization },
      })
      .then(res => {
        this.setState({
          admins: res.data,
        });
      });

    await axios
      .get('https://vendas-analytics-api-postgres.herokuapp.com/api/vendedores/todos', {
        headers: { Authorization },
      })
      .then(res => {
        this.setState({
          clientes: res.data,
        });
      });

    await axios
      .get('https://vendas-analytics-api-postgres.herokuapp.com/api/usuarios/permissoes', {
        headers: { Authorization },
      })
      .then(res => {
        if (permissao === 'ADMIN') {
          this.setState({
            permissoes: [res.data[0], res.data[1]],
          });
        } else {
          this.setState({
            permissoes: res.data,
          });
        }
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
    if (e.target.name === 'permissoesUsuario' && e.target.value !== '1') {
      this.setState({
        usuarioProprietario: null,
      });
    }
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getUrlParameter() {
    var url = window.location.toString().split('/');
    var id = url[url.length - 1];
    if (!isNaN(id)) {
      return parseInt(url[url.length - 1]);
    } else {
      return '';
    }
  }

  async editar() {
    await axios
      .post(
        'https://vendas-analytics-api-postgres.herokuapp.com/api/usuarios/salvar',
        {
          id: this.getUrlParameter(),
          nome: this.state.nome,
          email: this.state.email,
          senha: this.state.senha,
          vendedor: { id: this.state.cliente },
          permissoesUsuario: { id: this.state.permissoesUsuario },
          situacao: this.state.situacao,
          usuarioProprietario: this.state.usuarioProprietario,
        },
        { headers: { Authorization } },
      )
      .then(res => {
        if (res.status === 200) {
          window.location.href = urlListarUsuarios;
        } else {
          this.setState({ isPostLoading: false });
        }
      })
      .catch(res => {
        this.setState({ isPostLoading: false });
        this.state.errors = res.response.data;
      });
    this.forceUpdate();
  }

  async salvar() {
    console.log(this.state);
    await axios
      .post(
        'https://vendas-analytics-api-postgres.herokuapp.com/api/usuarios/salvar',
        {
          nome: this.state.nome,
          email: this.state.email,
          senha: this.state.senha,
          vendedor: { id: this.state.cliente !== '' ? this.state.cliente : null },
          permissoesUsuario: { id: this.state.permissoesUsuario },
          usuarioProprietario:
            this.state.usuarioProprietario !== '' ? this.state.usuarioProprietario : null,
        },
        { headers: { Authorization } },
      )
      .then(res => {
        if (res.status === 200) {
          window.location.href = urlListarUsuarios;
        } else {
          this.setState({ isPostLoading: false });
        }
      })
      .catch(res => {
        this.setState({ isPostLoading: false });
        this.state.errors = res.response.data;
      });
    this.forceUpdate();
  }

  onSubmit(e) {
    e.preventDefault();
    if (
      this.state.permissoesUsuario &&
      this.state.permissoesUsuario === '1' &&
      (this.state.usuarioProprietario === '' || this.state.usuarioProprietario === null)
    ) {
      this.setState({ errorSalvar: true });
    } else {
      this.setState({ errorSalvar: false });
      this.setState({ isPostLoading: true });
      if (this.getUrlParameter()) {
        this.editar();
      } else {
        this.salvar();
      }
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Col xs="12" md="12">
          <Card>
            <CardHeader>
              <strong>Usuários de Vendedores </strong> - Cadastrar
            </CardHeader>
            <CardBody>
              <Form id="cliente-form" className="form-horizontal" onSubmit={e => this.onSubmit(e)}>
                <CardBody>
                  <Card>
                    <CardFooter>
                      <strong>Permissão </strong>
                      <FormGroup check>
                        <Label check>
                          <Input
                            value={this.state.descricao}
                            onClickCapture={e => this.onChange(e)}
                            type="radio"
                            name="permissoesUsuario"
                            value="1"
                          />{' '}
                          Usuário Vendedor
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input
                            value={this.state.descricao}
                            onClickCapture={e => this.onChange(e)}
                            type="radio"
                            name="permissoesUsuario"
                            value="2"
                          />{' '}
                          Administrador
                        </Label>
                      </FormGroup>
                      {permissao === 'SUPER_ADMIN' && (
                        <FormGroup check>
                          <Label check>
                            <Input
                              value={this.state.descricao}
                              onClickCapture={e => this.onChange(e)}
                              type="radio"
                              name="permissoesUsuario"
                              value="3"
                            />{' '}
                            Super Administrador
                          </Label>
                        </FormGroup>
                      )}
                    </CardFooter>
                  </Card>
                </CardBody>
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
                    <Label htmlFor="select">Vendedor Proprietário*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="select"
                      name="cliente"
                      id="cliente"
                      value={this.state.cliente}
                      onChange={e => this.onChange(e)}
                    >
                      <option value={''}>Por favor, selecione o vendedor:</option>
                      {this.state.clientes.map(cliente => (
                        <option value={cliente.id}>{cliente.nome}</option>
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
                {this.state.permissoesUsuario && this.state.permissoesUsuario === '1' && (
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Usuário Proprietário</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="select"
                        name="usuarioProprietario"
                        id="usuarioProprietario"
                        value={this.state.usuarioProprietario}
                        onChange={e => this.onChange(e)}
                      >
                        <option value="">Por favor, selecione o usuário proprietário:</option>
                        {this.state.admins.map(admin => (
                          <option value={admin.id}>{admin.nome}</option>
                        ))}
                      </Input>
                    </Col>
                  </FormGroup>
                )}
                {this.getUrlParameter() && (
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Situações</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="select"
                        name="situacao"
                        id="permissoesUsuario"
                        value={this.state.situacao}
                        onChange={e => this.onChange(e)}
                      >
                        <option value="">Por favor, selecione a situação do usuário:</option>
                        {this.state.situacoes.map(situacao => (
                          <option value={situacao.situacao}>{situacao.situacao}</option>
                        ))}
                      </Input>
                    </Col>
                  </FormGroup>
                )}
                {this.state.isPostLoading ? (
                  <ReactLoading type={'spin'} color={'#59B459'} />
                ) : (
                  <Button size="sm" color="success">
                    <i className="fa fa-dot-circle-o" /> Cadastrar
                  </Button>
                )}
              </Form>
            </CardBody>
            {this.state.errors.details && (
              <Alert color="danger">
                <strong>* Erro ao salvar usuário: {this.state.errors.details}</strong>
              </Alert>
            )}
            {this.state.errorSalvar && (
              <Alert color="danger">
                <strong>* É necessário preencher todos os campos</strong>
              </Alert>
            )}
          </Card>
        </Col>
      </div>
    );
  }
}

export default UsuarioForm;
