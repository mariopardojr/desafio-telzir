import React from 'react';
import PropsTypes from 'prop-types';
import style from '../styles/Components/ResultScreen.module.css';
import animation from '../styles/Animations.module.css';

class ResultScreen extends React.Component {
  render() {
    const { data: { service, result }, handleClick } = this.props;
    const { withPlan, withoutPlan } = result;
    return (
      <div className={ `${style.container} ${animation.fadeInUp}` }>
        <div className={ style.result }>
          <h3>{`Com ${service}`}</h3>
          <p>{`Essa ligação custará $${parseFloat(withPlan.total).toFixed(2)}`}</p>
          <span>
            {`Minutos restantes: ${withPlan.residual}`}
          </span>
        </div>
        <div className={ style.result }>
          <h3>Sem Plano</h3>
          <p>{`Essa ligação custará $${parseFloat(withoutPlan).toFixed(2)}`}</p>
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
