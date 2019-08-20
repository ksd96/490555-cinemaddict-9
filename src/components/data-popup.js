import {arrayFilms} from './array-films.js';

export const getPopup = () => ({
  title: arrayFilms[0].title,
  rating: arrayFilms[0].rating,
  nameImage: arrayFilms[0].nameImage,
  director: arrayFilms[0].director,
  writers: arrayFilms[0].writers,
  actors: arrayFilms[0].actors,
  relaeseDate: arrayFilms[0].date,
  duration: arrayFilms[0].duration,
  country: arrayFilms[0].country,
  genres: arrayFilms[0].genres,
  description: arrayFilms[0].description,
  isWatchlist: arrayFilms[0].isWatchlist,
  isHistory: arrayFilms[0].isHistory,
  isFavorites: arrayFilms[0].isFavorites,
});
