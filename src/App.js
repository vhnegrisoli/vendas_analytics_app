import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Iniciando...</div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  token,
  loading,
});

// Pages
const Login = Loadable({
  loader: () => import('./views/Login'),
  loading,
});

const Register = Loadable({
  loader: () => import('./views/Pages/Register'),
  loading,
});

const Page403 = Loadable({
  loader: () => import('./views/Pages/Page403'),
  loading,
});

const Page500 = Loadable({
  loader: () => import('./views/Pages/Page500'),
  loading,
});

let token = '';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
    };
  }

  getToken(value) {
    this.setState({
      token: value,
    });
    this.token = this.state.token;
    token = this.state.token;
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route
            exact
            path="/login"
            name="Login Page"
            component={() => <Login token={this.getToken.bind(this)} />}
          />
          <Route exact path="/register" name="Register Page" component={Register} />
          <Route exact path="/403" name="Page 403" component={Page403} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <Route path="/" name="Página Inicial" component={DefaultLayout} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
