import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import Calculador from '../pages/Calculator';
import Calculator from '../pages/Calculator';

const TWO_OPTIONS = 2;
const THREE_OPTIONS = 3;
const FOUR_OPTIONS = 4;
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

  test('Verifica se os dropdowns e options são renderizados', () => {
    const { getAllByRole } = renderWithRouter(<Calculator />);
    const dropdowns = getAllByRole('combobox');
    const options = getAllByRole('option');
    expect(dropdowns.length).toBe(THREE_DROPDOWNS);
    expect(options.length).toBe(TEN_OPTIONS);
  });

  test('Verifica se opção do dropdown de Origem foi selecionada', () => {
    const { getByLabelText, getByText } = renderWithRouter(<Calculator />);
    const originDropdown = getByLabelText('Origem');
    const option1 = originDropdown.options[1];
    const option2 = getByText('016');
    const option3 = getByText('017');
    const option4 = getByText('018');

    userEvent.selectOptions(originDropdown, [option1]);
    expect(option1.selected).toBe(true);
    expect(option2.selected).toBe(false);
    expect(option3.selected).toBe(false);
    expect(option4.selected).toBe(false);

    userEvent.selectOptions(originDropdown, [option2]);
    expect(option1.selected).toBe(false);
    expect(option2.selected).toBe(true);
    expect(option3.selected).toBe(false);
    expect(option4.selected).toBe(false);

    userEvent.selectOptions(originDropdown, [option3]);
    expect(option1.selected).toBe(false);
    expect(option2.selected).toBe(false);
    expect(option3.selected).toBe(true);
    expect(option4.selected).toBe(false);

    userEvent.selectOptions(originDropdown, [option4]);
    expect(option1.selected).toBe(false);
    expect(option2.selected).toBe(false);
    expect(option3.selected).toBe(false);
    expect(option4.selected).toBe(true);
  });

  test('Verifica quantidade de options no dropdown de Destino', () => {
    const { getByLabelText } = renderWithRouter(<Calculator />);
    const originDropdown = getByLabelText('Origem');
    const destinationDropdown = getByLabelText('Destino');
    const option = originDropdown.options[1];

    expect(destinationDropdown.options.length).toBe(TWO_OPTIONS);

    userEvent.selectOptions(originDropdown, [option]);
    expect(destinationDropdown.options.length).toBe(FOUR_OPTIONS);
  });

  test('Verifica se o plano FaleMais30 está selecionado ao carregar a página', () => {
    const { getByLabelText } = renderWithRouter(<Calculator />);
    const planDropdown = getByLabelText('Plano');
    expect(planDropdown.options[0].selected).toBe(true);
    expect(planDropdown.options[1].selected).toBe(false);
    expect(planDropdown.options[2].selected).toBe(false);
  });

  test('Verifica a quantidade de options no dropdown de Plano', () => {
    const { getByLabelText } = renderWithRouter(<Calculator />);
    const planDropdown = getByLabelText('Plano');
    expect(planDropdown.options.length).toBe(THREE_OPTIONS);
  });

  test('Verifica se há um input do tipo "number"', () => {
    const { getByLabelText } = renderWithRouter(<Calculator />);
    const inputMin = getByLabelText('Minutos');
    expect(inputMin).toBeInTheDocument();
  });

  test('Verifica se o botão "Calcular" está habilitado ou desabilitado', () => {
    const { getByRole, getByLabelText } = renderWithRouter(<Calculator />);
    const calculateButton = getByRole('button');
    const originDropdown = getByLabelText('Origem');
    const destinationDropdown = getByLabelText('Destino');
    const inputMin = getByLabelText('Minutos');

    expect(calculateButton).toBeDisabled();

    userEvent.selectOptions(originDropdown, [originDropdown.options[1]]);
    expect(calculateButton).toBeDisabled();

    userEvent.selectOptions(originDropdown, [originDropdown.options[0]]);
    userEvent.selectOptions(destinationDropdown, [destinationDropdown.options[1]]);
    expect(calculateButton).toBeDisabled();

    userEvent.selectOptions(originDropdown, [originDropdown.options[1]]);
    userEvent.selectOptions(destinationDropdown, [destinationDropdown.options[1]]);
    expect(calculateButton).toBeDisabled();

    userEvent.selectOptions(originDropdown, [originDropdown.options[1]]);
    userEvent.selectOptions(destinationDropdown, [destinationDropdown.options[1]]);
    userEvent.type(inputMin, '1');
    expect(calculateButton).not.toBeDisabled();
  });

  test('Verifica se a página de resultado é renderizada', () => {
    const { getByRole, getByText,
      getByLabelText, getByAltText } = renderWithRouter(<Calculator />);
    const calculateButton = getByRole('button');
    const originDropdown = getByLabelText('Origem');
    const destinationDropdown = getByLabelText('Destino');
    const planDropdown = getByLabelText('Plano');
    const inputMin = getByLabelText('Minutos');

    userEvent.selectOptions(originDropdown, [originDropdown.options[1]]);
    userEvent.selectOptions(destinationDropdown, [destinationDropdown.options[1]]);
    userEvent.type(inputMin, '20');
    userEvent.selectOptions(planDropdown, [planDropdown[0]]);
    userEvent.click(calculateButton);
    const logo = getByAltText('Telzir Logo');
    const title = getByRole('heading', { level: 2, name: /resultado/i });
    const textWithPlan = getByText(/Com FaleMais/);
    const textWithoutPlan = getByText(/sem plano/i);
    const newConsultationButton = getByRole('button', { name: /nova consulta/i });

    expect(logo).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(textWithPlan).toBeInTheDocument();
    expect(textWithoutPlan).toBeInTheDocument();
    expect(newConsultationButton).toBeInTheDocument();
  });

  test('Verifica se o resultado do cálculo está correto', () => {
    const { getByRole, getByText, getByLabelText } = renderWithRouter(<Calculator />);
    const calculateButton = getByRole('button');
    const originDropdown = getByLabelText('Origem');
    const destinationDropdown = getByLabelText('Destino');
    const planDropdown = getByLabelText('Plano');
    const inputMin = getByLabelText('Minutos');

    userEvent.selectOptions(originDropdown, [originDropdown.options[1]]);
    userEvent.selectOptions(destinationDropdown, [destinationDropdown.options[1]]);
    userEvent.type(inputMin, '20');
    userEvent.selectOptions(planDropdown, [planDropdown[0]]);
    userEvent.click(calculateButton);
    const newConsultationButton = getByRole('button', { name: /nova consulta/i });
    let resultWithPlan = getByText(/0.00/);
    let resultWithoutPlan = getByText(/38.00/);
    expect(resultWithPlan).toBeInTheDocument();
    expect(resultWithoutPlan).toBeInTheDocument();

    userEvent.click(newConsultationButton);
    userEvent.selectOptions(originDropdown, [originDropdown.options[1]]);
    userEvent.selectOptions(destinationDropdown, [destinationDropdown.options[2]]);
    userEvent.type(inputMin, '80');
    userEvent.selectOptions(planDropdown, [planDropdown[1]]);
    userEvent.click(calculateButton);
    resultWithPlan = getByText(/41.80/);
    resultWithoutPlan = getByText(/152.00/);
    expect(resultWithPlan).toBeInTheDocument();
  });
});
