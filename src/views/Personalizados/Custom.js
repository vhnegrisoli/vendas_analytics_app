import React, { Component } from 'react';
import { Bar, Doughnut, Line, Pie, HorizontalBar } from 'react-chartjs-2';
import axios from 'axios';
import {
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

let metrica = '';
let dadosDimensao = [];
let dadosMetrica = [0];

const grafico = {
  labels: dadosDimensao,
  datasets: [
    {
      data: dadosMetrica,
      label: metrica,
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
      dadosMetrica: [],
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  getTitulo() {
    return (
      'Análise de ' +
      this.state.dimensao.toLocaleLowerCase() +
      ' por ' +
      this.getTituloMetrica(this.state.metrica)
    );
  }

  getTituloMetrica(metrica) {
    var tipo = '';
    switch (metrica) {
      case 'COUNT':
        tipo = 'quantidade total de vendas';
        break;
      case 'SUM':
        tipo = 'somatório de vendas';
        break;
      case 'AVG':
        tipo = 'média de vendas';
        break;
    }
    this.metrica = tipo;
    console.log(this.metrica);
    return tipo;
  }

  toggleFade() {
    this.setState(prevState => {
      return { fadeIn: !prevState };
    });
  }

  onChange = e => {
    var nomeCampo = e.target.name;
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (nomeCampo === 'dimensao' || nomeCampo === 'metrica') {
      switch (this.state.dimensao) {
        case 'VENDEDOR':
          this.getChamadasVendedor();
          break;
        case 'PRODUTO':
          this.getChamadasProduto();
          break;
        case 'VENDAS MENSAIS':
          this.getChamadasVendas();
          break;
        case 'REGIAO':
          this.getChamadasRegiao();
          break;
        case 'ESTADO':
          this.getChamadasEstados();
          break;
        case 'FORNECEDOR':
          this.getChamadasFornecedor();
          break;
        case 'CATEGORIA':
          this.getChamadasCategoria();
          break;
      }
    }
    this.forceUpdate();
  };

  async getChamadasVendedor() {
    this.zerarDadosDosGraficos();
    await axios.get('http://localhost:8080/api/analytics/geral-vendedores').then(res => {
      for (var i = 0; i < res.data.length; i++) {
        dadosDimensao[i] = res.data[i].cliente;
        if (this.state.metrica === 'COUNT') {
          dadosMetrica[i] = res.data[i].quantidade;
        }
        if (this.state.metrica === 'SUM') {
          dadosMetrica[i] = res.data[i].lucro;
        }
        if (this.state.metrica === 'AVG') {
          dadosMetrica[i] = res.data[i].media;
        }
      }
    });
    this.forceUpdate();
  }

  async getChamadasProduto() {
    this.zerarDadosDosGraficos();
    await axios.get('http://localhost:8080/api/analytics/geral-produtos').then(res => {
      for (var i = 0; i < res.data.length; i++) {
        dadosDimensao[i] = res.data[i].produto;
        if (this.state.metrica === 'COUNT') {
          dadosMetrica[i] = res.data[i].quantidade;
          this.state.dadosMetrica[i] = res.data[i].quantidade;
        }
        if (this.state.metrica === 'SUM') {
          dadosMetrica[i] = res.data[i].lucro;
          this.state.dadosMetrica[i] = res.data[i].lucro;
        }
        if (this.state.metrica === 'AVG') {
          dadosMetrica[i] = res.data[i].media;
          this.state.dadosMetrica[i] = res.data[i].media;
        }
      }
    });
    this.forceUpdate();
  }

  async getChamadasRegiao() {
    this.zerarDadosDosGraficos();
    await axios
      .get('http://localhost:8080/api/analytics/geral-regioes-personalizados')
      .then(res => {
        for (var i = 0; i < res.data.length; i++) {
          dadosDimensao[i] = res.data[i].regiao;
          if (this.state.metrica === 'COUNT') {
            dadosMetrica[i] = res.data[i].quantidade;
            this.state.dadosMetrica[i] = res.data[i].quantidade;
          }
          if (this.state.metrica === 'SUM') {
            dadosMetrica[i] = res.data[i].lucro;
            this.state.dadosMetrica[i] = res.data[i].lucro;
          }
          if (this.state.metrica === 'AVG') {
            dadosMetrica[i] = res.data[i].media;
            this.state.dadosMetrica[i] = res.data[i].media;
          }
        }
      });
    this.forceUpdate();
  }

  async getChamadasEstados() {
    this.zerarDadosDosGraficos();
    await axios.get('http://localhost:8080/api/analytics/geral-estados').then(res => {
      for (var i = 0; i < res.data.length; i++) {
        dadosDimensao[i] = res.data[i].estado;
        if (this.state.metrica === 'COUNT') {
          dadosMetrica[i] = res.data[i].quantidade;
          this.state.dadosMetrica[i] = res.data[i].quantidade;
        }
        if (this.state.metrica === 'SUM') {
          dadosMetrica[i] = res.data[i].lucro;
          this.state.dadosMetrica[i] = res.data[i].lucro;
        }
        if (this.state.metrica === 'AVG') {
          dadosMetrica[i] = res.data[i].media;
          this.state.dadosMetrica[i] = res.data[i].media;
        }
      }
    });
    this.forceUpdate();
  }

  async getChamadasVendas() {
    this.zerarDadosDosGraficos();
    await axios.get('http://localhost:8080/api/dashboard/vendas-por-periodo').then(res => {
      for (var i = 0; i < res.data.length; i++) {
        dadosDimensao[i] = res.data[i].meses;
        if (this.state.metrica === 'COUNT') {
          dadosMetrica[i] = res.data[i].quantidade;
          this.state.dadosMetrica[i] = res.data[i].quantidade;
        }
        if (this.state.metrica === 'SUM') {
          dadosMetrica[i] = res.data[i].lucro;
          this.state.dadosMetrica[i] = res.data[i].lucro;
        }
        if (this.state.metrica === 'AVG') {
          dadosMetrica[i] = res.data[i].media;
          this.state.dadosMetrica[i] = res.data[i].media;
        }
      }
    });
    this.forceUpdate();
  }

  async getChamadasFornecedor() {
    this.zerarDadosDosGraficos();
    await axios.get('http://localhost:8080/api/analytics/geral-fornecedores').then(res => {
      for (var i = 0; i < res.data.length; i++) {
        dadosDimensao[i] = res.data[i].fornecedor;
        if (this.state.metrica === 'COUNT') {
          dadosMetrica[i] = res.data[i].qtdVendas;
          this.state.dadosMetrica[i] = res.data[i].qtdVendas;
        }
        if (this.state.metrica === 'SUM') {
          dadosMetrica[i] = res.data[i].lucro;
          this.state.dadosMetrica[i] = res.data[i].lucro;
        }
        if (this.state.metrica === 'AVG') {
          dadosMetrica[i] = res.data[i].media;
          this.state.dadosMetrica[i] = res.data[i].media;
        }
      }
    });
    this.forceUpdate();
  }

  async getChamadasCategoria() {
    this.zerarDadosDosGraficos();
    await axios.get('http://localhost:8080/api/analytics/vendas-por-categoria').then(res => {
      for (var i = 0; i < res.data.length; i++) {
        dadosDimensao[i] = res.data[i].categoria;
        if (this.state.metrica === 'COUNT') {
          dadosMetrica[i] = res.data[i].quantidade;
          this.state.dadosMetrica[i] = res.data[i].quantidade;
        }
        if (this.state.metrica === 'SUM') {
          dadosMetrica[i] = res.data[i].lucro;
          this.state.dadosMetrica[i] = res.data[i].lucro;
        }
        if (this.state.metrica === 'AVG') {
          dadosMetrica[i] = res.data[i].media;
          this.state.dadosMetrica[i] = res.data[i].media;
        }
      }
    });
    this.forceUpdate();
  }

  zerarDadosDosGraficos() {
    dadosMetrica.length = 0;
    dadosDimensao.length = 0;
  }

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
                              <Input
                                value={this.state.descricao}
                                onChange={e => this.onChange(e)}
                                type="radio"
                                name="dimensao"
                                value="VENDEDOR"
                              />{' '}
                              Analisar por vendedores
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input
                                value={this.state.descricao}
                                onChange={e => this.onChange(e)}
                                type="radio"
                                name="dimensao"
                                value="PRODUTO"
                              />{' '}
                              Analisar por produtos
                            </Label>
                          </FormGroup>

                          <FormGroup check>
                            <Label check>
                              <Input
                                value={this.state.descricao}
                                onChange={e => this.onChange(e)}
                                type="radio"
                                name="dimensao"
                                value="VENDAS MENSAIS"
                              />{' '}
                              Analisar vendas por meses
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input
                                value={this.state.descricao}
                                onChange={e => this.onChange(e)}
                                type="radio"
                                name="dimensao"
                                value="REGIAO"
                              />{' '}
                              Analisar por regiões
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input
                                value={this.state.descricao}
                                onChange={e => this.onChange(e)}
                                type="radio"
                                name="dimensao"
                                value="ESTADO"
                              />{' '}
                              Analisar por estados
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input
                                value={this.state.descricao}
                                onChange={e => this.onChange(e)}
                                type="radio"
                                name="dimensao"
                                value="FORNECEDOR"
                              />{' '}
                              Analisar por fornecedores
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input
                                value={this.state.descricao}
                                onChange={e => this.onChange(e)}
                                type="radio"
                                name="dimensao"
                                value="CATEGORIA"
                              />{' '}
                              Analisar por categorias
                            </Label>
                          </FormGroup>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>Selecione a métrica de análise:</Label>
                          <FormGroup check>
                            <Label check>
                              <Input
                                value={this.state.descricao}
                                onChange={e => this.onChange(e)}
                                type="radio"
                                name="metrica"
                                value="SUM"
                              />{' '}
                              Soma de lucro
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input
                                value={this.state.descricao}
                                onChange={e => this.onChange(e)}
                                type="radio"
                                name="metrica"
                                value="AVG"
                              />{' '}
                              Média de lucro
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input
                                value={this.state.descricao}
                                onChange={e => this.onChange(e)}
                                type="radio"
                                name="metrica"
                                value="COUNT"
                              />{' '}
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
                              <Input
                                value={this.state.descricao}
                                onChange={e => this.onChange(e)}
                                type="radio"
                                name="tipoGrafico"
                                value="Bar"
                              />{' '}
                              Gráfico de Barras
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input
                                value={this.state.descricao}
                                onChange={e => this.onChange(e)}
                                type="radio"
                                name="tipoGrafico"
                                value="HorizontalBar"
                              />{' '}
                              Gráfico de Barra Horizontal
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input
                                value={this.state.descricao}
                                onChange={e => this.onChange(e)}
                                type="radio"
                                name="tipoGrafico"
                                value="Pie"
                              />{' '}
                              Gráfico de Pizza
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input
                                value={this.state.descricao}
                                onChange={e => this.onChange(e)}
                                type="radio"
                                name="tipoGrafico"
                                value="Doughnut"
                              />{' '}
                              Gráfico de Donut
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input
                                value={this.state.descricao}
                                onChange={e => this.onChange(e)}
                                type="radio"
                                name="tipoGrafico"
                                value="Line"
                              />{' '}
                              Gráfico de Linha
                            </Label>
                          </FormGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                  </CardFooter>
                </Card>
              </Form>
            </CardBody>
          </Card>
        </Col>
        {this.state.dadosMetrica && this.state.dadosMetrica.length > 0 ? (
          <Col xs="12">
            <Card>
              <CardHeader>
                {this.getTitulo()}
                <div className="card-header-actions" />
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                  {this.state.tipoGrafico === 'Pie' ? (
                    <Pie data={grafico} />
                  ) : this.state.tipoGrafico === 'Bar' ? (
                    <Bar data={grafico} />
                  ) : this.state.tipoGrafico === 'Doughnut' ? (
                    <Doughnut data={grafico} />
                  ) : this.state.tipoGrafico === 'HorizontalBar' ? (
                    <HorizontalBar data={grafico} />
                  ) : this.state.tipoGrafico === 'Line' ? (
                    <Line data={grafico} />
                  ) : (
                              ''
                            )}
                </div>
              </CardBody>
            </Card>
          </Col>
        ) : (
            ''
          )}
      </div>
    );
  }
}

export default Custom;
