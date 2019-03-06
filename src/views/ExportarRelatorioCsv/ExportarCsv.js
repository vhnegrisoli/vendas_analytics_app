import React, { Component } from 'react';
import axios from 'axios';
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
  Row,
} from 'reactstrap';
import { format } from 'path';

class ExportarCsv extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      categorias: [],
      produtos: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8080/api/categorias/todas').then(res => {
      this.setState({
        categorias: res.data,
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
    axios.post('localhost:8080/api/produtos/salvar', {
      data: data,
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Col xs="12" md="4">
          <Card>
            <CardHeader>
              <strong>Exportar CSV </strong> - Filtros
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
                    <Label htmlFor="date-input">Data de Inicial*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="date" id="date-input" name="date-input" placeholder="date" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="date-input">Data de Final*</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="date" id="date-input" name="date-input" placeholder="date" />
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
            <CardFooter>
              <Button type="submit" size="sm" color="primary">
                <i className="fa fa-dot-circle-o" />
                Gerar relatório
              </Button>
            </CardFooter>
          </Card>
        </Col>
      </div>
    );
  }
}

export default ExportarCsv;
