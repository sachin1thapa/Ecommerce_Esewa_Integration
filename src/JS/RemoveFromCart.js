import { localStorageUpdate } from './localStorageUpdate.js';
import { updateNabbarCount } from './updateNabbarCount.js';
import { updateTotalprice } from './updateTotalprice.js';

export const RemoveFromCart = (e, index, id) => {
  const card = document.querySelector(`#card${index}`);

  // deleting from the local storage
  //   console.log(id);
  const LSdata = localStorageUpdate();
  let filterdata = LSdata.filter((items) => items.index !== id);
  localStorageUpdate(filterdata);
  card.remove();
  updateNabbarCount();
  updateTotalprice();
};
