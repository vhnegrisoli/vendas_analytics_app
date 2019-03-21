import React, { Component, lazy } from 'react';
import { Link } from 'react-router-dom';
import {
  Badge,
  Card,
  CardBody,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Button,
  CardHeader,
  Col,
  Row,
  Table,
} from 'reactstrap';
import axios from 'axios';

const urlEditar = 'http://localhost:3000/#/categorias/cadastrar/';
const urlRemover = 'http://localhost:8080/api/categorias/remover/';
class CategoriaList extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
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

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  remover(id) {
    axios.get('http://localhost:8080/api/categorias/remover/' + id).then(res => {});
  }

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
                      <th scope="col">Editar itens</th>
                      <th scope="col">Remover itens</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.categorias.map(categoria => (
                      <tr>
                        <td>{categoria.id}</td>
                        <td>{categoria.descricao}</td>
                        <td>
                          <Button size="sm" color="primary" href={urlEditar + categoria.id}>
                            Editar
                          </Button>
                        </td>
                        <td>
                          <Button size="sm" color="danger" href={urlRemover + categoria.id}>
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

export default CategoriaList;