import React, { Component, lazy } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import axios from 'axios';

class HistoricoVenda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historico: [],
    };
  }

  componentDidMount = () => {
    axios.get('http://localhost:8080/api/vendas/historico-de-vendas').then(res => {
      this.setState({
        historico: res.data,
      });
    });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> Clientes
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Código da Venda</th>
                      <th scope="col">Situação da Venda</th>
                      <th scope="col">Aprovação da Venda</th>
                      <th scope="col">Quantidade de Itens</th>
                      <th scope="col">Cliente</th>
                      <th scope="col">Email do Cliente</th>
                      <th scope="col">Endereço do Cliente</th>
                      <th scope="col">Produto</th>
                      <th scope="col">Descrição do Produto</th>
                      <th scope="col">Preço</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.historico.map(registro => (
                      <tr>
                        <td>{registro.venda.id}</td>
                        <td>{registro.venda.situacao}</td>
                        <td>{registro.venda.aprovacao}</td>
                        <td>{registro.venda.quantidadeItens}</td>
                        <td>{registro.cliente.nome}</td>
                        <td>{registro.cliente.email}</td>
                        <td>
                          {registro.cliente.endereco.rua +
                            ', nº ' +
                            registro.cliente.endereco.numero}
                        </td>
                        <td>{registro.produto.nomeProduto}</td>
                        <td>{registro.produto.descricao}</td>
                        <td>{registro.produto.preco}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default HistoricoVenda;
