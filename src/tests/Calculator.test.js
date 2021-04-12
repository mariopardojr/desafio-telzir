import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import Calculator from '../pages/Calculator';

const TEN_OPTIONS = 10;
const THREE_DROPDOWNS = 3;

describe('Testes da Calculadora', () => {
  test('Verifica se há um título na página', () => {
    const { getByRole } = renderWithRouter(<Calculator />);
    const title = getByRole('heading', { level: 2, name: /faça aqui a sua simulação/i });
    expect(title).toBeInTheDocument();
  });
  test('Verifica se o logo é renderizado', () => {
    const { getByAltText } = renderWithRouter(<Calculator />);
    const logo = getByAltText(/telzir logo/i);
    expect(logo).toBeInTheDocument();
  });
  test('Verifica se o form é renderizado', () => {
    const { getByTestId } = renderWithRouter(<Calculator />);
    const form = getByTestId('form');
    expect(form).toBeInTheDocument();
  });
  test('Verifica se os dropdowns são renderizados', () => {
    const { getAllByRole } = renderWithRouter(<Calculator />);
    const dropdowns = getAllByRole('combobox');
    const options = getAllByRole('option');
    expect(dropdowns.length).toBe(THREE_DROPDOWNS);
    expect(options.length).toBe(TEN_OPTIONS);
  });
  test('Verifica se opção "011" foi selecionada', () => {
    const { getByLabelText, getAllByText, getByText } = renderWithRouter(<Calculator />);
    const originDropdown = getByLabelText('Origem');
    const option1 = getAllByText('011')[0];
    const option2 = getByText('016');
    const option3 = getByText('017');
    const option4 = getByText('018');
    userEvent.selectOptions(originDropdown, [option1]);
    expect(option1.selected).toBe(true);
    expect(option2.selected).toBe(false);
    expect(option3.selected).toBe(false);
    expect(option4.selected).toBe(false);
  });
  test('Verifica se opção "016" foi selecionada', () => {
    const { getByLabelText, getAllByText, getByText } = renderWithRouter(<Calculator />);
    const originDropdown = getByLabelText('Origem');
    const option1 = getAllByText('011')[0];
    const option2 = getByText('016');
    const option3 = getByText('017');
    const option4 = getByText('018');
    userEvent.selectOptions(originDropdown, [option2]);
    expect(option1.selected).toBe(false);
    expect(option2.selected).toBe(true);
    expect(option3.selected).toBe(false);
    expect(option4.selected).toBe(false);
  });
  test('Verifica se opção "017" foi selecionada', () => {
    const { getByLabelText, getAllByText, getByText } = renderWithRouter(<Calculator />);
    const originDropdown = getByLabelText('Origem');
    const option1 = getAllByText('011')[0];
    const option2 = getByText('016');
    const option3 = getByText('017');
    const option4 = getByText('018');
    userEvent.selectOptions(originDropdown, [option3]);
    expect(option1.selected).toBe(false);
    expect(option2.selected).toBe(false);
    expect(option3.selected).toBe(true);
    expect(option4.selected).toBe(false);
  });
  test('Verifica se opção "018" foi selecionada', () => {
    const { getByLabelText, getAllByText, getByText } = renderWithRouter(<Calculator />);
    const originDropdown = getByLabelText('Origem');
    const option1 = getAllByText('011')[0];
    const option2 = getByText('016');
    const option3 = getByText('017');
    const option4 = getByText('018');
    userEvent.selectOptions(originDropdown, [option4]);
    expect(option1.selected).toBe(false);
    expect(option2.selected).toBe(false);
    expect(option3.selected).toBe(false);
    expect(option4.selected).toBe(true);
  });
  test('Verifica quantidade de options no dropdown de Destino', () => {
    const { getByLabelText } = renderWithRouter(<Calculator />);
    const destinationDropdown = getByLabelText('Destino');
    expect(destinationDropdown).toBeInTheDocument();
  });
  test('Verifica se há um input do tipo "number"', () => {
    const { getByLabelText } = renderWithRouter(<Calculator />);
    const inputMin = getByLabelText('Minutos');
    expect(inputMin).toBeInTheDocument();
  });
  test('Verifica se o botão "Calcular" está na desabilitado', () => {

  });
});
