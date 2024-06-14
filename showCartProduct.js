import product from './api/product.json';
import { CartIncrementDecrement } from './CartIncrementDecrement';
import { RemoveFromCart } from './RemoveFromCart';
import { fetchLSdata } from './fetchLSdata';
import { localStorageUpdate } from './localStorageUpdate';
import { updateNabbarCount } from './updateNabbarCount';
import { updateTotalprice } from './updateTotalprice';

let CurLSdata = localStorageUpdate();
let FilterData = product.filter((items) => CurLSdata.some((data) => items.id === data.index));

// console.log(FilterData);

const productContainer = document.querySelector('.cart-container');
const template = document.querySelector('#productTemplate');

if (product && FilterData) {
  FilterData.forEach((products, index) => {
    const { category, image, name, price, stock, id } = products;
    let LSdata = fetchLSdata(id, price);
    // console.log(LSdata);
    const productClone = document.importNode(template.content, true);
    productClone.querySelector('.cart-item-category').textContent = category;
    productClone.querySelector('.cart-item-name').textContent = name;
    productClone.querySelector('.productImage').src = image;
    productClone.querySelector('.productImage').alt = name;
    productClone.querySelector('#quantity').textContent = LSdata.quantity;
    productClone.querySelector('.cart-item-price').textContent = `$${LSdata.price}`;

    productClone.querySelector('.cart-item').setAttribute('id', `card${index + 1}`);

    // console.log(productClone.querySelector('.cart-item'));

    // button click garda
    productClone.querySelector('.cart-item-quantity').addEventListener('click', (e) => {
      CartIncrementDecrement(e, index);
    });

    // remove the product from the cart
    productClone.querySelector('.cart-item-remove').addEventListener('click', (e) => {
      RemoveFromCart(e, index + 1, id);
    });

    productContainer.append(productClone);
  });
}

updateNabbarCount();
updateTotalprice();

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
