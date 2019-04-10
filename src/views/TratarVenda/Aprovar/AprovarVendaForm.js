import React, { Component } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Table,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  CustomInput,
  Row,
} from 'reactstrap';
import { format } from 'path';
import { hidden } from 'ansi-colors';

class AprovarVendaForm extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      isLoading: true,
      timeout: 300,
      vendas: [],
    };

    axios.get('http://localhost:8080/api/vendas/todas').then(res => {
      this.setState({
        vendas: res.data,
        isLoading: false,
      });
      console.log(res.data);
    });
    this.forceUpdate();
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState(prevState => {
      return { fadeIn: !prevState };
    });
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit(e) {}

  precoOnClick(e) {}

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
                        <th scope="col">Cliente</th>
                        <th scope="col">Data de Efetuação</th>
                        <th scope="col">Detalhar Venda</th>
                        <th scope="col">Aprovar Venda</th>
                        <th scope="col">Rejeitar Venda</th>
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
                          <td>{venda.clientes.nome}</td>
                          <td>
                            {venda.dataCompra.substring(8, 10) +
                              '/' +
                              venda.dataCompra.substring(5, 7) +
                              '/' +
                              venda.dataCompra.substring(0, 4)}
                          </td>
                          <td>
                            <Button href={'#/detalhar-venda/' + venda.id}>Detalhar </Button>
                          </td>
                          <td>
                            {venda.aprovacao === 'AGUARDANDO_APROVACAO' && (
                              <Button
                                size="sm"
                                href={'http://localhost:8080/api/vendas/aprovar-venda/' + venda.id}
                                color="success"
                              >
                                Aprovar
                              </Button>
                            )}
                          </td>
                          <td>
                            {venda.aprovacao === 'AGUARDANDO_APROVACAO' && (
                              <Button
                                size="sm"
                                href={'http://localhost:8080/api/vendas/rejeitar-venda/' + venda.id}
                                color="danger"
                                href={''}
                              >
                                Rejeitar
                              </Button>
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
