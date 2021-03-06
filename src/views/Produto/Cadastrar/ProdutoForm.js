import React, { Component } from "react";
import axios from "axios";
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
  Label
} from "reactstrap";
import ReactLoading from "react-loading";

const urlListarprodutos = "http://localhost:3000/#/produtos/listar";
let token = "";
let Authorization = "";
class ProdutoForm extends Component {
  constructor(props) {
    super(props);
    let tokenCookie = document.cookie.includes("token")
      ? document.cookie
          .split("token=")[1]
          .replace('"', "")
          .replace('"', "")
          .split(";")[0]
      : "";
    let permissao = document.cookie.includes("permissao")
      ? document.cookie
          .split("permissao=")[1]
          .replace('"', "")
          .replace('"', "")
          .split(";")[0]
      : "";
    token = tokenCookie;
    if (permissao === "USER") {
      window.location.href = "http://localhost:3000/#/403";
    }
    if (tokenCookie === "") {
      window.location.href = "http://localhost:3000/#/login";
    }
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      categorias: [],
      fornecedores: [],
      nomeProduto: "",
      preco: 0.0,
      descricao: "",
      categoria: "",
      fornecedor: "",
      isPostLoading: false
    };
    Authorization = `Bearer ${token}`;
    this.initialize();
  }

  async initialize() {
    if (this.getUrlParameter()) {
      await axios
        .get(
          "http://localhost:8080/api/produtos/buscar/" + this.getUrlParameter(),
          {
            headers: { Authorization }
          }
        )
        .then(res => {
          this.setState({
            nomeProduto: res.data.nomeProduto,
            descricao: res.data.descricao,
            preco: res.data.preco,
            fornecedor: res.data.fornecedor.id,
            categoria: res.data.categoria.id
          });
        })
        .catch(error => {
          if (error.message.includes("401")) {
            window.location.href = "http://localhost:3000/#/login";
          }
          if (error.message.includes("404")) {
            window.location.href = "http://localhost:3000/#/produtos/listar";
          }
        });
    }

    await axios
      .get("http://localhost:8080/api/categorias/todas", {
        headers: { Authorization }
      })
      .then(res => {
        this.setState({
          categorias: res.data
        });
      });

    await axios
      .get("http://localhost:8080/api/fornecedores/todos", {
        headers: { Authorization }
      })
      .then(res => {
        this.setState({
          fornecedores: res.data
        });
      });
  }

  getUrlParameter() {
    var url = window.location.toString().split("/");
    var id = url[url.length - 1];
    if (!isNaN(id)) {
      return parseInt(url[url.length - 1]);
    } else {
      return "";
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

  editar() {
    var editar = {
      id: this.getUrlParameter(),
      nomeProduto: this.state.nomeProduto,
      descricao: this.state.descricao,
      preco: this.state.preco,
      fornecedor: { id: this.state.fornecedor },
      categoria: { id: this.state.categoria }
    };
    axios
      .post("http://localhost:8080/api/produtos/salvar", editar, {
        headers: { Authorization }
      })
      .then(res => {
        if (res.status === 200) {
          window.location.href = urlListarprodutos;
        } else {
          this.setState({ isPostLoading: false });
        }
      })
      .catch(error => {
        this.setState({ isPostLoading: false });
        this.setState = {
          error: true
        };
      });
  }

  salvar() {
    axios
      .post(
        "http://localhost:8080/api/produtos/salvar",
        {
          nomeProduto: this.state.nomeProduto,
          descricao: this.state.descricao,
          preco: this.state.preco,
          fornecedor: { id: this.state.fornecedor },
          categoria: { id: this.state.categoria }
        },
        {
          headers: { Authorization }
        }
      )
      .then(res => {
        if (res.status === 200) {
          window.location.href = urlListarprodutos;
        } else {
          this.setState({ isPostLoading: false });
        }
      })
      .catch(error => {
        this.setState({ isPostLoading: false });
        this.setState = {
          error: true
        };
      });
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

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
              <strong>Produtos </strong> - Cadastrar
            </CardHeader>
            <CardBody>
              <Form
                id="cliente-form"
                onSubmit={e => this.onSubmit(e)}
                className="form-horizontal"
              >
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Nome do Produto*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="text-input"
                      required
                      name="nomeProduto"
                      placeholder="Nome do Produto"
                      value={this.state.nomeProduto}
                      onChange={e => this.onChange(e)}
                      pattern="^[^\s].+[^\s]$"
                    />
                    <FormText color="muted">Digite o nome do produto.</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="cpf-input">Descrição do Produto*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      required
                      pattern="^[^\s].+[^\s]$"
                      id="descricao-input"
                      name="descricao"
                      placeholder="Descrição"
                      autoComplete="descricao"
                      value={this.state.descricao}
                      onChange={e => this.onChange(e)}
                    />
                    <FormText className="help-block">
                      Adicione uma breve descrição.
                    </FormText>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="cpf-input">Preço do Produto*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      pattern="^[^\s].+[^\s]$"
                      type="number"
                      id="descricao-input"
                      name="preco"
                      step=".01"
                      required
                      placeholder="Preço"
                      autoComplete="descricao"
                      value={this.state.preco}
                      onChange={e => this.onChange(e)}
                    />
                    <FormText className="help-block">
                      Informe o preço do produto.
                    </FormText>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Categoria de Produto*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="select"
                      name="categoria"
                      required
                      pattern="^[^\s].+[^\s]$"
                      id="select"
                      value={this.state.categoria}
                      onChange={e => this.onChange(e)}
                    >
                      <option value="0">
                        Por favor, selecione uma categoria:
                      </option>
                      {this.state.categorias.map(categoria => (
                        <option value={categoria.id}>
                          {categoria.descricao}
                        </option>
                      ))}
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row />

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Fornecedor do Produto*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="select"
                      name="fornecedor"
                      required
                      pattern="^[^\s].+[^\s]$"
                      id="select"
                      value={this.state.fornecedor}
                      onChange={e => this.onChange(e)}
                    >
                      <option value="0">
                        Por favor, selecione o fornecedor:
                      </option>
                      {this.state.fornecedores.map(fornecedor => (
                        <option value={fornecedor.id}>
                          {fornecedor.nomeFantasia}
                        </option>
                      ))}
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row />
                {this.state.isPostLoading ? (
                  <ReactLoading type={"spin"} color={"#59B459"} />
                ) : (
                  <Button type="submit" size="sm" color="success">
                    <i className="fa fa-dot-circle-o" /> Cadastrar
                  </Button>
                )}
              </Form>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}

export default ProdutoForm;
