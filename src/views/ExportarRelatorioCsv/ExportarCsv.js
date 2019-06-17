import React, { Component } from 'react';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { saveAs } from 'file-saver';

let token = '';
const urlDownload = 'http://localhost:8080/api/vendas/relatorio-csv?dataInicial=';
class ExportarCsv extends Component {
  constructor(props) {
    super(props);
    let tokenCookie = document.cookie.includes('token')
      ? document.cookie
          .split('token=')[1]
          .replace('"', '')
          .replace('"', '')
          .split(';')[0]
      : '';
    token = tokenCookie;
    if (tokenCookie === '') {
      window.location.href = 'http://localhost:3000/#/login';
    }
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      downloadUrl: '',
      dataInicial: '',
      dataFinal: '',
      isLoading: false,
      gerouCsv: false,
      gerouErro: false,
      exportLoadingColor: 'warning',
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

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit(e) {
    e.preventDefault();
    this.setState({
      isLoading: true,
      exportLoadingColor: 'warning',
      gerouCsv: false,
      gerouErro: false,
    });
    this.getRelatorio();
  }

  async getRelatorio() {
    const Authorization = `Bearer ${token}`;
    await axios
      .get(urlDownload + this.state.dataInicial + '?dataFinal=' + this.state.dataFinal, {
        headers: { Authorization },
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            isLoading: false,
            gerouCsv: true,
            exportLoadingColor: 'success',
          });
          var blob = new Blob([res.data], { type: 'application/csv' });
          var fileName =
            this.state.dataInicial !== '' && this.state.dataFinal !== ''
              ? 'Relatorio_Vendas_' +
                this.state.dataInicial.replace('-', '_') +
                '_' +
                this.state.dataFinal.replace('-', '_') +
                '.csv'
              : 'Relatorio_Vendas_Geral.csv';
          saveAs(blob, fileName);
        } else {
          this.setState({
            isLoading: false,
            gerouErro: true,
            exportLoadingColor: 'danger',
          });
        }
      });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Col xs="12" md="4">
          <Card>
            <CardHeader>
              <strong>Exportar CSV </strong> - Filtros
            </CardHeader>
            <CardBody>
              <Form id="cliente-form" className="form-horizontal">
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="date-input">Data Inicial*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="date"
                      id="dataInicial"
                      name="dataInicial"
                      placeholder="date"
                      onChange={e => this.onChange(e)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="date-input">Data Final*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="date"
                      id="dataFinal"
                      name="dataFinal"
                      placeholder="date"
                      onChange={e => this.onChange(e)}
                    />
                  </Col>
                </FormGroup>
                <Button onClick={e => this.onSubmit(e)} size="sm" color="success">
                  <i className="fa fa-dot-circle-o" /> Gerar relatório
                </Button>
                <br />
                <br />
                {this.state.isLoading && (
                  <Alert color={this.state.exportLoadingColor}>
                    <div>
                      <ReactLoading type={'spin'} />
                      <Label>Seu relatório está sendo gerado...</Label>
                    </div>
                  </Alert>
                )}
                {!this.state.isLoading && this.state.gerouCsv && (
                  <Alert color={this.state.exportLoadingColor}>
                    <Label>Seu arquivo foi gerado com sucesso.</Label>
                  </Alert>
                )}
                {!this.state.isLoading && this.state.gerouErro && (
                  <Alert color={this.state.exportLoadingColor}>
                    <Label>Houve um erro ao gerar seu arquivo.</Label>
                  </Alert>
                )}
                <Label>
                  * Se os campos de data inicial e final estiverem vazios, todos os dados serão
                  recuperados.
                </Label>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}

export default ExportarCsv;
