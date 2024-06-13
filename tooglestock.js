export const tooglestock = (e, index, stock) => {
  e.stopPropagation();
  let card = document.querySelector(`#card${index + 1}`);
  if (!card) return;
  else {
    let itemsAdd = parseInt(card.querySelector('.productQuantity').textContent);
    if (e.target.textContent === '+') {
      if (stock > itemsAdd) {
        itemsAdd++;
      // card.querySelector('.productQuantity').textContent = itemsAdd;
      }
      card.querySelector('.productQuantity').textContent = itemsAdd;
    }
    if (e.target.textContent === '-') {
      if (itemsAdd > 0) {
        itemsAdd--;
        // card.querySelector('.productQuantity').textContent = itemsAdd;
      }
      card.querySelector('.productQuantity').textContent = itemsAdd;
    }
  }
};
