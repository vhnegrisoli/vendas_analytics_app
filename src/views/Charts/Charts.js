import React, { Component } from 'react';
import { Bar, Doughnut, Line, Pie, Polar, Radar, HorizontalBar } from 'react-chartjs-2';
import { Card, CardBody, CardColumns, CardHeader } from 'reactstrap';
import ReactLoading from 'react-loading';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import axios from 'axios';

let mesesGrafico1 = [];
let lucrosGrafico1 = [];
let quantidadesGrafico2 = [];
let mediaGrafico2 = [];
let categorias = [];
let lucrosCategorias = [];
let quantidadesCategorias = [];
let produtos = [];
let lucrosProdutos = [];
let mediaProdutos = [];

const line = {
  labels: mesesGrafico1,
  datasets: [
    {
      label: 'Lucro total por meses',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: lucrosGrafico1,
    },
  ],
};

const bar = {
  labels: mesesGrafico1,
  datasets: [
    {
      label: 'Média de Vendas',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: mediaGrafico2,
    },
  ],
};

const doughnut = {
  labels: mesesGrafico1,
  datasets: [
    {
      data: quantidadesGrafico2,
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

const radar = {
  labels: produtos,
  datasets: [
    {
      label: 'Faturamento total',
      backgroundColor: '#36A2EB',
      borderColor: '#004080',
      pointBackgroundColor: '#004080',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(179,181,198,1)',
      data: lucrosProdutos,
    },
    {
      label: 'Média de lucro por produto',
      backgroundColor: '#FF6384',
      borderColor: '#990000',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      data: mediaProdutos,
    },
  ],
};

const pie = {
  labels: categorias,
  datasets: [
    {
      data: lucrosCategorias,
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

const polar = {
  datasets: [
    {
      data: [11, 16, 7, 3, 14],
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
      label: 'My dataset', // for legend
    },
  ],
  labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
};

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
  },
  maintainAspectRatio: false,
};

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      relatorios: [],
      categorias: [],
      isLoading: true,
    };
    this.initialize();
    this.forceUpdate();
  }

  async initialize() {
    await axios.get('http://localhost:8080/api/dashboard/vendas-por-periodo').then(res => {
      this.setState({
        relatorios: res.data,
      });

      for (var i = 0; i < res.data.length; i++) {
        mesesGrafico1[i] = res.data[i].meses;
        lucrosGrafico1[i] = res.data[i].lucro;
        quantidadesGrafico2[i] = res.data[i].quantidade;
        mediaGrafico2[i] = res.data[i].media;
      }
    });

    await axios.get('http://localhost:8080/api/analytics/vendas-por-categoria').then(res => {
      for (var i = 0; i < res.data.length; i++) {
        categorias[i] = res.data[i].categoria;
        lucrosCategorias[i] = res.data[i].lucro;
        quantidadesCategorias[i] = res.data[i].quantidade;
      }
    });

    await axios.get('http://localhost:8080/api/analytics/geral-produtos').then(res => {
      this.setState({
        isLoading: false,
      });
      for (var i = 0; i < res.data.length; i++) {
        produtos[i] = res.data[i].produto;
        lucrosProdutos[i] = res.data[i].quantidade;
        mediaProdutos[i] = res.data[i].media;
      }
    });
    this.forceUpdate();
  }

  render() {
    return this.state.isLoading ? (
      <div>
        <ReactLoading type={'spin'} />
        <label>Aguarde, estamos processando sua análise</label>
      </div>
    ) : (
      <div className="animated fadeIn">
        <CardColumns className="cols-2">
          <Card>
            <CardHeader>
              Lucro total e Média de Lucro por Região
              <div className="card-header-actions" />
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Line data={line} options={options} />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              Quantidade de Vendas por Estado
              <div className="card-header-actions" />
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Bar data={bar} options={options} />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              Quantidade de Vendas por Região
              <div className="card-header-actions" />
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Doughnut data={doughnut} />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              Faturamento e Média de Lucro por Produtos
              <div className="card-header-actions" />
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <HorizontalBar data={radar} />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              Lucro Total por Categoria
              <div className="card-header-actions" />
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Pie data={pie} />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              Quantidade de Clientes por Região
              <div className="card-header-actions" />
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Polar data={polar} options={options} />
              </div>
            </CardBody>
          </Card>
        </CardColumns>
      </div>
    );
  }
}

export default Charts;
