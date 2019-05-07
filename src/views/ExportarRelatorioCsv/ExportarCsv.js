import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label } from 'reactstrap';

const urlDownload = 'http://localhost:8080/api/vendas/relatorio-csv?dataInicial=';
class ExportarCsv extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      downloadUrl: '',
      dataInicial: '',
      dataFinal: '',
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
                <Button
                  type="submit"
                  size="sm"
                  color="success"
                  href={urlDownload + this.state.dataInicial + '&dataFinal=' + this.state.dataFinal}
                >
                  <i className="fa fa-dot-circle-o" /> Gerar relatório
                </Button>
                <br />
                <br />
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
