import React, { Component, lazy } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import axios from 'axios';

class CategoriaList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorias: [],
    };
  }

  componentDidMount = () => {
    axios.get('http://localhost:8080/api/categorias/todas').then(res => {
      this.setState({
        categorias: res.data,
      });
    });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> Categorias
              </CardHeader>
              <CardBody>
                <Table responsive hover id="myTable">
                  <thead>
                    <tr>
                      <th scope="col">Código</th>
                      <th scope="col">Descrição da Categoria</th>
                      <th scope="col">Opções</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.categorias.map(categoria => (
                      <tr>
                        <td>{categoria.id}</td>
                        <td>{categoria.descricao}</td>
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

export default CategoriaList;
