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

const urlEditar = 'https://vendas-analytics-app-hom.herokuapp.com/#/categorias/cadastrar/';
const urlRemover = 'https://vendas-analytics-api-postgres.herokuapp.com/api/categorias/remover/';
let token = '';
let Authorization = '';
let permissao = '';
class CategoriaList extends Component {
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
      idModal: '',
      descricaoModal: '',
      categorias: [],
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
      .get('https://vendas-analytics-api-postgres.herokuapp.com/api/categorias/todas', {
        headers: { Authorization },
      })
      .then(res => {
        this.setState({
          categorias: res.data,
          isLoading: false,
        });
      })
      .catch(error => {
        if (error.message.includes('401')) {
          window.location.href = 'https://vendas-analytics-app-hom.herokuapp.com/#/login';
        }
      });
    this.setState({ isPostLoading: false });
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
                        {permissao !== 'USER' && <th scope="col">Editar itens</th>}
                        {permissao !== 'USER' && <th scope="col">Remover itens</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.categorias.map(categoria => (
                        <tr>
                          <td>{categoria.id}</td>
                          <td>{categoria.descricao}</td>
                          {permissao !== 'USER' && (
                            <td>
                              {this.state.isPostLoading ? (
                                <ReactLoading type={'spin'} color={'#0080FF'} />
                              ) : (
                                <Button size="sm" color="primary" href={urlEditar + categoria.id}>
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
                                  onClick={() => this.openModal(categoria.id, categoria.descricao)}
                                >
                                  Remover
                                </Button>
                              )}
                              <Modal isOpen={this.state.modal} className={this.props.className}>
                                <ModalHeader>
                                  Deseja remover a categoria {this.state.descricaoModal}?
                                </ModalHeader>
                                <ModalFooter>
                                  {this.state.isPostLoading ? (
                                    <ReactLoading type={'spin'} color={'#FF0000'} />
                                  ) : (
                                    <Button
                                      color="danger"
                                      onClick={() => this.remover(this.state.idModal)}
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
                    <strong>* Erro ao remover categoria: {this.state.errors.details}</strong>
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

export default CategoriaList;
