export const localStorageUpdate = (data) => {
  
  let existingData = JSON.parse(localStorage.getItem('products')) || [];

  
  if (data) {
    localStorage.setItem('products', JSON.stringify(data));
   
    return data;
  }

 
  return existingData;
};
