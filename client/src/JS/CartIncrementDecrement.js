import { localStorageUpdate } from './localStorageUpdate.js';
import { updateTotalprice } from './updateTotalprice.js';

export const CartIncrementDecrement = (e, index, price, stock, id) => {
  const product = document.querySelector(`#card${index + 1}`);
  if (!product) return;

  let quantity = parseInt(product.querySelector('#quantity').textContent);
  const LSdata = localStorageUpdate();

 
  const isIncrement = e.target.textContent === '+';

  if (isIncrement && quantity < stock) {
    quantity++;
  } else if (!isIncrement && quantity > 1) {
    quantity--;
  } else {
    return; 
  }


  const updatedPrice = (price * quantity).toFixed(2);
  updateProductUI(product, quantity, updatedPrice);


  updateLocalStorage(id, quantity, updatedPrice, LSdata);
  updateTotalprice();
};


function updateProductUI(product, quantity, updatedPrice) {
  product.querySelector('#quantity').textContent = quantity;
  product.querySelector('.cart-item-price').textContent = `$${updatedPrice}`;
}


function updateLocalStorage(id, quantity, updatedPrice, LSdata) {
  const updatedData = LSdata.map((item) =>
    item.index === id ? { index: id, quantity, totalPrice: updatedPrice } : item
  );
  localStorageUpdate(updatedData);
}
