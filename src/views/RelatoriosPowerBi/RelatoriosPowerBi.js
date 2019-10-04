import React, { Component } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Form,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from 'reactstrap';
import powerBiLogo from './Power-BI-Logo.png';

let usuarioId = null;
let relatorioId = null;
let relatorios = [];
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
      window.location.href = 'https://vendas-analytics-app-hom.herokuapp.com/#/403';
    }
    if (tokenCookie === '') {
      window.location.href = 'https://vendas-analytics-app-hom.herokuapp.com/#/login';
    }
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      usuarios: [],
      relatorios: [],
      relatorioAberto: null,
      exibirCards: false,
    };
    Authorization = `Bearer ${token}`;
    this.initialize();
    this.forceUpdate();
  }

  async initialize() {
    await axios
      .get('https://vendas-analytics-api-postgres.herokuapp.com/api/usuarios/todos', {
        headers: { Authorization },
      })
      .then(res => {
        this.setState({
          usuarios: res.data,
        });
      })
      .catch(error => {
        if (error.message.includes('401')) {
          window.location.href = 'https://vendas-analytics-app-hom.herokuapp.com/#/login';
        }
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

  openModal() {
    this.setState({
      modalOpen: true,
    });
  }

  closeModal() {
    this.setState({
      modalOpen: false,
    });
  }

  async getRelatorios() {
    await axios
      .get('https://vendas-analytics-api-postgres.herokuapp.com/api/relatorios-power-bi/buscar/' + usuarioId, {
        headers: { Authorization },
      })
      .then(res => {
        this.setState({
          relatorios: res.data,
          exibirCards: true,
        });
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
    this.forceUpdate();
    index = 0;
    relatorioId = null;
  };

  onSubmit(relatorio) {
    this.setState({
      relatorioAberto: relatorio,
    });
    this.openModal();
  }

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
                {this.state.exibirCards ? (
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">Selecione o Relatório: </Label>
                    </Col>
                    {this.state.relatorios.map(relatorio => (
                      <Col xs="12" sm="6" md="4">
                        <Card>
                          <CardHeader>{relatorio.titulo}</CardHeader>
                          <CardBody>
                            <img src={powerBiLogo} width="90%" height="90%" />
                          </CardBody>
                          <CardFooter>
                            <Button color="success" onClick={() => this.onSubmit(relatorio)}>
                              Visualizar Relatório
                            </Button>
                          </CardFooter>
                        </Card>
                      </Col>
                    ))}
                    <Modal
                      size="xl"
                      isOpen={this.state.modalOpen}
                      toggle={() => this.closeModal()}
                      className={this.props.className}
                    >
                      <ModalHeader toggle={() => this.openModal()}>
                        {this.state.relatorioAberto && this.state.relatorioAberto.titulo}
                      </ModalHeader>
                      <ModalBody>
                        <div class="resp-container">
                          <iframe
                            class="resp-iframe"
                            src={
                              this.state.relatorioAberto && this.state.relatorioAberto.linkRelatorio
                            }
                            gesture="media"
                            allow="encrypted-media"
                            width="1080"
                            height="600"
                            allowfullscreen
                          />
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="secondary" onClick={() => this.closeModal()}>
                          Voltar
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </FormGroup>
                ) : (
                  <p>Você não tem relatórios. </p>
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
