//*  https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template
// !templete le fragment banau cha

import { addtocart } from './addtocart';
import { tooglestock } from './tooglestock';
import { updateNabbarCount } from './updateNabbarCount';

const productContainer = document.querySelector('#productContainer');
const template = document.querySelector('#productTemplate');

export const homeProductcard = (products) => {
  if (!products) return;
  else {
    products.forEach((product, index) => {
      const { category, description, image, name, price, stock } = product;
      const productClone = document.importNode(template.content, true);
      productClone.querySelector('.category').textContent = category;
      productClone.querySelector('.productName').textContent = name;
      productClone.querySelector('.productImage').src = image;
      productClone.querySelector('.productImage').alt = name;
      productClone.querySelector('.productStock').textContent = stock;
      productClone.querySelector('.productDescription').textContent = description;
      productClone.querySelector('.productPrice').textContent = `$${price}`;
      productClone.querySelector('.productActualPrice').textContent = `$${price * 3}`;

      productClone.querySelector('.cards').setAttribute('id', `card${index + 1}`);

      // button click
      productClone.querySelector('.stockElement').addEventListener('click', (e) => {
        tooglestock(e, index + 1, stock);
      });

      // addto cart

      productClone.querySelector('.add-to-cart-button').addEventListener('click', (e) => {
        addtocart(e, index + 1, price);
      });
      productContainer.append(productClone);
    });

    updateNabbarCount();
  }
};
