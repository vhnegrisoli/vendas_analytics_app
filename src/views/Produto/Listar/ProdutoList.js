import React, { Component } from 'react';
import {
  Alert,
  Card,
  CardBody,
  Button,
  CardHeader,
  Col,
  Row,
  Table,
  Modal,
  ModalHeader,
  ModalFooter,
} from 'reactstrap';
import axios from 'axios';
import ReactLoading from 'react-loading';

const urlEditar = 'http://localhost:3000/#/produtos/cadastrar/';
const urlRemover = 'http://localhost:8080/api/produtos/remover/';
let token = '';
let Authorization = '';
let permissao = '';
class ProdutoList extends Component {
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
      window.location.href = 'http://localhost:3000/#/login';
    }
    this.state = {
      produtos: [],
      isLoading: true,
      modal: false,
      nomeProduto: '',
      idProduto: '',
      errors: [],
      isPostLoading: false,
    };
    Authorization = `Bearer ${token}`;
    this.initialize();
  }

  async initialize() {
    this.setState({ isPostLoading: true });
    await axios
      .get('http://localhost:8080/api/produtos/todos', {
        headers: { Authorization },
      })
      .then(res => {
        this.setState({
          produtos: res.data,
          isLoading: false,
        });
      })
      .catch(error => {
        if (error.message.includes('401')) {
          window.location.href = 'http://localhost:3000/#/login';
        }
      });
    this.setState({ isPostLoading: false });
    this.forceUpdate();
  }

  openModal(id, nome) {
    this.setState({
      modal: true,
      idProduto: id,
      nomeProduto: nome,
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
          <Col xl={12}>
            {this.state.isLoading ? (
              <ReactLoading type={'spin'} />
            ) : (
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify" /> Produtos
                </CardHeader>
                <CardBody>
                  <Table responsive hover id="myTable">
                    <thead>
                      <tr>
                        <th scope="col">Código</th>
                        <th scope="col">Nome do Produto</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Fornecedor</th>
                        <th scope="col">Categoria</th>
                        {permissao !== 'USER' && <th scope="col">Editar</th>}
                        {permissao !== 'USER' && <th scope="col">Remover</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.produtos.map(produto => (
                        <tr>
                          <td>{produto.id}</td>
                          <td>{produto.nomeProduto}</td>
                          <td>{produto.descricao}</td>
                          <td>{'R$' + produto.preco.toFixed(2)}</td>
                          <td>{produto.categoria.descricao}</td>
                          <td>{produto.fornecedor.nomeFantasia}</td>
                          {permissao !== 'USER' && (
                            <td>
                              {this.state.isPostLoading ? (
                                <ReactLoading type={'spin'} color={'#0080FF'} />
                              ) : (
                                <Button size="sm" color="primary" href={urlEditar + produto.id}>
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
                                  onClick={() => this.openModal(produto.id, produto.nomeProduto)}
                                >
                                  Remover
                                </Button>
                              )}

                              <Modal isOpen={this.state.modal} className={this.props.className}>
                                <ModalHeader>
                                  Deseja remover a categoria {this.state.nomeProduto}?
                                </ModalHeader>
                                <ModalFooter>
                                  {this.state.isPostLoading ? (
                                    <ReactLoading type={'spin'} color={'#FF0000'} />
                                  ) : (
                                    <Button
                                      color="danger"
                                      onClick={() => this.remover(this.state.idProduto)}
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
                    <strong>* Erro ao remover produto: {this.state.errors.details}</strong>
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

export default ProdutoList;
