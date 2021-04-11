/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import style from '../styles/Pages/LandingPage.module.css';
import animation from '../styles/Animations.module.css';

class LandingPage extends React.Component {
  render() {
    return (
      <main className={ style.mainLandingPage }>
        <div className={ style.landingPageHeader }>
          <h2
            className={ `${style.welcomeMessege} ${animation.fadeInDown}` }
          >
            Bem-vindo a Telzir
          </h2>
          <img
            className={ `${style.logo} ${animation.fadeIn}` }
            src={ logo }
            alt="Telzir Logo"
          />
        </div>
        <div className={ `${style.paragraphs} ${animation.fadeInUp}` }>
          <p>
            {`Nós da Telzir, nos preocupamos muito 
            com a transparência e qualidade de nossos serviços.`}
          </p>
          <p>
            {`Por isso, estamos disponibilizando uma ferramenta 
            que mostra exatamente o quanto você pagará!`}
          </p>
        </div>
        <div className={ `${style.arrowLink} ${animation.fadeInUp}` }>
          <Link to="/calculadora">
            <span>
              <i className="fas fa-angle-double-right" />
            </span>
          </Link>
        </div>
      </main>
    );
  }
}

export default LandingPage;
