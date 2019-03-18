import React, { Component, lazy } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, Button, CardHeader, Col, Row, Table } from 'reactstrap';
import axios from 'axios';

class ClienteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientes: [],
    };
  }

  componentDidMount = () => {
    axios.get('http://localhost:8080/api/clientes/todos').then(res => {
      this.setState({
        clientes: res.data,
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
                      <th scope="col">Código</th>
                      <th scope="col">Nome</th>
                      <th scope="col">CPF</th>
                      <th scope="col">RG</th>
                      <th scope="col">Email</th>
                      <th scope="col">Endereço</th>
                      <th scope="col">Editar</th>
                      <th scope="col">Remover</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.clientes.map(cliente => (
                      <tr>
                        <td>{cliente.id}</td>
                        <td>{cliente.nome}</td>
                        <td>{cliente.cpf}</td>
                        <td>{cliente.rg}</td>
                        <td>{cliente.email}</td>
                        <td>{cliente.rua + ', nº ' + cliente.numero}</td>
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

export default ClienteList;
