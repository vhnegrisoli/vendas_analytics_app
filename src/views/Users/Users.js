import React, { Component, lazy } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import axios from 'axios';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarios: [],
    };
  }

  componentDidMount = () => {
    axios.get('http://localhost:8080/api/usuarios/todos').then(res => {
      this.setState({
        usuarios: res.data,
      });
    });
    console.log(this.state.usuarios);
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> Usuários dos Clientes
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Código</th>
                      <th scope="col">Nome</th>
                      <th scope="col">Data de Cadastro</th>
                      <th scope="col">Email</th>
                      <th scope="col">Senha de acesso</th>
                      <th scope="col">Situação</th>
                      <th scope="col">Cliente Proprietário</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.usuarios.map(usuario => (
                      <tr>
                        <td>{usuario.id}</td>
                        <td>{usuario.nome}</td>
                        <td>{usuario.dataCadastro}</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.senha}</td>
                        <td>{usuario.situacao}</td>
                        <td>{usuario.cliente.nome + ' (Código: ' + usuario.cliente.id + ')'}</td>
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

export default Users;
