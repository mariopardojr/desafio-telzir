import { fares, services } from '../data';

const INCREASE = 0.1;

export const withPlan = (service, min, origin, destination = '011') => {
  const plan = services.find((item) => item.service === service);
  const balance = plan.min - min;
  if (origin !== '011') {
    return {
      residual: balance >= 0 ? balance : 0,
      total: balance > 0
        ? 0 : Math.abs(balance * (fares[origin] + 1))
        + (Math.abs(balance * (fares[origin] + 1))) * INCREASE,
    };
  } return {
    residual: balance >= 0 ? balance : 0,
    total: balance > 0
      ? 0 : Math.abs(balance * (fares[destination]))
      + (Math.abs(balance * (fares[destination])) * INCREASE),
  };
};

export const withoutPlan = (min, origin, destination = '011') => {
  if (origin !== '011') {
    return (fares[origin] + 1) * min;
  }
  return fares[destination] * min;
};
