import { localStorageUpdate } from './localStorageUpdate.js';
import { tooglepopUp } from './tooglepopUp.js';
import { updateNavbarCount } from './updateNavbarCount.js';

export const addtocart = (e, index, price) => {
  const card = document.querySelector(`#card${index}`);
  if (!card) return;

  let localStorageData = localStorageUpdate();
  let quantity = parseInt(card.querySelector('.productQuantity').textContent);
  let totalPrice = (quantity * price).toFixed(2);

  // Check if the item already exists in localStorage
  let existingProduct = localStorageData.find((data) => data.index === index);

  if (existingProduct && quantity > 0) {
   
    quantity += existingProduct.quantity;
    totalPrice = (price * quantity).toFixed(2);

    // update the data in the ls 
    const updatedData = localStorageData.map((item) =>
      item.index === index ? { index, quantity, totalPrice } : item
    );

    updateCartData(card, updatedData); 
  } else if (!existingProduct && quantity > 0) {
    localStorageData.push({ index, quantity, totalPrice });
    updateCartData(card, localStorageData); 
  }
};


function updateCartData(card, updatedData) {
  localStorageUpdate(updatedData); 
  tooglepopUp(card); 
  updateNavbarCount(); 

  card.querySelector('.productQuantity').textContent = '0';
}
