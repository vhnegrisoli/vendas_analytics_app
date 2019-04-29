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

const urlEditar = 'http://localhost:3000/#/cliente/cadastrar/';
const urlRemover = 'http://localhost:8080/api/clientes/remover/';
class ClienteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      clientes: [],
      idCliente: '',
      nomeCliente: '',
      isLoading: true,
    };
    this.initialize();
    this.forceUpdate();
  }

  async initialize() {
    await axios.get('http://localhost:8080/api/clientes/todos').then(res => {
      this.setState({
        clientes: res.data,
        isLoading: false,
      });
    });
  }

  openModal(id, nome) {
    this.setState({
      modal: true,
      idCliente: id,
      nomeCliente: nome,
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
          <Col xl={12}>
            {this.state.isLoading ? (
              <ReactLoading type={'spin'} />
            ) : (
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify" /> Clientes
                </CardHeader>
                <CardBody>
                  <Table responsive hover id="myTable">
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
                            <Button size="sm" color="primary" href={urlEditar + cliente.id}>
                              Editar
                            </Button>
                          </td>
                          <td>
                            <Button
                              size="sm"
                              color="danger"
                              onClick={() => this.openModal(cliente.id, cliente.nome)}
                            >
                              Remover
                            </Button>
                            <Modal isOpen={this.state.modal} className={this.props.className}>
                              <ModalHeader>
                                Deseja remover o cliente {this.state.nomeCliente}?
                              </ModalHeader>
                              <ModalFooter>
                                <Button
                                  color="danger"
                                  onClick={() => this.remover(this.state.idCliente)}
                                >
                                  Remover
                                </Button>
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

export default ClienteList;
