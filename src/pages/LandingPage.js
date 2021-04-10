import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import style from '../styles/Pages/LandingPage.module.css';

class LandingPage extends React.Component {
  render() {
    return (
      <main className={ style.mainLandingPage }>
        <div className={ style.landingPageHeader }>
          <h2 className={ style.welcomeMessege }>Bem-vindo a Telzir</h2>
          <img className={ style.logo } src={ logo } alt="Telzir Logo" />
        </div>
        <div className={ style.paragraphs }>
          <p>
            {`Nós da Telzir, nos preocupamos muito 
            com a transparência e qualidade de nossos serviços.`}
          </p>
          <p>
            {`Por isso, estamos disponibilizando uma ferramenta 
            que mostra exatamente o quanto você pagará!`}
          </p>
        </div>
        <div className={ style.arrowLink }>
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
