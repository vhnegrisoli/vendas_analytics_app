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
    };
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
    axios.post('localhost:8080/api/fornecedores/salvar', {
      data: data,
    });
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
              <Form
                id="cliente-form"
                action=""
                method="post"
                encType="multipart/form-data"
                className="form-horizontal"
              >
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Razão Social do Fornecedor*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="text-input"
                      required
                      name="text-input"
                      placeholder="Razão social"
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
                      name="descricao-input"
                      placeholder="Nome Fantasia"
                      autoComplete="descricao"
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
                      name="descricao-input"
                      placeholder="CNPJ"
                      autoComplete="descricao"
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
                      name="descricao-input"
                      placeholder="Endereço"
                      autoComplete="descricao"
                    />
                    <FormText className="help-block">Digite o endereço.</FormText>
                  </Col>
                </FormGroup>

                <FormGroup row />
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

export default FornecedorForm;
