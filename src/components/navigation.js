import {AbstractComponent} from './absctract-component.js';
import {PageController} from '../controllers/page.js';
import {api} from '../main.js';

export class Navigation extends AbstractComponent {
  constructor(countWatchlist, countHistory, countFavorites, body, main) {
    super();
    this._countWatchlist = countWatchlist;
    this._countHistory = countHistory;
    this._countFavorites = countFavorites;
    this._body = body;
    this._main = main;
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

  _renderOtherFilms(array) {
    const onDataChange = (actionType, update, old) => {
      switch (actionType) {
        case `update`:
          api.updateFilm({
            id: update.id,
            data: update
          });
          api.getFilms().then((filmss) => {
            const id = update.id;
            page._onDataChange(filmss[id], old, true);
          });
          break;
        case `add`:
          api.createComment({
            id: update,
            data: old,
          });
          break;
      }
    };
    const page = new PageController(this._body, this._main, array, ``, false, onDataChange);
    page._unrenderSort();
    page._renderSort();
    page.init();

    if (array.length > 5) {
      page._renderLoadMore();
    }
  }

  changeFocus(navType) {
    const a = this.getElement().querySelector(`.main-navigation__item--active`);
    const b = this.getElement().querySelector(`.main-navigation__item--${navType}`);
    a.classList.remove(`main-navigation__item--active`);
    b.classList.add(`main-navigation__item--active`);
  }
}

