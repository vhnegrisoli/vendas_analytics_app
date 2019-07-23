import React, { Component } from 'react';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { withGlobalState } from 'react-globally';

const urlLogin = 'https://vendas-analytics-app.herokuapp.com/#/login';
const urlAlterarSenha = 'https://vendas-analytics-api.herokuapp.com/api/usuarios/atualizar-senha';
let token = '';
class AtualizarSenha extends Component {
  constructor(props) {
    super(props);
    token = document.cookie.includes('token')
      ? document.cookie
          .split('token=')[1]
          .replace('"', '')
          .replace('"', '')
          .split(';')[0]
      : '';
    if (token === '') {
      window.location.href = 'https://vendas-analytics-app.herokuapp.com/#/login';
    }
    this.state = {
      isLoading: false,
      senha: '',
      confirmarSenha: '',
      isSenhaInvalida: false,
    };
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

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  async atualizarSenha() {
    await axios
      .put(
        urlAlterarSenha,
        {
          usuarioId: this.getUrlParameter(),
          novaSenha: this.state.senha,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then(res => {
        if (res.status === 200) {
          if (res.data.senha !== 'alterar') {
            window.location.href = urlLogin;
          }
        }
      });
  }

  senhasIguais() {
    return this.state.confirmarSenha === this.state.senha;
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({
      isLoading: true,
      isSenhaInvalida: false
    });
    if (this.senhasIguais()) {
      this.atualizarSenha();
    } else {
      this.setState({
        isLoading: false,
        isSenhaInvalida: true,
      });
    }
    this.forceUpdate();
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={e => this.onSubmit(e)}>
                      <h1>Alterar senha</h1>
                      <p className="text-muted">Digite sua nova senha:</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          name="senha"
                          placeholder="Digite sua nova senha"
                          required
                          onChange={e => this.onChange(e)}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          name="confirmarSenha"
                          placeholder="Confirmar nova senha"
                          required
                          onChange={e => this.onChange(e)}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary">Atualizar senha</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                  {this.state.isSenhaInvalida && (
                    <Alert color="danger">
                      <div>
                        <Label>As senhas não batem, por favor, digite novamente.</Label>
                      </div>
                    </Alert>
                  )}
                  {this.state.isLoading && (
                    <Alert color="warning">
                      <div>
                        <ReactLoading type={'spin'} />
                        <Label>Estamos atualizando, aguarde...</Label>
                      </div>
                    </Alert>
                  )}
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withGlobalState(AtualizarSenha);
