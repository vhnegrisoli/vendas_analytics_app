import React, { Component, lazy } from 'react';
import { Link } from 'react-router-dom';
import {
  Badge,
  Card,
  CardBody,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  ButtonDropdown,
  CardHeader,
  Col,
  Row,
  Table,
} from 'reactstrap';
import axios from 'axios';

const url = 'http://localhost:3000/#/categorias/cadastrar/';
const urlCsv = 'http://localhost:8080/api/vendas/relatorio-csv';
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
                        <td>
                          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret>
                              <i class="icon-options" />
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem href={url + categoria.id}>Editar</DropdownItem>
                              <DropdownItem href={urlCsv}>Remover</DropdownItem>
                            </DropdownMenu>
                          </ButtonDropdown>
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
