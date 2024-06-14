export const tooglepopUp = (card) => {
  const popup = card.querySelector('#myPopup').parentElement;
  popup.classList.toggle('show');
  if (popup.classList.contains('show')) {
    setTimeout(function () {
      popup.classList.remove('show');
    }, 2000);
  }
};
