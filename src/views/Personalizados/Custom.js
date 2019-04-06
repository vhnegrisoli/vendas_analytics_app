import React, { Component } from 'react';
import { Bar, Doughnut, Line, Pie, HorizontalBar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import { format } from 'path';

let dimensao = '';
let metrica = '';
let dadosDimensao = [];
let dadosMetrica = [0];

const grafico = {
  labels: dadosDimensao,
  datasets: [
    {
      data: dadosMetrica,
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#E6f9FF',
        '#ffd1b3',
        '#ffff99',
        '#1aff1a',
        ,
        '#004080',
        ,
        '#ffb3b3',
        ,
        '#b3ffb3',
        ,
        '#ccffdd',
        '#990000',
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#E6f9FF',
        '#ffd1b3',
        '#ffff99',
        '#1aff1a',
        ,
        '#004080',
        ,
        '#ffb3b3',
        ,
        '#b3ffb3',
        ,
        '#ccffdd',
        '#990000',
      ],
    },
  ],
};

class Custom extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      dimensao: '',
      metrica: '',
      tipoGrafico: '',
      dataInicial: '',
      dataFinal: '',
      dadosDimensao: [],
      dadosMetrica: []
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
    console.log(this.state)
  };

  fetch(e) {
    e.preventDefault();
    this.state.dadosMetrica = [5, 2, 3, 7, 1];
    this.state.dadosDimensao = ['Março', 'Abril', 'Maio', 'Junho', 'Julho'];
    dadosMetrica = [5, 2, 3, 7, 1];
    dadosDimensao = ['Março', 'Abril', 'Maio', 'Junho', 'Julho'];
    console.log(this.state);
    this.forceUpdate();
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Col xs="12">
          <Card>
            <CardHeader>
              <strong>Relatório Personalizado </strong> - Filtros
            </CardHeader>
            <CardBody>
              <Form id="cliente-form" className="form-horizontal">
                <Card>
                  <CardFooter>
                    <Row form>
                      <Col md={4}>
                        <FormGroup>
                          <Label>Selecione a dimensão de análise:</Label>
                          <FormGroup check>
                            <Label check>
                              <Input value={this.state.descricao}
                                onChange={e => this.onChange(e)} type="radio" name="dimensao" value="CLIENTE" />{' '}
                              Analisar por clientes
            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input value={this.state.descricao}
                                onChange={e => this.onChange(e)} type="radio" name="dimensao" value="PRODUTO" />{' '}
                              Analisar por produtos
            </Label>
                          </FormGroup>

                          <FormGroup check>
                            <Label check>
                              <Input value={this.state.descricao}
                                onChange={e => this.onChange(e)} type="radio" name="dimensao" value="VENDA" />{' '}
                              Analisar por vendas
            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input value={this.state.descricao}
                                onChange={e => this.onChange(e)} type="radio" name="dimensao" value="REGIAO" />{' '}
                              Analisar por regiões
            </Label>
                          </FormGroup>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>Selecione a métrica de análise:</Label>
                          <FormGroup check>
                            <Label check>
                              <Input value={this.state.descricao}
                                onChange={e => this.onChange(e)} type="radio" name="metrica" value="SUM" />{' '}
                              Soma de lucro
            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input value={this.state.descricao}
                                onChange={e => this.onChange(e)} type="radio" name="metrica" value="AVG" />{' '}
                              Média de lucro
            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input value={this.state.descricao}
                                onChange={e => this.onChange(e)} type="radio" name="metrica" value="COUNT" />{' '}
                              Quantidade de vendas
            </Label>
                          </FormGroup>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>Selecione um tipo de gráfico:</Label>
                          <FormGroup check>
                            <Label check>
                              <Input value={this.state.descricao}
                                onChange={e => this.onChange(e)} type="radio" name="tipoGrafico" value="bar" />{' '}
                              Gráfico de Barras
            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input value={this.state.descricao}
                                onChange={e => this.onChange(e)} type="radio" name="tipoGrafico" value="horizontalBar" />{' '}
                              Gráfico de Barra Horizontal
            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input value={this.state.descricao}
                                onChange={e => this.onChange(e)} type="radio" name="tipoGrafico" value="pie" />{' '}
                              Gráfico de Pizza
            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input value={this.state.descricao}
                                onChange={e => this.onChange(e)} type="radio" name="tipoGrafico" value="donnut" />{' '}
                              Gráfico de Donnut
            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input value={this.state.descricao}
                                onChange={e => this.onChange(e)} type="radio" name="tipoGrafico" value="line" />{' '}
                              Gráfico de Linha
            </Label>
                          </FormGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                  </CardFooter>
                </Card>

                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Col xs="12" md="9">
                        <Label htmlFor="date-input">Data Inicial</Label>
                        <Input
                          type="date"
                          id="dataInicial"
                          name="dataInicial"
                          placeholder="date"
                          value={this.state.descricao}
                          onChange={e => this.onChange(e)}
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup >
                      <Col xs="12" md="9">
                        <Label htmlFor="date-input">Data Final</Label>
                        <Input
                          type="date"
                          id="dataFinal"
                          name="dataFinal"
                          placeholder="date"
                          value={this.state.descricao}
                          onChange={e => this.onChange(e)}
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <Col xs="12" md="9">
                      <Button
                        size="sm"
                        color="success"
                        onClick={e => this.fetch(e)}
                      >
                        <i className="fa fa-dot-circle-o" /> Gerar relatório
                </Button>
                    </Col>
                  </Col>
                </Row>

              </Form>
            </CardBody>
          </Card>
        </Col>
        {this.state.dadosMetrica && this.state.dadosMetrica.length > 0 ? (
          <Col xs="12">
            <Card>
              <CardHeader>
                Quantidade de Vendas por Região
              <div className="card-header-actions" />
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                  <Doughnut data={grafico} />
                </div>
              </CardBody>
            </Card>
          </Col>
        ) : ('')}
      </div >
    );
  }
}

export default Custom;
