import React from 'react';
import PropsTypes from 'prop-types';
import logo from '../images/logo.png';
import style from '../styles/Pages/Calculator.module.css';
import styleHeader from '../styles/Components/Header.module.css';
import animation from '../styles/Animations.module.css';

class Header extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className={ styleHeader.container }>
        <img
          className={ `${styleHeader.logo} ${animation.fadeInDown}` }
          src={ logo }
          alt="Telzir Logo"
        />
        <h2
          className={ `${style.title} ${animation.fadeInDown}` }
        >
          {children}
        </h2>
      </div>
    );
  }
}

Header.propTypes = {
  children: PropsTypes.node.isRequired,
};

export default Header;
