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
      produtosId: [],
      produtos: [],
    };

    axios.get('http://localhost:8080/api/vendas/' + this.getUrlParameter()).then(res => {
      this.setState({
        vendas: res.data,
      });
      for (var i = 0; i < res.data.produtos.length; i++) {
        this.setState = {
          produtosId: res.data.produtos[i].id.produtoId,
        };
        console.log(res.data.produtos[i].id.produtoId);
      }
    });
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

  onSubmit(e) {}

  precoOnClick(e) {}

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>Detalhes da Venda: {this.state.vendas.id}</CardHeader>
              <CardBody>
                <Label>Código da Venda: {this.state.vendas.id}</Label>
                <br />
                <Label>Situação da Venda: {this.state.vendas.situacao}</Label>
                <br />
                <Label>Aprovação da Venda: {this.state.vendas.aprovacao}</Label>
                <br />
                <Label>
                  Compra efetuada no dia:{' '}
                  {this.getData().substring(8, 10) +
                    ' de ' +
                    this.state.vendas.mesCompra +
                    ' de ' +
                    this.getData().substring(11, 15)}
                </Label>
                <br />

                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Código do Produto</th>
                      <th scope="col">Nome do Produto</th>
                      <th scope="col">Descrição do Produto</th>
                      <th scope="col">Fornecedor do Produto</th>
                      <th scope="col">Preço do Produto</th>
                      <th scope="col">Categoria do Produto</th>
                      <th scope="col">Quantidade Comprado</th>
                    </tr>
                  </thead>
                  <tbody />
                </Table>
                <Label>Valor total da compra:</Label>
                <br />
                <Label>Valor total da compra:</Label>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default DetalharVendaForm;
