import React from 'react';
import PropsTypes from 'prop-types';

class ResultScreen extends React.Component {
  render() {
    const { data: { service, result }, handleClick } = this.props;
    const { withPlan, withoutPlan } = result;
    return (
      <div>
        <h2>Tarifas</h2>
        <div>
          <h3>{`Com ${service}`}</h3>
          <span>{`Essa ligação custará $${parseFloat(withPlan.total).toFixed(2)}`}</span>
        </div>
        <div>
          <h3>Sem Plano</h3>
          <span>{`Essa ligação custará $${parseFloat(withoutPlan).toFixed(2)}`}</span>
        </div>
        <button type="button" onClick={ handleClick }>Nova consulta</button>
      </div>
    );
  }
}

ResultScreen.propTypes = {
  data: PropsTypes.objectOf(PropsTypes.any).isRequired,
  handleClick: PropsTypes.func.isRequired,
};

export default ResultScreen;
