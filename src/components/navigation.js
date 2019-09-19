import AbstractComponent from './absctract-component.js';

export default class Navigation extends AbstractComponent {
  constructor(countWatchlist, countHistory, countFavorites) {
    super();
    this._countWatchlist = countWatchlist;
    this._countHistory = countHistory;
    this._countFavorites = countFavorites;
  }

  getTemplate() {
    return `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--all main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item main-navigation__item--watchlist">Watchlist <span class="main-navigation__item-count">${this._countWatchlist}</span></a>
      <a href="#history" class="main-navigation__item main-navigation__item--history">History <span class="main-navigation__item-count">${this._countHistory}</span></a>
      <a href="#favorites" class="main-navigation__item main-navigation__item--favorites">Favorites <span class="main-navigation__item-count">${this._countFavorites}</span></a>
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`;
  }
}
