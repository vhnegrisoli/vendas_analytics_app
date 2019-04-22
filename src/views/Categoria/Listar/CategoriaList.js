import React, { Component, lazy } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter, CardHeader, Col, Row, Table } from 'reactstrap';
import axios from 'axios';

const urlEditar = 'http://localhost:3000/#/categorias/cadastrar/';
const urlRemover = 'http://localhost:8080/api/categorias/remover/';
class CategoriaList extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      modal: false,
      categorias: [],
    };
    this.initialize();
  }

  async initialize() {
    await axios.get('http://localhost:8080/api/categorias/todas').then(res => {
      this.setState({
        categorias: res.data,
      });
    });
    this.forceUpdate();
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  async remover(id) {
    await axios.get(urlRemover + id);
    this.initialize();
    this.toggle()
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
                          <Button
                            size="sm"
                            color="danger"
                            onClick={this.toggle}>
                            Remover
                          </Button>
                          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}>Deseja remover a categoria {categoria.descricao}?</ModalHeader>
                            <ModalFooter>
                              <Button color="danger" onClick={() => this.remover(categoria.id)}>Remover</Button>{' '}
                              <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
                            </ModalFooter>
                          </Modal>
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
