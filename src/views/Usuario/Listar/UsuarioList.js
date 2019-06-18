import React, { Component } from 'react';
import {
  Alert,
  Card,
  Button,
  CardBody,
  Modal,
  ModalFooter,
  ModalHeader,
  CardHeader,
  Col,
  Row,
  Table,
} from 'reactstrap';
import axios from 'axios';
import ReactLoading from 'react-loading';

const urlEditar = 'http://localhost:3000/#/usuarios/cadastrar/';
const urlRemover = 'http://localhost:8080/api/usuarios/remover/';
let token = '';
let Authorization = '';
class UsuarioList extends Component {
  constructor(props) {
    super(props);
    let tokenCookie = document.cookie.includes('token')
      ? document.cookie
          .split('token=')[1]
          .replace('"', '')
          .replace('"', '')
          .split(';')[0]
      : '';
    let permissao = document.cookie.includes('permissao')
      ? document.cookie
          .split('permissao=')[1]
          .replace('"', '')
          .replace('"', '')
          .split(';')[0]
      : '';
    token = tokenCookie;
    if (permissao === 'USER') {
      window.location.href = 'http://localhost:3000/#/403';
    }
    if (tokenCookie === '') {
      window.location.href = 'http://localhost:3000/#/login';
    }
    this.state = {
      isLoading: true,
      usuarios: [],
      modal: false,
      idUsuario: '',
      nome: '',
      errors: [],
    };
    Authorization = `Bearer ${token}`;
    this.initialize();
  }

  async initialize() {
    await axios
      .get('http://localhost:8080/api/usuarios/todos', {
        headers: { Authorization },
      })
      .then(res => {
        this.setState({
          usuarios: res.data,
          isLoading: false,
        });
      });
  }
  openModal(id, nome) {
    this.setState({
      modal: true,
      idUsuario: id,
      nome: nome,
    });
  }

  closeModal() {
    this.setState({
      modal: false,
    });
  }

  async remover(id) {
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
            <Col xl={12}>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify" /> Usuários de Vevndedores
                </CardHeader>
                <CardBody>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th scope="col">Código</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Data de Cadastro</th>
                        <th scope="col">Email</th>
                        <th scope="col">Permissão</th>
                        <th scope="col">Autorizado a</th>
                        <th scope="col">Situação</th>
                        <th scope="col">Vendedor Proprietário</th>
                        <th scope="col">Código Administrador</th>
                        <th scope="col">Editar</th>
                        <th scope="col">Remover</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.usuarios.map(usuario => (
                        <tr>
                          <td>{usuario.id}</td>
                          <td>{usuario.nome}</td>
                          <td>
                            {usuario.dataCadastro.substring(8, 10) +
                              '/' +
                              usuario.dataCadastro.substring(5, 7) +
                              '/' +
                              usuario.dataCadastro.substring(0, 4)}
                          </td>
                          <td>{usuario.email}</td>
                          <td>
                            {usuario.permissoesUsuario.permissao === 'USER'
                              ? 'Usuário'
                              : 'Administrador'}
                          </td>
                          <td>{usuario.permissoesUsuario.descricao}</td>
                          <td>
                            <Button
                              size="sm"
                              color={usuario.situacao === 'ATIVO' ? 'success' : 'danger'}
                            >
                              {usuario.situacao}
                            </Button>
                          </td>
                          <td>
                            {usuario.vendedor.nome + ' (Código: ' + usuario.vendedor.id + ')'}
                          </td>
                          {usuario.usuarioProprietario ? (
                            <td>{usuario.usuarioProprietario}</td>
                          ) : (
                            <td>Admin</td>
                          )}
                          <td>
                            <Button size="sm" color="primary" href={urlEditar + usuario.id}>
                              Editar
                            </Button>
                          </td>
                          <td>
                            <Button
                              size="sm"
                              color="danger"
                              onClick={() => this.openModal(usuario.id, usuario.nome)}
                            >
                              Remover
                            </Button>
                            <Modal isOpen={this.state.modal} className={this.props.className}>
                              <ModalHeader>Deseja remover o usuário {this.state.nome}?</ModalHeader>
                              <ModalFooter>
                                <Button
                                  color="danger"
                                  onClick={() => this.remover(this.state.idUsuario)}
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
                {this.state.errors.details && (
                  <Alert color="danger">
                    <strong>* Erro ao remover usuário: {this.state.errors.details}</strong>
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

export default UsuarioList;
