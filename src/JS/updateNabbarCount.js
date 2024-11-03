export const updateNabbarCount = () => {
  // console.log("object");
  let count = JSON.parse(localStorage.getItem('products')) || 0;
  if(count!==0) count = count.length
  document.querySelector(
    '#navbar-count'
  ).innerHTML = `<i class="fa-solid fa-cart-shopping"></i> ${count}`;
};
