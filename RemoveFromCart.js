import { localStorageUpdate } from './localStorageUpdate';
import { updateNabbarCount } from './updateNabbarCount';
import { updateTotalprice } from './updateTotalprice';

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
