import { localStorageUpdate } from './localStorageUpdate.js';
import { updateTotalprice } from './updateTotalprice.js';

export const CartIncrementDecrement = (e, index, price, stock, id) => {
  let product = document.querySelector(`#card${index + 1}`);
  if (!product) {
    return;
  } else {
    let Quantity = parseInt(product.querySelector('#quantity').textContent);
    let LSdata = localStorageUpdate();
    // console.log(Quantity);

    if (e.target.textContent === '+') {
      if (stock > Quantity) {
        Quantity++;
      }
      let updatePrice = (price * Quantity).toFixed(2);
      product.querySelector('#quantity').textContent = Quantity;
      product.querySelector('.cart-item-price').textContent = `$${updatePrice}`;

      //! update data lai  local storage ma save garne
      LS(id, Quantity, updatePrice, LSdata);
      updateTotalprice();
    }
    if (e.target.textContent === '-') {
      if (Quantity > 1) {
        Quantity--;
      }
      let updatePrice = (price * Quantity).toFixed(2);
      product.querySelector('#quantity').textContent = Quantity;
      product.querySelector('.cart-item-price').textContent = `$${updatePrice}`;
      LS(id, Quantity, updatePrice, LSdata);
      updateTotalprice();
    }
  }
};

function LS(id, Quantity, updatePrice, LSdata) {
  let updatelSdata = LSdata.map((items) => {
    return items.index === id ? { index: id, quantity: Quantity, totalPrice: updatePrice } : items;
  });
  localStorageUpdate(updatelSdata);
}
