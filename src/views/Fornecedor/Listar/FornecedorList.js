import React, { Component, lazy } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import axios from 'axios';

class FornecedorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fornecedores: [],
    };
  }

  componentDidMount = () => {
    axios.get('http://localhost:8080/api/fornecedores/todos').then(res => {
      this.setState({
        fornecedores: res.data,
      });
    });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={10}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> Fornecedores
              </CardHeader>
              <CardBody>
                <Table responsive hover id="myTable">
                  <thead>
                    <tr>
                      <th scope="col">Código</th>
                      <th scope="col">Razão Social</th>
                      <th scope="col">Nome Fantasia</th>
                      <th scope="col">CNPJ</th>
                      <th scope="col">Endereço</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.fornecedores.map(fornecedor => (
                      <tr>
                        <td>{fornecedor.id}</td>
                        <td>{fornecedor.razaoSocial}</td>
                        <td>{fornecedor.nomeFantasia}</td>
                        <td>{fornecedor.cnpj}</td>
                        <td>{fornecedor.endereco}</td>
                        <td href="http://localhost:3000/#/base/forms/`${cliente.id}`">
                          <i className="icon-options" />
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

export default FornecedorList;
