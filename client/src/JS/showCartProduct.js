import { product } from '../api/product.js';
import { CartIncrementDecrement } from './CartIncrementDecrement.js';
import { RemoveFromCart } from './RemoveFromCart.js';
import { fetchLSdata } from './fetchLSdata.js';
import { localStorageUpdate } from './localStorageUpdate.js';
import { updateNavbarCount } from './updateNavbarCount.js';
import { updateTotalprice } from './updateTotalprice.js';

const productContainer = document.querySelector('.cart-container');
const template = document.querySelector('#productTemplate');
let CurLSdata = localStorageUpdate();

// Merge and filter products from API and local storage
function getFilteredProducts() {
  const addedProducts = JSON.parse(localStorage.getItem('AddedProduct')) || [];
  const updatedProductList = [...product, ...addedProducts];

  return updatedProductList.filter((item) => CurLSdata.some((data) => item.id === data.index));
}

// Render cart items
function renderCartItems() {
  const FilterData = getFilteredProducts();
  if (!FilterData) return;

  const fragment = document.createDocumentFragment();

  FilterData.forEach((productItem, index) => {
    const { category, image, name, price, stock, id } = productItem;
    let LSdata = fetchLSdata(id, price);

    const productClone = document.importNode(template.content, true);
    productClone.querySelector('.cart-item-category').textContent = category;
    productClone.querySelector('.cart-item-name').textContent = name;
    productClone.querySelector('.productImage').src = image;
    productClone.querySelector('.productImage').alt = name;
    productClone.querySelector('#quantity').textContent = LSdata.quantity;
    productClone.querySelector('.cart-item-price').textContent = `$${LSdata.price}`;

    const cartItemElement = productClone.querySelector('.cart-item');
    cartItemElement.setAttribute('id', `card${index + 1}`);

    // Event listeners
    productClone
      .querySelector('.cart-item-quantity')
      .addEventListener('click', (e) => CartIncrementDecrement(e, index, price, stock, id));
    productClone
      .querySelector('.cart-item-remove')
      .addEventListener('click', (e) => RemoveFromCart(e, index + 1, id));

    fragment.appendChild(productClone);
  });

  productContainer.appendChild(fragment);
}

// Handle payment initiation
async function initiatePayment(e) {
  e.preventDefault();
  const CurLSdata = localStorageUpdate();
  const amount = Number(document.getElementById('amount').textContent.replace('$', ''));
  const mergedData = CurLSdata.map((item) => {
    const product = getFilteredProducts().find((p) => p.id === item.index);
    return {
      name: product.name,
      category: product.category,
      brand: product.brand,
      price: product.price,
      image: product.image,
      description: product.description,
      quantity: item.quantity,
    };
  });

  const paymentData = {
    amount: amount,
    products: mergedData,
    productId: generateUniqueId(),
  };

  console.log('Amount:', amount);
  console.log('Merged Data:', mergedData);
  console.log('Payment Data:', paymentData);


  try {
    const response = await fetch('http://localhost:3000/initiate-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData),
    });
    const data = await response.json();
    console.log(data);
    if (data.url) window.location.href = data.url;
  } catch (error) {
    console.error('Error initiating payment:', error);
    window.alert('Error initiating payment. Please try again later.');
  }
}


function generateUniqueId() {
  return `id-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}


document.addEventListener('DOMContentLoaded', () => {
  renderCartItems();
  updateNavbarCount();
  updateTotalprice();
  document.getElementById('paymentForm').addEventListener('submit', initiatePayment);
});
