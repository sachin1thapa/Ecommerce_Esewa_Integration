import { product } from '../api/product.js';

let array = JSON.parse(localStorage.getItem('AddedProduct')) || [];

updateIdField();

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();

  let data = {
    id: parseInt(document.querySelector('#id').value),
    name: document.querySelector('#nam').value,
    category: document.querySelector('#category').value,
    brand: document.querySelector('#brand').value,
    price: parseFloat(document.querySelector('#price').value),
    description: document.querySelector('#description').value,
    image:
      document.querySelector('#image').files.length === 0
        ? 'images/hdd.jpg'
        : document.querySelector('#image').value,
    stock: parseInt(document.querySelector('#stock').value),
  };

  array.push(data);
  localStorage.setItem('AddedProduct', JSON.stringify(array));

  document.querySelector('form').reset();
  updateIdField();
});

function updateIdField() {
  array = JSON.parse(localStorage.getItem('AddedProduct')) || [];
  const nextId = product.length + array.length + 1;
  document.querySelector('#id').value = nextId;
}
