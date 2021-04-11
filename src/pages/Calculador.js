import React from 'react';
import Form from '../components/Form';
import ResultScreen from '../components/ResultScreen';
import { withPlan, withoutPlan } from '../helpers/calculation';
import logo from '../images/logo.png';
import style from '../styles/Pages/Calculador.module.css';

const INITAL_STATE = {
  origin: '',
  destination: '',
  service: 'FaleMais 30',
  min: '',
  shouldRender: false,
  result: {},
};

class Calculador extends React.Component {
  constructor() {
    super();

    this.state = {
      ...INITAL_STATE,
    };

    this.handleChange = this.handleChange.bind(this);
    this.Calculate = this.Calculate.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    if (target.name === 'origin') this.setState({ destination: '' });
    this.setState({
      [target.name]: target.value,
    });
  }

  handleClick() {
    this.setState({
      ...INITAL_STATE,
    });
  }

  Calculate() {
    const { origin, destination, service, min } = this.state;
    if (origin !== '011') {
      this.setState({
        result: {
          withPlan: withPlan(service, min, origin),
          withoutPlan: withoutPlan(min, origin),
        },
        shouldRender: true,
      });
    } else if (origin === '011') {
      this.setState({
        result: {
          withPlan: withPlan(service, min, origin, destination),
          withoutPlan: withoutPlan(min, origin, destination),
        },
        shouldRender: true,
      });
    }
  }

  render() {
    const { origin, destination, min, service, result, shouldRender } = this.state;
    return (
      <main>
        <div className={ style.container }>
          <img className={ style.logo } src={ logo } alt="Telzir Logo" />
          <h2 className={ style.title }>Faça aqui a sua simulação!</h2>
          {shouldRender ? (<ResultScreen
            data={ { service, result } }
            handleClick={ this.handleClick }
          />) : (
            <Form
              handleChange={ this.handleChange }
              handleClick={ this.Calculate }
              data={ { origin, destination, min } }
            />)}
        </div>
      </main>
    );
  }
}

export default Calculador;
