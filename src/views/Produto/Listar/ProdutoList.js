import React, { Component, lazy } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, Button, CardHeader, Col, Row, Table } from 'reactstrap';
import axios from 'axios';

class ProdutoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      produtos: [],
    };
  }

  componentDidMount = () => {
    axios.get('http://localhost:8080/api/produtos/todos').then(res => {
      this.setState({
        produtos: res.data,
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
                <i className="fa fa-align-justify" /> Produtos
              </CardHeader>
              <CardBody>
                <Table responsive hover id="myTable">
                  <thead>
                    <tr>
                      <th scope="col">Código</th>
                      <th scope="col">Nome do Produto</th>
                      <th scope="col">Descrição</th>
                      <th scope="col">Preço</th>
                      <th scope="col">Fornecedor</th>
                      <th scope="col">Categoria</th>
                      <th scope="col">Editar</th>
                      <th scope="col">Remover</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.produtos.map(produto => (
                      <tr>
                        <td>{produto.id}</td>
                        <td>{produto.nomeProduto}</td>
                        <td>{produto.descricao}</td>
                        <td>{'R$' + produto.preco.toFixed(2)}</td>
                        <td>{produto.categoria.descricao}</td>
                        <td>{produto.fornecedor.nomeFantasia}</td>
                        <td>
                          <Button size="sm" color="primary" href={''}>
                            Editar
                          </Button>
                        </td>
                        <td>
                          <Button size="sm" color="danger" href={''}>
                            Remover
                          </Button>
                        </td>
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

export default ProdutoList;
