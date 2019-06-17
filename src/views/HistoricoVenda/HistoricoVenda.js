import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import { Card, Button, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import axios from 'axios';

class HistoricoVenda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historico: [],
      isLoading: true,
    };
  }

  componentDidMount = () => {
    axios.get('http://localhost:8080/api/vendas/historico-de-vendas').then(res => {
      this.setState({
        historico: res.data,
        isLoading: false,
      });
    });
  };

  render() {
    return (
      <div className="animated fadeIn">
        {this.state.isLoading ? (
          <ReactLoading type={'spin'} />
        ) : (
          <Row>
            <Col xl={12}>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify" /> Histórico de Vendas
                </CardHeader>
                <CardBody>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th scope="col">Código da Venda</th>
                        <th scope="col">Situação da Venda</th>
                        <th scope="col">Aprovação da Venda</th>
                        <th scope="col">Mês da Venda</th>
                        <th scope="col">Quantidade de Itens</th>
                        <th scope="col">Vendedor</th>
                        <th scope="col">Email do Vendedor</th>
                        <th scope="col">Endereço do Vendedor</th>
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
                          <td>
                            <Button
                              size="sm"
                              color={
                                registro.aprovacaoVenda === 'APROVADA'
                                  ? 'success'
                                  : registro.aprovacaoVenda === 'AGUARDANDO_APROVACAO'
                                  ? 'warning'
                                  : 'danger'
                              }
                            >
                              {registro.aprovacaoVenda === 'AGUARDANDO_APROVACAO'
                                ? 'AGUARD. APROVAÇÃO'
                                : registro.aprovacaoVenda}
                            </Button>
                          </td>
                          <td>{registro.mesVenda}</td>
                          <td>{registro.quantidade}</td>
                          <td>{registro.nomeVendedor}</td>
                          <td>{registro.emailVendedor}</td>
                          <td>{registro.enderecoVendedor}</td>
                          <td>{registro.localVendedor}</td>
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
        )}
      </div>
    );
  }
}

export default HistoricoVenda;
