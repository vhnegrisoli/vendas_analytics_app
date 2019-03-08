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

class ClienteForm extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      cliente: [],
      estados: [],
      cidade: [],
      endereco: [],
    };
  }

  componentWillMount() {}

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState(prevState => {
      return { fadeIn: !prevState };
    });
  }

  handleChange(e) {
    axios.get('http://localhost:8080/api/estados/listar').then(res => {
      this.setState({
        estados: res.data,
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
      endereco: {
        rua: data.get('rua'),
        cep: data.get('cep'),
        complemento: data.get('complemento'),
        cidade: data.get('cidade'),
        numero: data.get('numero'),
        estado: {
          id: data.get('estado'),
        },
      },
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Col xs="12" md="12">
          <Card>
            <CardHeader>
              <strong>Clientes </strong> - Cadastrar
            </CardHeader>
            <CardBody>
              <Form
                id="cliente-form"
                className="form-horizontal"
                onSubmit={this.onSubmit.bind(this)}
              >
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Nome completo*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" id="nome" required name="nome" placeholder="Nome completo" />
                    <FormText color="muted">Digite o nome completo do cliente.</FormText>
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
                    />
                    <FormText className="help-block">Digite o email.</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="cpf-input">CPF*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" id="cpf" name="cpf" placeholder="CPF" autoComplete="cpf" />
                    <FormText className="help-block">Digite o CPF.</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="rg-input">RG*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" id="rg" name="rg" placeholder="RG" autoComplete="rg" />
                    <FormText className="help-block">Digite o RG.</FormText>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="date-input">Data de Nascimento*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="date"
                      id="dataNascimento"
                      name="dataNascimento"
                      placeholder="date"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="telefone-input">Telefone/Celular*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="telefone"
                      id="telefone"
                      name="telefone"
                      placeholder="Telefone"
                      autoComplete="telefone"
                    />
                    <FormText className="help-block">Digite o telefone.</FormText>
                  </Col>
                </FormGroup>
                <label>
                  <strong>Endereço </strong>
                </label>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Rua*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" id="rua" required name="rua" placeholder="Rua" />
                    <FormText color="muted">Digite o nome da rua.</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Número*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="number" id="numero" required name="numero" placeholder="Número" />
                    <FormText color="muted">Digite o número da rua.</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">CEP*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" id="cep" required name="cep" placeholder="CEP" />
                    <FormText color="muted">Digite o CEP da rua.</FormText>
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
                      required
                      name="complemento"
                      placeholder="Complemento"
                    />
                    <FormText color="muted">Digite algum complemento (opcional).</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Cidade*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" id="cidade" required name="cidade" placeholder="Cidade" />
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

export default ClienteForm;
