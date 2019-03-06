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
    };
  }

  componentDidMount() {
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

  onSubmit() {
    var form = document.querySelector('cliente-form');
    var data = new FormData(form);
    axios.post('localhost:8080/api/clientes/salvar', {
      data: data,
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
                action=""
                method="post"
                encType="multipart/form-data"
                className="form-horizontal"
              >
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Nome completo*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="text-input"
                      required
                      name="text-input"
                      placeholder="Nome completo"
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
                      id="email-input"
                      name="email-input"
                      placeholder="Email"
                      autoComplete="email"
                    />
                    <FormText className="help-block">Digite o email.</FormText>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Cliente Proprietário*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="select" name="select" required id="select">
                      <option value="0">Por favor, selecione o cliente:</option>
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
                      type="email"
                      id="email-input"
                      name="email-input"
                      placeholder="Senha"
                      autoComplete="email"
                    />
                    <FormText className="help-block">Crie uma senha.</FormText>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
            <CardFooter>
              <Button type="submit" size="sm" color="primary">
                <i className="fa fa-dot-circle-o" />
                Cadastrar
              </Button>
            </CardFooter>
          </Card>
        </Col>
      </div>
    );
  }
}

export default UsuarioForm;
