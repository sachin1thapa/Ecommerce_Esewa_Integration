import { product } from '../api/product.js';

let array = JSON.parse(localStorage.getItem('AddedProduct')) || [];

change();
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  let data = {
    id: parseInt(id.value),
    name: nam.value,
    category: category.value,
    brand: brand.value,
    price: price.value,
    description: description.value,
    image: image.files.length === 0 ? 'images/hdd.jpg' : image.value,
    stock: stock.value,
  };
  //   console.log(data);
  array.push(data);
  localStorage.setItem('AddedProduct', JSON.stringify(array));
  document.querySelector('form').reset();
  change();
});

function change() {
  let length = product.length + 1 + array.length;
  document.querySelector('#id').value = length;
}
