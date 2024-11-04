import { addtocart } from './addtocart.js';
import { tooglestock } from './tooglestock.js';
import { updateNavbarCount } from './updateNavbarCount.js';

const productContainer = document.querySelector('#productContainer');
const template = document.querySelector('#productTemplate');

export const homeProductcard = (products) => {
  if (!Array.isArray(products) || products.length === 0) {
    console.error('No products available to display.');
    return;
  }

  products.forEach((product, index) => {
    const { category, description, image, name, price, stock } = product;

    // Clone the template
    const productClone = document.importNode(template.content, true);

    // Populate product details
    productClone.querySelector('.category').textContent = category;
    productClone.querySelector('.productName').textContent = name;
    productClone.querySelector('.productImage').src = image;
    productClone.querySelector('.productImage').alt = name;
    productClone.querySelector('.productStock').textContent = `Stock: ${stock}`;
    productClone.querySelector('.productDescription').textContent = description;
    productClone.querySelector('.productPrice').textContent = `$${price}`;

  
    productClone.querySelector('.productActualPrice').textContent = `$${(price * 2).toFixed(2)}`;

    
    productClone.querySelector('.cards').setAttribute('id', `card${index + 1}`);

   
    productClone.querySelector('.stockElement').addEventListener('click', (e) => {
      tooglestock(e, index + 1, stock);
    });

    productClone.querySelector('.add-to-cart-button').addEventListener('click', (e) => {
      addtocart(e, index + 1, price);
    });

   
    productContainer.append(productClone);
  });


  updateNavbarCount();
};
