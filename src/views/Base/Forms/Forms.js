import React, { Component } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
} from 'reactstrap';

class Forms extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      cliente: [],
      estados: [],
      cidade: [],
      endereco: [],
    };
  }

  componentDidMount() {
    axios.get('https://vendas-analytics-api-postgres.herokuapp.com/api/estados/listar').then(res => {
      this.setState({
        estados: res.data,
      });
    });
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState(prevState => {
      return { fadeIn: !prevState };
    });
  }

  onSubmit() {
    var form = document.querySelector('cliente-form');
    var data = new FormData(form);
    axios.post('localhost:8080/api/vendedores/salvar', {
      data: data,
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Col xs="12" md="12">
          <Card>
            <CardHeader>
              <strong>Clientes </strong> - Cadastrar
            </CardHeader>
            <CardBody>
              <Form
                id="cliente-form"
                action=""
                method="post"
                encType="multipart/form-data"
                className="form-horizontal"
              >
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Nome completo*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="text-input"
                      required
                      name="text-input"
                      placeholder="Nome completo"
                    />
                    <FormText color="muted">Digite o nome completo do cliente.</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="email-input">Email*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="email"
                      id="email-input"
                      name="email-input"
                      placeholder="Email"
                      autoComplete="email"
                    />
                    <FormText className="help-block">Digite o email.</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="cpf-input">CPF*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="cpf-input"
                      name="cpf-input"
                      placeholder="CPF"
                      autoComplete="cpf"
                    />
                    <FormText className="help-block">Digite o CPF.</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="rg-input">RG*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="rg-input"
                      name="rg-input"
                      placeholder="RG"
                      autoComplete="rg"
                    />
                    <FormText className="help-block">Digite o RG.</FormText>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="date-input">Data de Nascimento*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="date" id="date-input" name="date-input" placeholder="date" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="telefone-input">Telefone/Celular*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="telefone"
                      id="telefone-input"
                      name="telefone-input"
                      placeholder="Telefone"
                      autoComplete="telefone"
                    />
                    <FormText className="help-block">Digite o telefone.</FormText>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
            <CardHeader>
              <strong>Endereço </strong>
            </CardHeader>
            <CardFooter>
              <Form
                action=""
                method="post"
                encType="multipart/form-data"
                className="form-horizontal"
              >
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Rua*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" id="rua-input" required name="rua-input" placeholder="Rua" />
                    <FormText color="muted">Digite o nome da rua.</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Número*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="number"
                      id="numero-input"
                      required
                      name="rua-input"
                      placeholder="Número"
                    />
                    <FormText color="muted">Digite o número da rua.</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Cidade*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="cidade-input"
                      required
                      name="cidade-input"
                      placeholder="Cidade"
                    />
                    <FormText color="muted">Digite a cidade.</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Estado*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="select" name="select" required id="select">
                      <option value="0">Por favor, selecione um estado:</option>
                      {this.state.estados.map(estado => (
                        <option value={estado.id}>{estado.estado}</option>
                      ))}
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row />
              </Form>
            </CardFooter>

            <CardFooter>
              <Button type="submit" size="sm" color="primary">
                <i className="fa fa-dot-circle-o" />
                Cadastrar
              </Button>
            </CardFooter>
          </Card>
        </Col>
      </div>
      /*</div>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="select">Select</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="select" name="select" id="select">
                      <option value="0">Please select</option>
                      <option value="1">Option #1</option>
                      <option value="2">Option #2</option>
                      <option value="3">Option #3</option>
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="selectLg">Select Large</Label>
                  </Col>
                  <Col xs="12" md="9" size="lg">
                    <Input type="select" name="selectLg" id="selectLg" bsSize="lg">
                      <option value="0">Please select</option>
                      <option value="1">Option #1</option>
                      <option value="2">Option #2</option>
                      <option value="3">Option #3</option>
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="selectSm">Select Small</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="select" name="selectSm" id="SelectLm" bsSize="sm">
                      <option value="0">Please select</option>
                      <option value="1">Option #1</option>
                      <option value="2">Option #2</option>
                      <option value="3">Option #3</option>
                      <option value="4">Option #4</option>
                      <option value="5">Option #5</option>
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="disabledSelect">Disabled Select</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="select"
                      name="disabledSelect"
                      id="disabledSelect"
                      disabled
                      autoComplete="name"
                    >
                      <option value="0">Please select</option>
                      <option value="1">Option #1</option>
                      <option value="2">Option #2</option>
                      <option value="3">Option #3</option>
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="multiple-select">Multiple select</Label>
                  </Col>
                  <Col md="9">
                    <Input type="select" name="multiple-select" id="multiple-select" multiple>
                      <option value="1">Option #1</option>
                      <option value="2">Option #2</option>
                      <option value="3">Option #3</option>
                      <option value="4">Option #4</option>
                      <option value="5">Option #5</option>
                      <option value="6">Option #6</option>
                      <option value="7">Option #7</option>
                      <option value="8">Option #8</option>
                      <option value="9">Option #9</option>
                      <option value="10">Option #10</option>
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label>Radios</Label>
                  </Col>
                  <Col md="9">
                    <FormGroup check className="radio">
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="radio1"
                        name="radios"
                        value="option1"
                      />
                      <Label check className="form-check-label" htmlFor="radio1">
                        Option 1
                      </Label>
                    </FormGroup>
                    <FormGroup check className="radio">
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="radio2"
                        name="radios"
                        value="option2"
                      />
                      <Label check className="form-check-label" htmlFor="radio2">
                        Option 2
                      </Label>
                    </FormGroup>
                    <FormGroup check className="radio">
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="radio3"
                        name="radios"
                        value="option3"
                      />
                      <Label check className="form-check-label" htmlFor="radio3">
                        Option 3
                      </Label>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label>Inline Radios</Label>
                  </Col>
                  <Col md="9">
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="inline-radio1"
                        name="inline-radios"
                        value="option1"
                      />
                      <Label className="form-check-label" check htmlFor="inline-radio1">
                        One
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="inline-radio2"
                        name="inline-radios"
                        value="option2"
                      />
                      <Label className="form-check-label" check htmlFor="inline-radio2">
                        Two
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="inline-radio3"
                        name="inline-radios"
                        value="option3"
                      />
                      <Label className="form-check-label" check htmlFor="inline-radio3">
                        Three
                      </Label>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label>Checkboxes</Label>
                  </Col>
                  <Col md="9">
                    <FormGroup check className="checkbox">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id="checkbox1"
                        name="checkbox1"
                        value="option1"
                      />
                      <Label check className="form-check-label" htmlFor="checkbox1">
                        Option 1
                      </Label>
                    </FormGroup>
                    <FormGroup check className="checkbox">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id="checkbox2"
                        name="checkbox2"
                        value="option2"
                      />
                      <Label check className="form-check-label" htmlFor="checkbox2">
                        Option 2
                      </Label>
                    </FormGroup>
                    <FormGroup check className="checkbox">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id="checkbox3"
                        name="checkbox3"
                        value="option3"
                      />
                      <Label check className="form-check-label" htmlFor="checkbox3">
                        Option 3
                      </Label>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label>Inline Checkboxes</Label>
                  </Col>
                  <Col md="9">
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id="inline-checkbox1"
                        name="inline-checkbox1"
                        value="option1"
                      />
                      <Label className="form-check-label" check htmlFor="inline-checkbox1">
                        One
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id="inline-checkbox2"
                        name="inline-checkbox2"
                        value="option2"
                      />
                      <Label className="form-check-label" check htmlFor="inline-checkbox2">
                        Two
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id="inline-checkbox3"
                        name="inline-checkbox3"
                        value="option3"
                      />
                      <Label className="form-check-label" check htmlFor="inline-checkbox3">
                        Three
                      </Label>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="file-input">File input</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="file" id="file-input" name="file-input" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="file-multiple-input">Multiple File input</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="file"
                      id="file-multiple-input"
                      name="file-multiple-input"
                      multiple
                    />
                  </Col>
                </FormGroup>
                <FormGroup row hidden>
                  <Col md="3">
                    <Label className="custom-file" htmlFor="custom-file-input">
                      Custom file input
                    </Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Label className="custom-file">
                      <Input
                        className="custom-file"
                        type="file"
                        id="custom-file-input"
                        name="file-input"
                      />
                      <span className="custom-file-control" />
                    </Label>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
                */
    );
  }
}

export default Forms;
