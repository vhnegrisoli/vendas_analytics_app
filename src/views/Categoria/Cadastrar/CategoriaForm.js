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
import ReactLoading from 'react-loading';

const urlListarCategorias = 'http://localhost:3000/#/categorias/listar';
let token = '';
let Authorization = '';
class CategoriaForm extends Component {
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
      error: false,
      success: false,
      descricao: '',
      isPostLoading: false,
    };
    Authorization = `Bearer ${token}`;
    this.getUrlParameter();
    this.initilize();
  }

  async initilize() {
    if (this.getUrlParameter()) {
      await axios
        .get('http://localhost:8080/api/categorias/buscar/' + this.getUrlParameter(), {
          headers: { Authorization },
        })
        .then(res => {
          this.setState({
            descricao: res.data.descricao,
          });
        })
        .catch(error => {
          if (error.message.includes('401')) {
            window.location.href = 'http://localhost:3000/#/login';
          }
          if (error.message.includes('404')) {
            window.location.href = 'http://localhost:3000/#/categorias/listar';
          }
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
      .post(
        'http://localhost:8080/api/categorias/salvar',
        {
          id: this.getUrlParameter(),
          descricao: this.state.descricao,
        },
        {
          headers: { Authorization },
        },
      )
      .then(res => {
        if (res.status === 200) {
          window.location.href = urlListarCategorias;
        }
      })
      .catch(error => {
        if (error.message.includes('401')) {
          window.location.href = 'http://localhost:3000/#/login';
        }
        this.setState({ isPostLoading: false, error: true });
        this.setState = {
          error: true,
        };
      });
  }

  salvar() {
    axios
      .post(
        'http://localhost:8080/api/categorias/salvar',
        {
          descricao: this.state.descricao,
        },
        {
          headers: { Authorization },
        },
      )
      .then(res => {
        if (res.status === 200) {
          window.location.href = urlListarCategorias;
        }
      })
      .catch(error => {
        if (error.message.includes('401')) {
          window.location.href = 'http://localhost:3000/#/login';
        }
        this.setState({ isPostLoading: false });
        this.setState = {
          error: true,
        };
      });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ isPostLoading: true });
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
                      pattern="\S+"
                      name="descricao"
                      placeholder="Descrição."
                      value={this.state.descricao}
                      onChange={e => this.onChange(e)}
                    />
                    <FormText color="muted">Descrição da categoria.</FormText>
                  </Col>
                </FormGroup>
                {this.state.isPostLoading ? (
                  <ReactLoading type={'spin'} color={'#59B459'} />
                ) : (
                  <Button size="sm" color="success">
                    <i className="fa fa-dot-circle-o" /> Cadastrar
                  </Button>
                )}
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
