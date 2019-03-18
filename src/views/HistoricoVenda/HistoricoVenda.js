import React, { Component, lazy } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, Button, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
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
                      <th scope="col">Cidade e Estado</th>
                      <th scope="col">Produto</th>
                      <th scope="col">Descrição do Produto</th>
                      <th scope="col">Preço</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.historico.map(registro => (
                      <tr>
                        <td>{registro.codigoVenda}</td>
                        <td>{registro.situacaoVenda}</td>
                        <td><Button size="sm" color={registro.aprovacaoVenda === 'APROVADA' ? 'success' :
                          registro.aprovacaoVenda === 'AGUARDANDO APROVACAO' ? 'primary' : 'danger'}>{registro.aprovacaoVenda}</Button></td>
                        <td>{registro.quantidade}</td>
                        <td>{registro.nomeCliente}</td>
                        <td>{registro.emailCliente}</td>
                        <td>{registro.enderecoCliente}</td>
                        <td>{registro.localCliente}</td>
                        <td>{registro.nomeProduto}</td>
                        <td>{registro.descricaoProduto}</td>
                        <td>{'R$' + parseFloat(registro.preco).toFixed(2)}</td>
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
