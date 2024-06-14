import { localStorageUpdate } from './localStorageUpdate';

export const updateTotalprice = () => {
  const totalPrice = document.querySelector('.summary-item:nth-child(1) span');
  console.log(totalPrice);

  const shippingprice = document.querySelector('.summary-item:nth-child(2) span ');
  const taxPrice = document.querySelector('#line span');
  const finalTotalPrice = document.querySelector('.summary-item:nth-child(4) span');

  let data = localStorageUpdate();
  console.log(data);
  const sumPrice = data.reduce((acc, currval) => acc + currval.totalPrice, 0);
  totalPrice.textContent = `$${Math.floor(sumPrice)}`;
  shippingprice.textContent = '$100';
  taxPrice.textContent = '$30';
  let finalprice = sumPrice + 100 + 30;
  finalTotalPrice.textContent = `$${finalprice}`;
};
