import { localStorageUpdate } from './localStorageUpdate.js';

export const fetchLSdata = (index) => {
  const lsdata = localStorageUpdate();
  const itemData = lsdata.find((item) => item.index === index);
  if (!itemData) {
    return { price: 0, quantity: 0 };
  }
  const { totalPrice: price, quantity } = itemData;
  return { price, quantity };
};
