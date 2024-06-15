import { localStorageUpdate } from './localStorageUpdate';

export const updateTotalprice = () => {
  const totalPrice = document.querySelector('.summary-item:nth-child(1) span');
  const shippingprice = document.querySelector('.summary-item:nth-child(2) span ');
  const taxPrice = document.querySelector('#line span');
  const finalTotalPrice = document.querySelector('.summary-item:nth-child(4) span');

  let data = localStorageUpdate();
  // console.log(data);
  const sumPrice = data.reduce((acc, currval) => acc + Number(currval.totalPrice), 0);

  const datalength = data.length > 0;
  totalPrice.textContent = datalength ? `$${Math.floor(sumPrice)}` : `0`;
  shippingprice.textContent = datalength ? '$100' : '0';
  taxPrice.textContent = datalength ? '$30' : '0';
  let finalprice = datalength ? Math.floor(sumPrice + 100 + 30) : '0';
  finalTotalPrice.textContent = `$${Math.floor(finalprice)}`;
};
