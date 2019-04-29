import React, { Component, lazy } from 'react';
import {
  Card, CardBody, Button, CardHeader, Col, Row, Table, Modal,
  ModalHeader,
  ModalFooter
} from 'reactstrap';
import axios from 'axios';
import ReactLoading from 'react-loading';

const urlEditar = 'http://localhost:3000/#/produtos/cadastrar/';
const urlRemover = 'http://localhost:8080/api/produtos/remover/';

class ProdutoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      produtos: [],
      isLoading: true,
      modal: false,
      nomeProduto: '',
      idProduto: ''
    };
    this.initialize();
  }

  async initialize() {
    await axios.get('http://localhost:8080/api/produtos/todos').then(res => {
      this.setState({
        produtos: res.data,
        isLoading: false
      });
    });
    this.forceUpdate();
  };

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
                          <th scope="col">Editar</th>
                          <th scope="col">Remover</th>
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
                            <td>
                              <Button size="sm" color="primary" href={urlEditar + produto.id}>
                                Editar
                          </Button>
                            </td>
                            <td>
                              <Button
                                size="sm"
                                color="danger"
                                onClick={() => this.openModal(produto.id, produto.nomeProduto)}
                              >Remover</Button>
                              <Modal isOpen={this.state.modal} className={this.props.className}>
                                <ModalHeader>
                                  Deseja remover a categoria {this.state.nomeProduto}?
                              </ModalHeader>
                                <ModalFooter>
                                  <Button
                                    color="danger"
                                    onClick={() => this.remover(this.state.idProduto)}
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

export default ProdutoList;
