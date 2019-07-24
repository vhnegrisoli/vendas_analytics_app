import React, { Component } from 'react';
import {
  Alert,
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
import ReactLoading from 'react-loading';

const urlEditar = 'https://vendas-analytics-app.herokuapp.com/#/fornecedores/cadastrar/';
const urlRemover = 'https://vendas-analytics-api.herokuapp.com/api/fornecedores/remover/';
let token = '';
let Authorization = '';
let permissao = '';
class FornecedorList extends Component {
  constructor(props) {
    super(props);
    let tokenCookie = document.cookie.includes('token')
      ? document.cookie
          .split('token=')[1]
          .replace('"', '')
          .replace('"', '')
          .split(';')[0]
      : '';
    permissao = document.cookie.includes('permissao')
      ? document.cookie
          .split('permissao=')[1]
          .replace('"', '')
          .replace('"', '')
          .split(';')[0]
      : '';
    token = tokenCookie;
    if (tokenCookie === '') {
      window.location.href = 'https://vendas-analytics-app.herokuapp.com/#/login';
    }
    this.state = {
      isLoading: true,
      fornecedores: [],
      idFornecedor: '',
      nomeFantasia: '',
      modal: false,
      errors: [],
      isPostLoading: false,
    };
    Authorization = `Bearer ${token}`;
    this.initialize();
  }

  async initialize() {
    this.setState({ isPostLoading: true });
    await axios
      .get('https://vendas-analytics-api.herokuapp.com/api/fornecedores/todos', {
        headers: { Authorization },
      })
      .then(res => {
        this.setState({
          fornecedores: res.data,
          isLoading: false,
        });
      })
      .catch(error => {
        if (error.message.includes('401')) {
          window.location.href = 'http://localhost:3000/#/login';
        }
      });
    this.setState({ isPostLoading: false });
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
    this.setState({ isPostLoading: true });
    await axios
      .get(urlRemover + id, {
        headers: { Authorization },
      })
      .catch(res => {
        this.state.errors = res.response.data;
      });
    this.initialize();
    this.closeModal();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          {this.state.isLoading ? (
            <ReactLoading type={'spin'} />
          ) : (
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
                        {permissao !== 'USER' && <th scope="col">Editar</th>}
                        {permissao !== 'USER' && <th scope="col">Remover</th>}
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
                          {permissao !== 'USER' && (
                            <td>
                              {this.state.isPostLoading ? (
                                <ReactLoading type={'spin'} color={'#0080FF'} />
                              ) : (
                                <Button size="sm" color="primary" href={urlEditar + fornecedor.id}>
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
                                  onClick={() =>
                                    this.openModal(fornecedor.id, fornecedor.nomeFantasia)
                                  }
                                >
                                  Remover
                                </Button>
                              )}
                              <Modal isOpen={this.state.modal} className={this.props.className}>
                                <ModalHeader>
                                  Deseja remover o fornecedor {this.state.nomeFantasia}?
                                </ModalHeader>
                                <ModalFooter>
                                  {this.state.isPostLoading ? (
                                    <ReactLoading type={'spin'} color={'#FF0000'} />
                                  ) : (
                                    <Button
                                      color="danger"
                                      onClick={() => this.remover(this.state.idFornecedor)}
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
                    <strong>* Erro ao remover fornecedor: {this.state.errors.details}</strong>
                  </Alert>
                )}
              </Card>
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

export default FornecedorList;
