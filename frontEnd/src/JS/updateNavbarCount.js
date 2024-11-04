export const updateNavbarCount = () => {
  const navbarCountElement = document.querySelector('#navbar-count');
  let products = JSON.parse(localStorage.getItem('products')) || [];
  if (!Array.isArray(products)) {
    products = [];
  }

  const count = products.length;

  navbarCountElement.textContent = `${count > 0 ? count : ''}`;

  navbarCountElement.innerHTML =
    count > 0
      ? `<i class="fa-solid fa-cart-shopping"></i> ${count}`
      : `<i class="fa-solid fa-cart-shopping"></i>`;
};
