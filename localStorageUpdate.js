export const localStorageUpdate = (data) => {
  let arr = JSON.parse(localStorage.getItem('products')) || [];
  //   console.log(data);
  if (data) localStorage.setItem('products', JSON.stringify(data));

  return arr;
};
