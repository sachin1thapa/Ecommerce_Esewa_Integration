import { localStorageUpdate } from './localStorageUpdate';
import { updateNabbarCount } from './updateNabbarCount';

export const addtocart = (e, index, price) => {
  let card = document.querySelector(`#card${index}`);
  if (!card) return;

  let localStorageData = localStorageUpdate();

  let quantity = parseInt(card.querySelector('.productQuantity').textContent);
  let totalPrice = quantity * price;

  // to check if there is the items already present in the local storage or not
  let existingProduct = localStorageData.filter((data) => {
    if (data.index === index) return data;
  });

  // update the local storage by only updating the value not adding the items

  if (existingProduct.length > 0 && quantity > 0) {
    quantity = existingProduct[0].quantity + quantity;
    totalPrice = parseInt(price * quantity);
    let updatedData = { index, quantity, totalPrice };
    let update = localStorageData.map((items) => {
      if (items.index === index) {
        return updatedData;
      } else {
        return items;
      }
    });
    // console.log(update);

    localStorageUpdate(update);
  card.querySelector('.productQuantity').textContent = '0';

  }

  if (existingProduct.length > 0) return;

  localStorageData.push({ index, quantity, totalPrice });
  if (quantity !== 0) localStorageUpdate(localStorageData);
  updateNabbarCount();
  card.querySelector('.productQuantity').textContent = '0';
};
