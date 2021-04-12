import React from 'react';
import PropTypes from 'prop-types';
import { fares, services } from '../data';
import style from '../styles/Components/Form.module.css';
import animation from '../styles/Animations.module.css';

class Form extends React.Component {
  renderOriginDropdown() {
    const { handleChange } = this.props;
    return (
      <div>
        <label htmlFor="origin-input">
          Origem
          <select
            className={ style.dropdown }
            id="origin-input"
            name="origin"
            onChange={ handleChange }
          >
            <option
              className={ style.dropdownDefault }
              defaultValue
              value=""
            >
              Escolha uma origem
            </option>
            <option value="011">011</option>
            {Object.keys(fares)
              .map((ddd) => <option key={ ddd } value={ ddd }>{ddd}</option>)}
          </select>
        </label>
      </div>
    );
  }

  renderDestinationDropdown() {
    const { handleChange, data: { origin } } = this.props;
    const destinationList = origin === '011'
      ? Object.keys(fares) : ['011'];
    return (
      <label htmlFor="destination-input">
        Destino
        <select
          className={ style.dropdown }
          id="destination-input"
          name="destination"
          onChange={ handleChange }
        >
          <option className={ style.dropdownDefault } value="">Escolha um destino</option>
          {destinationList.map((ddd) => <option key={ ddd } value={ ddd }>{ddd}</option>)}
        </select>
      </label>
    );
  }

  renderServiceDropdown() {
    const { handleChange } = this.props;
    return (
      <label htmlFor="service-input">
        Plano
        <select
          className={ style.dropdown }
          id="service-input"
          name="service"
          onChange={ handleChange }
        >
          {
            services.map((item) => (
              <option
                key={ item.service }
                value={ item.service }
              >
                {item.service}
              </option>))
          }
        </select>
      </label>
    );
  }

  renderInputMin() {
    const { handleChange, data: { min } } = this.props;
    return (
      <label htmlFor="min-input">
        Minutos
        <input
          id="min-input"
          type="number"
          value={ min }
          name="min"
          min="1"
          placeholder="Minutos"
          onChange={ handleChange }
        />
      </label>
    );
  }

  render() {
    const { handleClick, data: { origin, destination, min } } = this.props;
    return (
      <form className={ animation.fadeInUp } data-testid="form">
        {this.renderOriginDropdown()}
        {this.renderDestinationDropdown()}
        {this.renderInputMin()}
        {this.renderServiceDropdown()}
        <button
          type="button"
          onClick={ handleClick }
          disabled={ (origin === '' || destination === '') || !min }
        >
          Calcular
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Form;
