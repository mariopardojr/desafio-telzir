import React from 'react';
import fares from '../data';

class Calculador extends React.Component {
  constructor() {
    super();

    this.state = {
      origin: '011',
      destination: '',
      destinationList: [],
      originList: [],
      currentFare: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    this.updateState();
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  updateState() {
    const { origin } = this.state;
    const destinationList = Object.keys(fares).filter((ddd) => ddd !== origin);
    const originList = ['011', ...destinationList];
    this.setState({
      destinationList,
      originList,
      destination: '016',
    });
  }

  renderDestinationDropdown() {

  }

  renderOriginDropdown() {
    return (
      <label htmlFor="origin-input">
        Origem:
        <select id="origin-input" name="origin" onChange={ this.handleChange }>
          <option value="011">011</option>
          {Object.keys(fares)
            .map((ddd) => <option key={ ddd } value={ ddd }>{ddd}</option>)}
        </select>
      </label>
    );
  }

  render() {
    return (
      <main>
        <h2>Faça aqui a sua simulação!</h2>
        <section>
          <form>
            {this.renderOriginDropdown()}
          </form>
        </section>
      </main>
    );
  }
}

export default Calculador;
