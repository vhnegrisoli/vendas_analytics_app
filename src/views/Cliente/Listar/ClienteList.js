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

const urlEditar = 'http://localhost:3000/#/cliente/cadastrar/';
const urlRemover = 'http://localhost:8080/api/clientes/remover/';
class ClienteList extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      modal: false,
      clientes: [],
    };
    this.initialize();
    this.forceUpdate();
  }

  async initialize() {
    await axios.get('http://localhost:8080/api/clientes/todos').then(res => {
      this.setState({
        clientes: res.data,
      });
    });
    this.forceUpdate();
  }

  toggle() {
    var aberta = this.state.modal;
    this.state.modal = !aberta;
    this.forceUpdate();
  }

  async remover(id) {
    await axios.get(urlRemover + id);
    this.initialize();
    this.toggle();
  }
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
                          <Button size="sm" color="danger" onClick={this.toggle}>
                            Remover
                          </Button>
                          <Modal
                            isOpen={this.state.modal}
                            toggle={this.toggle}
                            className={this.props.className}
                          >
                            <ModalHeader toggle={this.toggle}>
                              Deseja remover o cliente {cliente.id}?
                            </ModalHeader>
                            <ModalFooter>
                              <Button color="danger" onClick={() => this.remover(cliente.id)}>
                                Remover
                              </Button>
                              <Button color="secondary" onClick={this.toggle}>
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
          </Col>
        </Row>
      </div>
    );
  }
}

export default ClienteList;
