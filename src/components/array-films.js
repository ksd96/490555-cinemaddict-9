import {getFilm} from './data-card.js';

export const totalCard = 23;
export const arrayFilms = new Array(totalCard)
.fill(``)
.map(getFilm);
