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
  Row,
} from 'reactstrap';
import axios from 'axios';
import ReactLoading from 'react-loading';

const getTokenUrl = 'http://localhost:8080/oauth/token';
const urlCriarConta = 'http://localhost:3000/#/clientes/cadastrar';

let token = ''

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
      senha: '',
      isSucess: false,
      successData: '',
      errors: [],
      token: ''
    };
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async login() {
    const form = new FormData();
    form.append('client_id', 'vendas_analytics-client');
    form.append('client_secret', 'vendas_analytics-secret');
    form.append('username', this.state.email);
    form.append('password', this.state.senha);
    form.append('grant_type', 'password');
    const Authorization = `Basic dmVuZGFzX2FuYWx5dGljcy1jbGllbnQ6dmVuZGFzX2FuYWx5dGljcy1zZWNyZXQ=`
    const Content_Type = `application/x-www-form-urlencoded`
    const urlHome = 'http://localhost:3000/#/dashboard'
    let token = ''
    await axios
      .post(getTokenUrl, form, {
        Headers: {
          Authorization, Content_Type
        },
      })
      .then(res => {
        this.setState = {
          isLoading: false,
        };
        if (res.status === 200) {
          this.setState = {
            token: res.data.access_token
          }
          token = res.data.access_token
          window.location.href = urlHome
        } else {
          this.setState({
            errors: res.response.data,
            isSucess: false,
            isLoading: false,
          });
        }
      });
    this.props.token(token)
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState = {
      isLoading: true,
    };
    this.forceUpdate();
    this.login();
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
                      <h1>Login</h1>
                      <p className="text-muted">Entre com sua conta</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="email"
                          name="email"
                          placeholder="Digite seu email"
                          value={this.state.email}
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
                          name="senha"
                          placeholder="Digite sua senha"
                          required
                          value={this.state.senha}
                          onChange={e => this.onChange(e)}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button onClick={e => this.onSubmit(e)} color="primary">
                            Login
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <a color="link" className="px-0">
                            Esqueceu sua senha?
                          </a>
                        </Col>
                        {this.state.isLoading && <ReactLoading type={'spin'} />}
                        {this.state.isSucess && (
                          <Alert color="success">
                            <strong>{this.state.successData}</strong>
                          </Alert>
                        )}
                        {!this.state.isSucess && this.state.errors.details && (
                          <Alert color="danger">
                            <strong>{this.state.errors.details}</strong>
                          </Alert>
                        )}
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: '44%' }}
                >
                  <CardBody className="text-center">
                    <div>
                      <h2>Crie sua conta!</h2>
                      <p>
                        Crie uma conta e começe agora a utilizar essa ferramenta de Business
                        Intelligence e Analytics para o tratamento de suas vendas!
                      </p>
                      <Button color="primary" className="mt-3" href={urlCriarConta}>
                        Cadastre-se!
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
