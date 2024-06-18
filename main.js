import '/style.css';
import products from './api/product.json';
import { homeProductcard } from './homeproduct';

let array = JSON.parse(localStorage.getItem('AddedProduct')) || [];
let UpdatedProduct = [...products, ...array];

// ! display the product items in the home
homeProductcard(UpdatedProduct);
