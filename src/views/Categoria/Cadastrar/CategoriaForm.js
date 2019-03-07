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
import { format } from 'path';

class CategoriaForm extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      categoria: null,
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

  onSubmit(e) {
    let data = new FormData(e.target);
    let categoria = {
      id: parseInt(data.get('id')),
      descricao: data.get('descricao'),
    };
    axios
      .post('http://localhost:8080/api/categorias/salvar', {
        id: parseInt(data.get('id')),
        descricao: data.get('descricao'),
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Col xs="12" md="12">
          <Card>
            <CardHeader>
              <strong>Categorias </strong> - Cadastrar
            </CardHeader>
            <CardBody>
              <Form id="cliente-form" className="form-horizontal" onSubmit={this.onSubmit}>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Descrição da Categoria*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="descricao"
                      required
                      name="descricao"
                      placeholder="Descrição."
                    />
                    <FormText color="muted">Descrição da categoria.</FormText>
                  </Col>
                </FormGroup>
                <Button type="submit" size="sm" color="success">
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

export default CategoriaForm;
