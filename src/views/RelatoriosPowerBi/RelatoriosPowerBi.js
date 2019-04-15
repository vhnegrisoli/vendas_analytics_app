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

class RelatoriosPowerBi extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      relatorios: [],
      relatorioId: null,
      indiceRelatorio: null,
      usuarios: [],
      usuarioId: '',
      titulos: [],
      links: []
    };
    this.initialize()
    this.forceUpdate()
  }

  async initialize() {
    await axios.get('http://localhost:8080/api/usuarios/todos').then(res => {
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
    await axios.get('http://localhost:8080/api/relatorios-power-bi/buscar/' + this.state.usuarioId)
      .then(res => {
        this.setState({
          relatorios: res.data
        })
      })
    this.forceUpdate()
    console.log(this.state)
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    this.forceUpdate()
    if (this.state.usuarioId || this.state.usuarioId != '') {
      this.getRelatorios()
    }
  };

  setIndice = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    var indice = this.state.relatorios.findIndex(this.state.relatorioId)

    this.setState({
      indiceRelatorio: indice
    })
    console.log(indice)
    console.log(this.state.ind)
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
                      value={this.state.usuarioId}
                      onChange={e => this.onChange(e)}
                    >
                      <option value="0">Por favor, selecione o usuário:</option>
                      {this.state.usuarios.map(usuario => (
                        <option value={usuario.id}>{usuario.nome}</option>
                      ))}
                    </Input>
                  </Col>
                </FormGroup>
                {this.state.relatorios && this.state.relatorios.length > 0 ? (
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
                        value={this.state.relatorioId}
                        onChange={e => this.setIndice(e)}
                      >
                        <option value="0">Por favor, selecione o relatório do usuário:</option>
                        {this.state.relatorios.map(relatorio => (
                          <option value={relatorio.id}>{relatorio.titulo}</option>
                        ))}
                      </Input>
                    </Col>
                  </FormGroup>
                ) : (
                    <p>Você não tem relatórios. </p>
                  )}
                {this.state.relatorios && this.state.relatorios != undefined && (
                  <Card>
                    <CardHeader>
                    </CardHeader>
                    <div class="resp-container">
                      <iframe class="resp-iframe" src="https://app.powerbi.com/view?r=eyJrIjoiMWQwN2I5MGYtOWY2ZC00OWNiLThiMDgtNzkzNDQ2YTdhNjMzIiwidCI6Ijg2ZjhmOGY5LTk3YTQtNDZkMS05ZTc3LWY2ZGRkYTgwNjkzOCJ9" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
                    </div>
                  </Card>
                )}

              </Form>
            </CardBody>
          </Card>
        </Col >
      </div >
    );
  }
}

export default RelatoriosPowerBi;
