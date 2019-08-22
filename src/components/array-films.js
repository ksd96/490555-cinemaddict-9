import {getFilm} from './data-card.js';

export const getArray = (count, get) => {
  const arr = new Array(count)
  .fill(``)
  .map(get);

  return arr;
};
export const totalCard = 40;
export const arrayFilms = getArray(totalCard, getFilm);
