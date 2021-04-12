import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import LandingPage from '../pages/LandingPage';

describe('Testes da Landing Page', () => {
  test('Verifica se há uma mensagem de boas vindas', () => {
    const { getByText } = renderWithRouter(<LandingPage />);
    const welcomeMessege = getByText(/Bem-vindo/);
    expect(welcomeMessege).toBeInTheDocument();
  });
  test('Verifica se há uma imagem na tela', () => {
    const { getByRole } = renderWithRouter(<LandingPage />);
    const logo = getByRole('img');
    expect(logo.alt).toBe('Telzir Logo');
    expect(logo).toBeInTheDocument();
  });
  test('Verifica se há dois paragráfos na tela', () => {
    renderWithRouter(<LandingPage />);
    const paragraphs = document.querySelectorAll('p');
    expect(paragraphs.length).toBe(2);
  });
  test('Verifica há um botão na tela', () => {
    const { getByRole } = renderWithRouter(<LandingPage />);
    const arrowButton = getByRole('link');
    expect(arrowButton).toBeInTheDocument();
  });
  test('Verifica se o botão rediriciona para "/calculadora"', () => {
    const { history, getByRole } = renderWithRouter(<LandingPage />);
    const arrowButton = getByRole('link');
    userEvent.click(arrowButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/calculadora');
  });
});
