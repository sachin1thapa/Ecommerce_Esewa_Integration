import { localStorageUpdate } from './localStorageUpdate';
import { tooglepopUp } from './tooglepopUp';
import { updateNabbarCount } from './updateNabbarCount';

export const addtocart = (e, index, price) => {
  let card = document.querySelector(`#card${index}`);
  if (!card) return;

  let localStorageData = localStorageUpdate();

  let quantity = parseInt(card.querySelector('.productQuantity').textContent);
  let totalPrice = (quantity * price).toFixed(2);

  // to check if there is the items already present in the local storage or not
  let existingProduct = localStorageData.filter((data) => {
    if (data.index === index) return data;
  });

  // update the local storage by only updating the value not adding the items

  if (existingProduct.length > 0 && quantity > 0) {
    quantity = existingProduct[0].quantity + quantity;
    totalPrice = (parseInt(price * quantity)).toFixed(2);
    let updatedData = { index, quantity, totalPrice };

    // updating the local storage if the item is already present then only update it price or if not add the whole product
    let update = localStorageData.map((items) => {
      if (items.index === index) {
        return updatedData;
      } else {
        return items;
      }
    });
    // console.log(update);

    updatedata(card, update);
  }

  if (existingProduct.length > 0) return;

  // first time push garda
  localStorageData.push({ index, quantity, totalPrice });
  if (quantity !== 0) localStorageUpdate(localStorageData);
  updatedata(card);

  function updatedata(card, update) {
    if (quantity > 0) tooglepopUp(card);
    updateNabbarCount();
    card.querySelector('.productQuantity').textContent = '0';
    if (update) {
      localStorageUpdate(update);
      // console.log('inside upadte');
    }
  }
};
