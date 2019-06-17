import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label } from 'reactstrap';

let link = '';
let usuarioId = null;
let relatorioId = null;
let relatorios = [];
let titulo = '';
let token = '';
let Authorization = '';
class RelatoriosPowerBi extends Component {
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
      usuarios: [],
    };
    Authorization = `Bearer ${token}`;
    this.initialize();
    this.forceUpdate();
  }

  async initialize() {
    await axios
      .get('http://localhost:8080/api/usuarios/todos', {
        headers: { Authorization },
      })
      .then(res => {
        this.setState({
          usuarios: res.data,
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

  async getRelatorios() {
    await axios
      .get('http://localhost:8080/api/relatorios-power-bi/buscar/' + usuarioId, {
        headers: { Authorization },
      })
      .then(res => {
        relatorios = res.data;
      });
    this.forceUpdate();
  }

  onChange = e => {
    usuarioId = e.target.value;
    if (usuarioId) {
      this.getRelatorios();
    }
    this.forceUpdate();
  };

  setIndice = e => {
    relatorioId = e.target.value;
    var index = 0;
    for (var i = 0; i < relatorios.length; i++) {
      if (relatorioId === relatorios[i].id) {
        index = i;
        break;
      }
    }
    link = relatorios[index].linkRelatorio;
    titulo = relatorios[index].titulo;
    this.forceUpdate();
    index = 0;
    relatorioId = null;
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Col xs="12" md="12">
          <Card>
            <CardHeader>
              <strong>Relatórios de BI </strong> - Microsoft Power BI
            </CardHeader>
            <CardBody>
              <Form id="powerbi" onSubmit={e => this.onSubmit(e)} className="form-horizontal">
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Selecione o Usuário: </Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="select"
                      name="usuarioId"
                      required
                      id="usuarioId"
                      value={usuarioId}
                      onChange={e => this.onChange(e)}
                    >
                      <option value="0">Por favor, selecione o usuário:</option>
                      {this.state.usuarios.map(usuario => (
                        <option value={usuario.id}>{usuario.nome}</option>
                      ))}
                    </Input>
                  </Col>
                </FormGroup>
                {relatorios[0] ? (
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Selecione o Relatório: </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="select"
                        name="relatorioId"
                        required
                        id="select"
                        value={relatorioId}
                        onChange={e => this.setIndice(e)}
                      >
                        <option value="0">Por favor, selecione o relatório do usuário:</option>
                        {relatorios.map(relatorio => (
                          <option value={relatorio.id}>{relatorio.titulo}</option>
                        ))}
                      </Input>
                    </Col>
                  </FormGroup>
                ) : (
                  <p>Você não tem relatórios. </p>
                )}
                {link !== '' && titulo !== '' && (
                  <Card>
                    <CardHeader>{titulo}</CardHeader>
                    <div class="resp-container">
                      <iframe
                        class="resp-iframe"
                        src={link}
                        gesture="media"
                        allow="encrypted-media"
                        allowfullscreen
                      />
                    </div>
                  </Card>
                )}
              </Form>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}

export default RelatoriosPowerBi;
