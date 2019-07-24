import React, { Component } from 'react';
import { Bar, Doughnut, Line, Pie, Polar, HorizontalBar } from 'react-chartjs-2';
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

let qtdClientesRegiao = [];
let qtdProdutosRegiao = [];
let qtdVendasRegiao = [];
let lucroRegiao = [];
let mediaRegiao = [];
let regiao = [];
let estado = [];

let mediaFornecedor = [];
let lucroFornecedor = [];
let vendaFornecedor = [];
let fornecedores = [];

const line = {
  labels: regiao,
  datasets: [
    {
      label: 'Lucro total por região',
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
      data: lucroRegiao,
    },
    {
      label: 'Média por região',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(255,99,132,0.2)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(255,99,132,0.4)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: mediaRegiao,
    },
  ],
};

const bar = {
  labels: estado,
  datasets: [
    {
      label: 'Quantidade de vendas por estado',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: qtdVendasRegiao,
    },
    {
      label: 'Quantidade de produtos por estado',
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(75,192,192,1)',
      hoverBorderColor: 'rgba(75,192,192,1)',
      data: qtdProdutosRegiao,
    },
    {
      label: 'Quantidade de vendedores por estado',
      backgroundColor: '#FFCE56',
      borderColor: '#ffff99',
      borderWidth: 1,
      hoverBackgroundColor: '#ffff99',
      hoverBorderColor: '#ffff99',
      data: qtdClientesRegiao,
    },
  ],
};

const bar2 = {
  labels: estado,
  datasets: [
    {
      label: 'Faturamento por estado',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: lucroRegiao,
    },
    {
      label: 'Média de lucro por estado',
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(75,192,192,1)',
      hoverBorderColor: 'rgba(75,192,192,1)',
      data: mediaRegiao,
    },
  ],
};

const doughnut = {
  labels: regiao,
  datasets: [
    {
      data: qtdVendasRegiao,
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

const radar2 = {
  labels: fornecedores,
  datasets: [
    {
      label: 'Lucro por fornecedor',
      backgroundColor: '#36A2EB',
      borderColor: '#004080',
      pointBackgroundColor: '#004080',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(179,181,198,1)',
      data: lucroFornecedor,
    },
    {
      label: 'Média por fornecedor',
      backgroundColor: '#FF6384',
      borderColor: '#990000',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      data: mediaFornecedor,
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
      data: qtdProdutosRegiao,
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
      label: 'Quantidade de produtos vendidos por região', // for legend
    },
  ],
  labels: regiao,
};

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
  },
  maintainAspectRatio: false,
};
let token = '';

class Charts extends Component {
  constructor(props) {
    super(props);
    this.resetArrays();
    let tokenCookie = document.cookie.includes('token')
      ? document.cookie
          .split('token=')[1]
          .replace('"', '')
          .replace('"', '')
          .split(';')[0]
      : '';
    token = tokenCookie;
    if (tokenCookie === '') {
      window.location.href = 'https://vendas-analytics-app.herokuapp.com/#/login';
    }
    this.state = {
      relatorios: [],
      categorias: [],
      isLoading: true,
    };
    this.initialize();
    this.forceUpdate();
  }

  async resetArrays() {
    mesesGrafico1.length = 0;
    lucrosGrafico1.length = 0;
    quantidadesGrafico2.length = 0;
    mediaGrafico2.length = 0;
    categorias.length = 0;

    lucrosCategorias.length = 0;
    quantidadesCategorias.length = 0;
    produtos.length = 0;
    lucrosProdutos.length = 0;
    mediaProdutos.length = 0;

    qtdClientesRegiao.length = 0;
    qtdProdutosRegiao.length = 0;
    qtdVendasRegiao.length = 0;
    lucroRegiao.length = 0;
    mediaRegiao.length = 0;
    regiao.length = 0;
    estado.length = 0;

    mediaFornecedor.length = 0;
    lucroFornecedor.length = 0;
    vendaFornecedor.length = 0;
    fornecedores.length = 0;
  }

  async initialize() {
    const Authorization = `Bearer ${token}`;
    await axios
      .get('https://vendas-analytics-api.herokuapp.com/api/dashboard/vendas-por-periodo', {
        headers: { Authorization },
      })
      .then(res => {
        this.setState({
          relatorios: res.data,
        });

        for (var i = 0; i < res.data.length; i++) {
          mesesGrafico1[i] = res.data[i].meses;
          lucrosGrafico1[i] = res.data[i].lucro;
          quantidadesGrafico2[i] = res.data[i].quantidade;
          mediaGrafico2[i] = res.data[i].media;
        }
      })
      .catch(error => {
        if (error.message.includes('401')) {
          window.location.href = 'https://vendas-analytics-app.herokuapp.com/#/login';
        }
      });

    await axios
      .get('https://vendas-analytics-api.herokuapp.com/api/analytics/vendas-por-categoria', {
        headers: { Authorization },
      })
      .then(res => {
        for (var i = 0; i < res.data.length; i++) {
          categorias[i] = res.data[i].categoria;
          lucrosCategorias[i] = res.data[i].lucro;
          quantidadesCategorias[i] = res.data[i].quantidade;
        }
      });

    await axios
      .get('https://vendas-analytics-api.herokuapp.com/api/analytics/geral-produtos', {
        headers: { Authorization },
      })
      .then(res => {
        for (var i = 0; i < res.data.length; i++) {
          produtos[i] = res.data[i].produto;
          lucrosProdutos[i] = res.data[i].quantidade;
          mediaProdutos[i] = res.data[i].media;
        }
      });

    await axios
      .get('https://vendas-analytics-api.herokuapp.com/api/analytics/geral-regioes', {
        headers: { Authorization },
      })
      .then(res => {
        for (var i = 0; i < res.data.length; i++) {
          qtdClientesRegiao[i] = res.data[i].qtdVendedores;
          qtdVendasRegiao[i] = res.data[i].qtdVendas;
          qtdProdutosRegiao[i] = res.data[i].qtdProdutos;
          lucroRegiao[i] = res.data[i].lucro;
          mediaRegiao[i] = res.data[i].media;
          regiao[i] = res.data[i].regiao;
          estado[i] = res.data[i].estado;
        }
      });

    await axios
      .get('https://vendas-analytics-api.herokuapp.com/api/analytics/geral-fornecedores', {
        headers: { Authorization },
      })
      .then(res => {
        for (var i = 0; i < res.data.length; i++) {
          mediaFornecedor[i] = res.data[i].media;
          lucroFornecedor[i] = res.data[i].lucro;
          vendaFornecedor[i] = res.data[i].qtdVendas;
          fornecedores[i] = res.data[i].fornecedor;
        }
        this.setState({
          isLoading: false,
        });
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
              Quantidade de Vendas, Produtos e Vendedores por Estado
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
              Quantidade de Produtos Vendidos por Região
              <div className="card-header-actions" />
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Polar data={polar} options={options} />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              Média e Faturamento por Estados
              <div className="card-header-actions" />
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Bar data={bar2} options={options} />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              Média e Lucro por Fornecedores
              <div className="card-header-actions" />
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <HorizontalBar data={radar2} options={options} />
              </div>
            </CardBody>
          </Card>
        </CardColumns>
      </div>
    );
  }
}

export default Charts;
