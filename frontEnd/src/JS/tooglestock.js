const ACTION_INCREMENT = '+';
const ACTION_DECREMENT = '-';

export const tooglestock = (e, index, stock) => {
  e.stopPropagation();
  const card = document.querySelector(`#card${index}`);
  if (!card) return;
  let currentQuantity = parseInt(card.querySelector('.productQuantity').textContent);

  if (e.target.textContent === ACTION_INCREMENT) {
    if (currentQuantity < stock) {
      currentQuantity++;
    } else {
      console.log('Cannot add more items than available stock.');
    }
  } else if (e.target.textContent === ACTION_DECREMENT) {
    if (currentQuantity > 0) {
      currentQuantity--;
    } else {
      console.log('Quantity cannot be less than zero.');
    }
  }


  card.querySelector('.productQuantity').textContent = currentQuantity;
};
