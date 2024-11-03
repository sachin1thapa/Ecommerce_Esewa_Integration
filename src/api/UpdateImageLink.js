import product from './product.json' assert { type: 'json' };
import { promises as fs } from 'fs';

const accessKey = process.env.API_KEY;
// console.log(accessKey);
const jsonData = product;

async function getImageUrl(query) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    query
  )}&client_id=${accessKey}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.results && data.results.length > 0) {
    return data.results[0].urls.regular;
  }
  return null;
}

async function updateImageUrls(data) {
  for (let item of data) {
    const newImageUrl = await getImageUrl(item.name);
    if (newImageUrl) {
      item.image = newImageUrl;
    }
  }

  await fs.writeFile('product.json', JSON.stringify(data, null, 4));
  // console.log('Updated JSON data saved to output.json');
}

updateImageUrls(jsonData).catch((error) => console.error(error));

// run the file :: node --env-file=../.env UpdateImageLink.js
