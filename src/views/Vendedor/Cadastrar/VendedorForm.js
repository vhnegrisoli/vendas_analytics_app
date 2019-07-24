import React, { Component } from 'react';
import axios from 'axios';
import {
  Alert,
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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import InputMask from 'react-input-mask';
import { validate } from 'cpf-check';

const urlListarClientes = 'http://localhost:3000/#/vendedores/listar';
let token = '';
let Authorization = '';
class VendedorForm extends Component {
  constructor(props) {
    super(props);
    let tokenCookie = document.cookie.includes('token')
      ? document.cookie
          .split('token=')[1]
          .replace('"', '')
          .replace('"', '')
          .split(';')[0]
      : '';
    let permissao = document.cookie.includes('permissao')
      ? document.cookie
          .split('permissao=')[1]
          .replace('"', '')
          .replace('"', '')
          .split(';')[0]
      : '';
    token = tokenCookie;
    if (permissao === 'USER') {
      window.location.href = 'http://localhost:3000/#/403';
    }
    if (tokenCookie === '') {
      window.location.href = 'http://localhost:3000/#/login';
    }
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      estados: [],
      nome: '',
      email: '',
      cpf: '',
      rg: '',
      dataNascimento: new Date(),
      telefone: '',
      rua: '',
      numero: '',
      cep: '',
      complemento: '',
      cidade: '',
      estado: '',
      cpfInvalidoMessage: false,
      cepError: false,
    };
    Authorization = `Bearer ${token}`;
    this.handleDataNascimento = this.handleDataNascimento.bind(this);
    this.getUrlParameter();
    this.initilize();
  }

  async initilize() {
    await axios
      .get('http://localhost:8080/api/estados/listar', {
        headers: { Authorization },
      })
      .then(res => {
        this.setState({
          estados: res.data,
        });
      })
      .catch(error => {
        if (error.message.includes('401')) {
          window.location.href = 'http://localhost:3000/#/login';
        }
      });
    if (this.getUrlParameter()) {
      await axios
        .get('http://localhost:8080/api/vendedores/buscar/' + this.getUrlParameter(), {
          headers: { Authorization },
        })
        .then(res => {
          this.setState({
            nome: res.data.nome,
            email: res.data.email,
            cpf: res.data.cpf,
            rg: res.data.rg,
            dataNascimento: res.data.dataNascimento,
            telefone: res.data.telefone,
            rua: res.data.rua,
            numero: res.data.numero,
            cep: res.data.cep,
            complemento: res.data.complemento,
            cidade: res.data.cidade,
            estado: res.data.estado.id,
          });
        });
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

  handleChange(e) {}

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    this.forceUpdate();
    if (e.target.name === 'cep') {
      this.getDadosEndereco();
    }
  };

  handleDataNascimento(date) {
    this.setState({
      startDate: date,
    });
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

  editar() {
    axios
      .post(
        'http://localhost:8080/api/vendedores/salvar',
        {
          id: this.getUrlParameter(),
          nome: this.state.nome,
          email: this.state.email,
          cpf: this.state.cpf,
          rg: this.state.rg,
          telefone: this.state.telefone,
          dataNascimento: this.state.startDate.toISOString().split('T')[0],
          rua: this.state.rua,
          cep: this.state.cep,
          complemento: this.state.complemento,
          cidade: this.state.cidade,
          numero: this.state.numero,
          estado: { id: this.state.estado },
        },
        {
          headers: { Authorization },
        },
      )
      .then(res => {
        if (res.status === 200) {
          window.location.href = urlListarClientes;
        }
      })
      .catch(error => {
        this.setState = {
          error: true,
        };
      });
  }

  formatDate(date) {
    var dateArr = date.split('/');
    return dateArr[2] + '-' + dateArr[0] + '-' + dateArr[1];
  }

  salvar() {
    axios
      .post(
        'http://localhost:8080/api/vendedores/salvar',
        {
          nome: this.state.nome,
          email: this.state.email,
          cpf: this.state.cpf,
          rg: this.state.rg,
          telefone: this.state.telefone,
          dataNascimento: this.state.startDate.toISOString().split('T')[0],
          rua: this.state.rua,
          cep: this.state.cep,
          complemento: this.state.complemento,
          cidade: this.state.cidade,
          numero: this.state.numero,
          estado: { id: this.state.estado },
        },
        {
          headers: { Authorization },
        },
      )
      .then(res => {
        if (res.status === 200) {
          window.location.href = urlListarClientes;
        }
      })
      .catch(error => {
        this.setState = {
          error: true,
        };
      });
  }

  cpfCompleto(cpf) {
    return (
      cpf.substring(cpf.length - 1) !== '_' &&
      cpf.substring(cpf.length - 1) !== undefined &&
      cpf !== ''
    );
  }

  cepCompleto(cep) {
    return (
      cep.substring(cep.length - 1) !== '_' &&
      cep.substring(cep.length - 1) !== undefined &&
      cep !== ''
    );
  }

  setEstado(uf) {
    var estados = this.state.estados;
    for (var i = 0; i < estados.length; i++) {
      if (estados[i].sigla === uf) {
        this.setState({
          estado: estados[i].id,
        });
        break;
      }
    }
  }

  async getDadosEndereco() {
    if (this.cepCompleto(this.state.cep)) {
      var cepFormatado = this.state.cep.replace('.', '').replace('-', '');
      await axios
        .get(`https://viacep.com.br/ws/${cepFormatado}/json`)
        .then(res => {
          if (res.status === 200) {
            if (res.data.erro) {
              this.setState({
                cepError: true,
              });
            } else {
              this.setState({
                rua: res.data.logradouro,
                cidade: res.data.localidade,
                complemento: res.data.complemento,
                cepError: false,
              });
              this.setEstado(res.data.uf);
            }
          }
        })
        .catch(error => {
          this.setState({
            cepError: true,
          });
        });
      this.forceUpdate();
    }
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    if (!this.state.cepError) {
      if (!validate(this.state.cpf)) {
        this.setState({
          cpfInvalidoMessage: true,
        });
      } else {
        if (this.getUrlParameter()) {
          this.editar();
        } else {
          this.salvar();
        }
      }
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Col xs="12" md="12">
          <Card>
            <CardHeader>
              <strong>Vendedores </strong> - Cadastrar
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
                      value={this.state.nome}
                      onChange={e => this.onChange(e)}
                      required
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
                      id="cpf"
                      mask="999.999.999-99"
                      tag={InputMask}
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
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="rg-input">RG*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="rg"
                      name="rg"
                      placeholder="RG"
                      autoComplete="rg"
                      value={this.state.rg}
                      onChange={e => this.onChange(e)}
                    />
                    <FormText className="help-block">Digite o RG.</FormText>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="date-input">Data de Nascimento*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      selected={this.state.startDate}
                      selectsStart
                      maxDate={
                        new Date(
                          new Date().getFullYear() - 18,
                          new Date().getMonth(),
                          new Date().getDay(),
                        )
                      }
                      onChange={this.handleDataNascimento}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="telefone-input">Telefone/Celular*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      mask="(99) 9 9999-9999"
                      tag={InputMask}
                      type="telefone"
                      id="telefone"
                      name="telefone"
                      placeholder="Telefone"
                      autoComplete="telefone"
                      value={this.state.telefone}
                      onChange={e => this.onChange(e)}
                    />
                    <FormText className="help-block">Digite o telefone.</FormText>
                  </Col>
                </FormGroup>
                <label>
                  <strong>Endereço </strong>
                </label>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">CEP*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="cep"
                      mask="99.999-999"
                      tag={InputMask}
                      required
                      name="cep"
                      placeholder="CEP"
                      value={this.state.cep}
                      onChange={e => this.onChange(e)}
                    />
                    <FormText color="muted">Digite o CEP da rua.</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col xs="12" md="12">
                    {this.state.cepError && <Alert color="danger">Erro: CEP não encontrado.</Alert>}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Rua*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="rua"
                      required
                      name="rua"
                      placeholder="Rua"
                      value={this.state.rua}
                      onChange={e => this.onChange(e)}
                    />
                    <FormText color="muted">Digite o nome da rua.</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Número*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="number"
                      id="numero"
                      required
                      name="numero"
                      placeholder="Número"
                      value={this.state.numero}
                      onChange={e => this.onChange(e)}
                    />
                    <FormText color="muted">Digite o número da rua.</FormText>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Complemento</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="complemento"
                      name="complemento"
                      placeholder="Complemento"
                      value={this.state.complemento}
                      onChange={e => this.onChange(e)}
                    />
                    <FormText color="muted">Digite algum complemento (opcional).</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Cidade*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="cidade"
                      required
                      name="cidade"
                      value={this.state.cidade}
                      onChange={e => this.onChange(e)}
                      placeholder="Cidade"
                    />
                    <FormText color="muted">Digite a cidade.</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Estado*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="select"
                      name="estado"
                      onClick={this.handleChange.bind(this)}
                      required
                      id="estado"
                      value={this.state.estado}
                      onChange={e => this.onChange(e)}
                    >
                      <option type="option" value="0">
                        Por favor, selecione um estado:
                      </option>
                      {this.state.estados.map(estado => (
                        <option type="option" value={estado.id}>
                          {estado.estado}
                        </option>
                      ))}
                    </Input>
                  </Col>
                </FormGroup>
                <Button size="sm" color="success">
                  <i className="fa fa-dot-circle-o" /> Salvar
                </Button>
              </Form>
            </CardBody>
            {this.state.cpfInvalidoMessage && (
              <Alert color="danger">
                Não é possível salvar o vendedor pois o CPF está inválido!
              </Alert>
            )}
          </Card>
        </Col>
      </div>
    );
  }
}

export default VendedorForm;
