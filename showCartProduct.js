import product from './api/product.json';
import { localStorageUpdate } from './localStorageUpdate';
import { updateNabbarCount } from './updateNabbarCount';

let CurLSdata = localStorageUpdate();
let FilterData = product.filter((items) => CurLSdata.some((data) => items.id === data.index));

const productContainer = document.querySelector('.cart-container');
const template = document.querySelector('#productTemplate');

if (!(product || FilterData)) {
} else {
  FilterData.forEach((products) => {
    const { category, description, image, name, price, stock } = products;
    const productClone = document.importNode(template.content, true);

    productClone.querySelector('.cart-item-category').textContent = category;
    productClone.querySelector('.cart-item-name').textContent = name;
    productClone.querySelector('.productImage').src = image;
    productClone.querySelector('.productImage').alt = name;
    productClone.querySelector('.cart-item-price').textContent = `$${price}`;
    productContainer.append(productClone);
  });
}

updateNabbarCount();
// ! different filtering techniques
// let FilterData = product.filter((e) => {
//   return CurLSdata.some((items) => e.id === items.index);
// });

// let index = CurLSdata.map((e) => {
//   return e.index;
// });

// let FilterData = product.filter((e) => indexList.includes(e.id));
// let x = product.reduce((acc, e) => {
//   if (CurLSdata.some((items) => items.index === e.id)) acc.push(e);
//   return acc;
// }, []);
// console.log(x);
