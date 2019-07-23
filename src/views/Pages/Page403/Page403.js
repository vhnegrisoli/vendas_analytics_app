import React, { Component } from 'react';
import {
  Alert,
  Button,
  Col,
  Container,
  Label,
  Row,
} from 'reactstrap';

class Page404 extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Alert color="danger">
                <div className="clearfix">
                  <h1 className="float-left display-3 mr-4">403</h1>
                  <h4 className="pt-3">Sem autorização.</h4>
                  <p className="text-muted float-left">
                    Você não tem permissão para visualizar esta página.
                  </p>
                </div>
              </Alert>
              <Label>Voltar ao menu inicial?</Label>{' '}
              <Button color="primary" href="https://vendas-analytics-app.herokuapp.com">
                Menu
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Page404;
