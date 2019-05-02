import React, { Component } from 'react';
import {
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalFooter,
  Button,
  CardHeader,
  Col,
  Row,
  Table,
} from 'reactstrap';
import axios from 'axios';

const urlEditar = 'http://localhost:3000/#/fornecedores/cadastrar/';
const urlRemover = 'http://localhost:8080/api/fornecedores/remover/';

class FornecedorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fornecedores: [],
      idFornecedor: '',
      nomeFantasia: '',
      modal: false,
    };
    this.initialize();
  }

  async initialize() {
    await axios.get('http://localhost:8080/api/fornecedores/todos').then(res => {
      this.setState({
        fornecedores: res.data,
      });
    });
  }

  openModal(id, nomeFantasia) {
    this.setState({
      modal: true,
      idFornecedor: id,
      nomeFantasia: nomeFantasia,
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
                      <th scope="col">Editar</th>
                      <th scope="col">Remover</th>
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
                        <td>
                          <Button size="sm" color="primary" href={urlEditar + fornecedor.id}>
                            Editar
                          </Button>
                        </td>
                        <td>
                          <Button
                            size="sm"
                            color="danger"
                            onClick={() => this.openModal(fornecedor.id, fornecedor.nomeFantasia)}
                          >
                            Remover
                          </Button>
                          <Modal isOpen={this.state.modal} className={this.props.className}>
                            <ModalHeader>
                              Deseja remover o fornecedor {this.state.nomeFantasia}?
                            </ModalHeader>
                            <ModalFooter>
                              <Button
                                color="danger"
                                onClick={() => this.remover(this.state.idFornecedor)}
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
          </Col>
        </Row>
      </div>
    );
  }
}

export default FornecedorList;
