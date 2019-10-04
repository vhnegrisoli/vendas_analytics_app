import React, { Component } from 'react';
import {
  Alert,
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
let token = '';
let Authorization = '';
let permissao = '';
const urlEditar = 'https://vendas-analytics-app-hom.herokuapp.com/#/vendedores/cadastrar/';
const urlRemover = 'https://vendas-analytics-api-postgres.herokuapp.com/api/vendedores/remover/';

class VendedorList extends Component {
  constructor(props) {
    super(props);
    let tokenCookie = document.cookie.includes('token')
      ? document.cookie
          .split('token=')[1]
          .replace('"', '')
          .replace('"', '')
          .split(';')[0]
      : '';
    token = tokenCookie;
    permissao = document.cookie.includes('permissao')
      ? document.cookie
          .split('permissao=')[1]
          .replace('"', '')
          .replace('"', '')
          .split(';')[0]
      : '';
    if (tokenCookie === '') {
      window.location.href = 'https://vendas-analytics-app-hom.herokuapp.com/#/login';
    }
    this.state = {
      modal: false,
      clientes: [],
      idCliente: '',
      nomeCliente: '',
      isLoading: true,
      errors: [],
      isPostLoading: false,
    };
    Authorization = `Bearer ${token}`;
    this.initialize();
    this.forceUpdate();
  }

  async initialize() {
    this.setState({ isPostLoading: true });
    await axios
      .get('https://vendas-analytics-api-postgres.herokuapp.com/api/vendedores/todos', {
        headers: { Authorization },
      })
      .then(res => {
        this.setState({
          clientes: res.data,
          isLoading: false,
        });
      })
      .catch(error => {
        if (error.message.includes('401')) {
          window.location.href = 'https://vendas-analytics-app-hom.herokuapp.com/#/login';
        }
      });
    this.setState({ isPostLoading: false });
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
    this.setState({ isPostLoading: true });
    await axios
      .get(urlRemover + id, {
        headers: { Authorization },
      })
      .catch(res => {
        this.state.errors = res.response.data;
      });
    this.forceUpdate();
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
                  <i className="fa fa-align-justify" /> Vendedores
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
                        {permissao !== 'USER' && <th scope="col">Editar</th>}
                        {permissao !== 'USER' && <th scope="col">Remover</th>}
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
                          {permissao !== 'USER' && (
                            <td>
                              {this.state.isPostLoading ? (
                                <ReactLoading type={'spin'} color={'#0080FF'} />
                              ) : (
                                <Button size="sm" color="primary" href={urlEditar + cliente.id}>
                                  Editar
                                </Button>
                              )}
                            </td>
                          )}
                          {permissao !== 'USER' && (
                            <td>
                              {this.state.isPostLoading ? (
                                <ReactLoading type={'spin'} color={'#FF0000'} />
                              ) : (
                                <Button
                                  size="sm"
                                  color="danger"
                                  onClick={() => this.openModal(cliente.id, cliente.nome)}
                                >
                                  Remover
                                </Button>
                              )}
                              <Modal isOpen={this.state.modal} className={this.props.className}>
                                <ModalHeader>
                                  Deseja remover o cliente {this.state.nomeCliente}?
                                </ModalHeader>
                                <ModalFooter>
                                  {this.state.isPostLoading ? (
                                    <ReactLoading type={'spin'} color={'#FF0000'} />
                                  ) : (
                                    <Button
                                      color="danger"
                                      onClick={() => this.remover(this.state.idCliente)}
                                    >
                                      Remover
                                    </Button>
                                  )}
                                  {this.state.isPostLoading ? (
                                    <ReactLoading type={'spin'} color={'#E5E5FF'} />
                                  ) : (
                                    <Button color="secondary" onClick={() => this.closeModal()}>
                                      Cancelar
                                    </Button>
                                  )}
                                </ModalFooter>
                              </Modal>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
                {this.state.errors.details && (
                  <Alert color="danger">
                    <strong>* Erro ao remover cliente: {this.state.errors.details}</strong>
                  </Alert>
                )}
              </Card>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default VendedorList;
