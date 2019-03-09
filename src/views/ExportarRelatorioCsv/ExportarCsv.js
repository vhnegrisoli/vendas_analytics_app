import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import { format } from 'path';

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
    };
  }

  handleChange(e) {
    const data = new FormData(e.target);
    var urlDownload = 'http://localhost:8080/api/vendas/relatorio-csv?dataInicial=' +
      data.get('dataInicial') + '&dataFinal=' + data.get('dataFinal')
    axios.get(urlDownload).then(res => {

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

  render() {
    return (
      <div className="animated fadeIn">
        <Col xs="12" md="4">
          <Card>
            <CardHeader>
              <strong>Exportar CSV </strong> - Filtros
            </CardHeader>
            <CardBody>
              <Form id="cliente-form" className="form-horizontal" onSubmit={this.onSubmit}>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="date-input">Data de Inicial*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="date" id="dataInicial" required name="dataInicial" placeholder="date" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="date-input">Data de Final*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="date" id="dataFinal" required name="dataFinal" placeholder="date" />
                  </Col>
                </FormGroup>
                <Button
                  type="submit"
                  size="sm"
                  color="success"
                  onClick={this.handleChange.bind(this)}
                >
                  <i className="fa fa-dot-circle-o" /> Gerar relatório
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}

export default ExportarCsv;
