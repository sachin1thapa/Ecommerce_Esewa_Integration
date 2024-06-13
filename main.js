import '/style.css';
import products from './api/product.json';
import { homeProductcard } from './homeproduct';
import { updateNabbarCount } from './updateNabbarCount';


// ! display the product items in the home 
homeProductcard(products);
updateNabbarCount()

