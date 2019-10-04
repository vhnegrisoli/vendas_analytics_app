import React, { Component } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Modal,
  ModalHeader,
  ModalFooter,
  Table,
  Row,
} from 'reactstrap';

let token = '';
let Authorization = '';
const urlAprovar = 'https://vendas-analytics-api-postgres.herokuapp.com/api/vendas/aprovar-venda/';
const urlReprovar = 'https://vendas-analytics-api-postgres.herokuapp.com/api/vendas/rejeitar-venda/';
class AprovarVendaForm extends Component {
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
    if (tokenCookie === '') {
      window.location.href = 'https://vendas-analytics-app-hom.herokuapp.com/#/login';
    }
    this.state = {
      modal: false,
      fadeIn: true,
      isLoading: true,
      timeout: 300,
      vendas: [],
      idVenda: '',
      isPostLoading: false,
    };
    Authorization = `Bearer ${token}`;
    this.initialize();
  }

  async initialize() {
    await axios
      .get('https://vendas-analytics-api-postgres.herokuapp.com/api/vendas/todas', {
        headers: { Authorization },
      })
      .then(res => {
        this.setState({
          vendas: res.data,
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

  openModal(id) {
    this.setState({
      modal: true,
      idVenda: id,
    });
  }

  closeModal() {
    this.setState({
      modal: false,
    });
  }

  async aprovarVenda(id) {
    this.setState({ isPostLoading: true });
    await axios.get(urlAprovar + id, {
      headers: { Authorization },
    });
    this.closeModal();
    this.initialize();
  }

  async reprovarVenda(id) {
    this.setState({ isPostLoading: true });
    await axios.get(urlReprovar + id, {
      headers: { Authorization },
    });
    this.closeModal();
    this.initialize();
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
                <CardHeader>Aprovar ou Rejeitar Vendas</CardHeader>
                <CardBody>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th scope="col">Código da Venda</th>
                        <th scope="col">Situação</th>
                        <th scope="col">Aprovação</th>
                        <th scope="col">Vendedor</th>
                        <th scope="col">Data de Efetuação</th>
                        <th scope="col">Detalhar Venda</th>
                        <th scope="col">Aprovar/Rejeitar Venda</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.vendas.map(venda => (
                        <tr>
                          <td>{venda.id}</td>
                          <td>{venda.situacao}</td>
                          <td>
                            <Button
                              size="sm"
                              color={
                                venda.aprovacao === 'AGUARDANDO_APROVACAO'
                                  ? 'warning'
                                  : venda.aprovacao === 'APROVADA'
                                  ? 'success'
                                  : venda.aprovacao === 'REJEITADA'
                                  ? 'danger'
                                  : ''
                              }
                            >
                              {venda.aprovacao === 'AGUARDANDO_APROVACAO'
                                ? 'AGUARD. APROVAÇÃO'
                                : venda.aprovacao}
                            </Button>
                          </td>
                          <td>{venda.vendedor.nome}</td>
                          <td>
                            {venda.dataCompra.substring(8, 10) +
                              '/' +
                              venda.dataCompra.substring(5, 7) +
                              '/' +
                              venda.dataCompra.substring(0, 4)}
                          </td>
                          <td>
                            {this.state.isPostLoading ? (
                              <ReactLoading type={'spin'} color={'#E5E5FF'} />
                            ) : (
                              <Button href={'#/detalhar-venda/' + venda.id}>Detalhar </Button>
                            )}
                          </td>
                          <td>
                            {venda.aprovacao === 'AGUARDANDO_APROVACAO' && (
                              <div>
                                {this.state.isPostLoading ? (
                                  <ReactLoading type={'spin'} color={'#0080FF'} />
                                ) : (
                                  <Button
                                    size="sm"
                                    onClick={() => this.openModal(venda.id)}
                                    color="primary"
                                  >
                                    Aprovar/Rejeitar Venda {venda.id}
                                  </Button>
                                )}
                                <Modal isOpen={this.state.modal} className={this.props.className}>
                                  <ModalHeader>
                                    Deseja aprovar a venda {this.state.idVenda}?
                                  </ModalHeader>
                                  <ModalFooter>
                                    {this.state.isPostLoading ? (
                                      <ReactLoading type={'spin'} color={'#0080FF'} />
                                    ) : (
                                      <Button
                                        color="primary"
                                        onClick={() => this.aprovarVenda(this.state.idVenda)}
                                      >
                                        Aprovar
                                      </Button>
                                    )}
                                    {this.state.isPostLoading ? (
                                      <ReactLoading type={'spin'} color={'#FF0000'} />
                                    ) : (
                                      <Button
                                        color="danger"
                                        onClick={() => this.reprovarVenda(this.state.idVenda)}
                                      >
                                        Rejeitar
                                      </Button>
                                    )}
                                    {this.state.isPostLoading ? (
                                      <ReactLoading type={'spin'} color={'#E5E5FF'} />
                                    ) : (
                                      <Button onClick={() => this.closeModal()}>Voltar</Button>
                                    )}
                                  </ModalFooter>
                                </Modal>
                              </div>
                            )}
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

export default AprovarVendaForm;
