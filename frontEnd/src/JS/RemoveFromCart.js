import { localStorageUpdate } from './localStorageUpdate.js';
import { updateNavbarCount } from './updateNavbarCount.js';
import { updateTotalprice } from './updateTotalprice.js';

export const RemoveFromCart = (e, index, id) => {
  const card = document.querySelector(`#card${index}`);
  if (!card) return;

  // deleting from the local storage
  //   console.log(id);
  const LSdata = localStorageUpdate();
  let filterdata = LSdata.filter((items) => items.index !== id);
  localStorageUpdate(filterdata);

  card.remove();

  updateNavbarCount();
  updateTotalprice();
};
