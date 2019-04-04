import React, { Component } from 'react';
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';
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
  labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(179,181,198,0.2)',
      borderColor: 'rgba(179,181,198,1)',
      pointBackgroundColor: 'rgba(179,181,198,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(179,181,198,1)',
      data: [65, 59, 90, 81, 56, 55, 40],
    },
    {
      label: 'My Second dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      data: [28, 48, 40, 19, 96, 27, 100],
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
      this.setState({
        categorias: res.data,
        isLoading: false,
      });
      for (var i = 0; i < res.data.length; i++) {
        categorias[i] = res.data[i].categoria;
        lucrosCategorias[i] = res.data[i].lucro;
        quantidadesCategorias[i] = res.data[i].quantidade;
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
              Lucro mensal de vendas
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
              Média mensal de vendas
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
              Vendas por Categoria
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
              Lucro por tipo de Fornecedor
              <div className="card-header-actions" />
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Radar data={radar} />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              Vendas por Categoria
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
              Ainda não sei esse
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
