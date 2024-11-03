import { localStorageUpdate } from './localStorageUpdate.js';

export const fetchLSdata = (index) => {
  let lsdata = localStorageUpdate();
  let vakodata = (lsdata = lsdata.find((items) => items.index === index));
//   console.log(vakodata);
  let quantity, price;
  if (vakodata) {
    price = vakodata.totalPrice;
    quantity = vakodata.quantity;
  }
  return { price, quantity };
};
