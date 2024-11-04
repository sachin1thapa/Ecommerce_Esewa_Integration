import { localStorageUpdate } from './localStorageUpdate.js';
export const updateTotalprice = () => {
  const totalPriceElement = document.querySelector('.summary-item:nth-child(1) span');
  const shippingPriceElement = document.querySelector('.summary-item:nth-child(2) span');
  const taxPriceElement = document.querySelector('#line span');
  const finalTotalPriceElement = document.querySelector('.summary-item:nth-child(4) span');

  const shippingCost = 100;
  const taxCost = 30;

  let data = localStorageUpdate();
  const sumPrice = data.reduce((acc, { totalPrice }) => acc + Number(totalPrice), 0);

  const hasItems = data.length > 0;

  totalPriceElement.textContent = hasItems ? `$${sumPrice.toFixed(2)}` : '$0.00';
  shippingPriceElement.textContent = hasItems ? `$${shippingCost.toFixed(2)}` : '$0.00';
  taxPriceElement.textContent = hasItems ? `$${taxCost.toFixed(2)}` : '$0.00';

  const finalPrice = hasItems ? (sumPrice + shippingCost + taxCost).toFixed(2) : '0.00';
  finalTotalPriceElement.textContent = `$${finalPrice}`;
};
