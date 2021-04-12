import React from 'react';
import { Route, Switch } from 'react-router';
import Calculator from './pages/Calculator';
import LandingPage from './pages/LandingPage';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/calculadora" component={ Calculator } />
        <Route exact path="/" component={ LandingPage } />
      </Switch>
    );
  }
}

export default Routes;
