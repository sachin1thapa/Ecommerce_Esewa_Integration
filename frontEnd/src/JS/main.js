import { product } from '../api/product.js';

import { homeProductcard } from './homeproduct.js';

let array = JSON.parse(localStorage.getItem('AddedProduct')) || [];
let UpdatedProduct = [...product, ...array];
console.log(UpdatedProduct);

// ! display the product items in the home
homeProductcard(UpdatedProduct);
