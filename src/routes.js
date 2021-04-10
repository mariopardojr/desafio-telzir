import React from 'react';
import { Route, Switch } from 'react-router';
import Calculador from './pages/Calculador';
import LandingPage from './pages/LandingPage';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/calculadora" component={ Calculador } />
        <Route exact path="/" component={ LandingPage } />
      </Switch>
    );
  }
}

export default Routes;
