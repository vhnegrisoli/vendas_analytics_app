import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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

const urlListarCategorias = 'http://localhost:3000/#/categorias/listar';

class CategoriaForm extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      error: false,
      success: false,
      descricao: '',
    };
    this.getUrlParameter();
    this.initilize();
  }

  async initilize() {
    if (this.getUrlParameter()) {
      await axios
        .get('http://localhost:8080/api/categorias/buscar/' + this.getUrlParameter())
        .then(res => {
          this.setState({
            descricao: res.data.descricao,
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
      .post('http://localhost:8080/api/categorias/salvar', {
        id: this.getUrlParameter(),
        descricao: this.state.descricao,
      })
      .then(res => {
        if (res.status === 200) {
          window.location.href = urlListarCategorias;
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
      .post('http://localhost:8080/api/categorias/salvar', {
        descricao: this.state.descricao,
      })
      .then(res => {
        if (res.status === 200) {
          window.location.href = urlListarCategorias;
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
              <strong>Categorias </strong> - Cadastrar
            </CardHeader>
            <CardBody>
              <Form id="cliente-form" className="form-horizontal" onSubmit={e => this.onSubmit(e)}>
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
                      value={this.state.descricao}
                      onChange={e => this.onChange(e)}
                    />
                    <FormText color="muted">Descrição da categoria.</FormText>
                  </Col>
                </FormGroup>
                <Button size="sm" color="success">
                  <i className="fa fa-dot-circle-o" /> Cadastrar
                </Button>
                <br />
              </Form>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}

export default CategoriaForm;
