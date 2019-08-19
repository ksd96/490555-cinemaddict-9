import {arrayFilms} from '../main.js';


const watchlistCount = () => {
  const arr = [];
  for (const value of arrayFilms) {
    if (value.isWatchlist) {
      arr.push(value);
    }
  }
  return arr;
};

const historyCount = () => {
  const arr = [];
  for (const value of arrayFilms) {
    if (value.isHistory) {
      arr.push(value);
    }
  }
  return arr;
};

const favoritesCount = () => {
  const arr = [];
  for (const value of arrayFilms) {
    if (value.isFavorites) {
      arr.push(value);
    }
  }
  return arr;
};

export const getElementNavigation = () => ([
  {
    title: `All movies`,
    count: ``,
    tag: `all`,
    classList: `main-navigation__item--active`,
  },
  {
    title: `Watchlist`,
    // eslint-disable-next-line no-undef
    count: `<span class="main-navigation__item-count">${watchlistCount().length}</span>`,
    tag: `watchlist`,
    classList: ``,
  },
  {
    title: `History`,
    count: `<span class="main-navigation__item-count">${historyCount().length}</span>`,
    tag: `history`,
    classList: ``,
  },
  {
    title: `Favorites`,
    count: `<span class="main-navigation__item-count">${favoritesCount().length}</span>`,
    tag: `favorites`,
    classList: ``,
  },
  {
    title: `Stats`,
    count: ``,
    tag: `stats`,
    classList: `main-navigation__item--additional`,
  },
]);

export {historyCount};
