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
  Table,
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
  CustomInput,
  Row,
} from 'reactstrap';
import { format } from 'path';
import { hidden } from 'ansi-colors';

class DetalharVendaForm extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      vendas: {},
      produtos: [],
    };

    axios.get('http://localhost:8080/api/vendas/' + this.getUrlParameter()).then(res => {
      this.setState({
        vendas: res.data,
      });
    })

    axios.get('http://localhost:8080/api/vendas/vendas-produtos/' + this.getUrlParameter()).then(res => {
      this.setState({
        produtos: res.data,
      });
    })



  }
  getUrlParameter() {
    var url = window.location.toString().split('/');
    var id = url[url.length - 1];
    if (!isNaN(id)) {
      return parseInt(url[url.length - 1]);
    } else {
      return '';
    }
  }

  getValorTotalDaCompra() {
    var valorTotal = 0.0
    this.state.produtos.map(produto => (
      valorTotal = produto.preco + valorTotal
    ))
    return valorTotal
  }


  getQuantidadeTotalDaCompra() {
    var qtdTotal = 0
    this.state.produtos.map(produto => (
      qtdTotal = produto.quantidade + qtdTotal
    ))
    return qtdTotal
  }

  getData() {
    var data = new Date(this.state.vendas.dataCompra);
    var dataString = '';
    dataString = data.toString();
    return dataString;
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

  onSubmit(e) { }

  precoOnClick(e) { }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>Detalhes da Venda: {this.state.vendas.id}</CardHeader>
              <CardBody>
                <CardHeader>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th scope="col">Código da Venda</th>
                        <th scope="col">Situação</th>
                        <th scope="col">Status de Aprovação</th>
                        <th scope="col">Compra efetuada em</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{this.state.vendas.id}</td>
                        <td>{this.state.vendas.situacao}</td>
                        <td> {this.state.vendas.aprovacao}</td>
                        <td>{this.getData().substring(8, 10) +
                          ' de ' +
                          this.state.vendas.mesCompra +
                          ' de ' +
                          this.getData().substring(11, 15)}</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardHeader>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Código do Produto</th>
                      <th scope="col">Nome do Produto</th>
                      <th scope="col">Descrição do Produto</th>
                      <th scope="col">Fornecedor do Produto</th>
                      <th scope="col">Categoria do Produto</th>
                      <th scope="col">Preço do Produto</th>
                      <th scope="col">Quantidade Comprado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.produtos.map(produto => (
                      <tr>
                        <td>{produto.id}</td>
                        <td>{produto.produto}</td>
                        <td>{produto.descricao}</td>
                        <td>{produto.fornecedor}</td>
                        <td>{produto.categoria}</td>
                        <td>{'R$' + produto.preco.toFixed(2)}</td>
                        <td>{produto.quantidade}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="column">
                  <h5>Valor total da compra: <strong>R${this.getValorTotalDaCompra().toFixed(2)}</strong></h5>
                </div>
                <div className="column">
                  <h5>Total de itens da compra: <strong>{this.getQuantidadeTotalDaCompra()}</strong></h5  >
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default DetalharVendaForm;
