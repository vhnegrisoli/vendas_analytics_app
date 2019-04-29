import React, { Component } from 'react';
import {
  Card,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  CardHeader,
  Col,
  Row,
  Table,
} from 'reactstrap';
import axios from 'axios';
import ReactLoading from 'react-loading';

const urlEditar = 'http://localhost:3000/#/categorias/cadastrar/';
const urlRemover = 'http://localhost:8080/api/categorias/remover/';
class CategoriaList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      idModal: '',
      descricaoModal: '',
      categorias: [],
      isLoading: true,
    };
    this.initialize();
    this.forceUpdate();
  }

  async initialize() {
    await axios.get('http://localhost:8080/api/categorias/todas').then(res => {
      this.setState({
        categorias: res.data,
        isLoading: false,
      });
    });
    this.forceUpdate();
  }

  openModal(id, descricao) {
    this.setState({
      modal: true,
      idModal: id,
      descricaoModal: descricao,
    });
  }

  closeModal() {
    this.setState({
      modal: false,
    });
  }

  async remover(id) {
    await axios.get(urlRemover + id);
    this.initialize();
    this.closeModal();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            {this.state.isLoading ? (
              <ReactLoading type={'spin'} />
            ) : (
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
                              onClick={() => this.openModal(categoria.id, categoria.descricao)}
                            >
                              Remover
                            </Button>
                            <Modal isOpen={this.state.modal} className={this.props.className}>
                              <ModalHeader>
                                Deseja remover a categoria {this.state.descricaoModal}?
                              </ModalHeader>
                              <ModalFooter>
                                <Button
                                  color="danger"
                                  onClick={() => this.remover(this.state.idModal)}
                                >
                                  Remover
                                </Button>{' '}
                                <Button color="secondary" onClick={() => this.closeModal()}>
                                  Cancelar
                                </Button>
                              </ModalFooter>
                            </Modal>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default CategoriaList;
