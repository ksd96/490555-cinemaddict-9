import {MovieController} from './movie.js';
import {ShowMore} from '../components/load-more.js';
import {render, unrender} from '../components/utils.js';
import {Navigation} from '../components/navigation.js';
import {Statistic} from '../components/statistic.js';
import {Sort} from '../components/sort.js';
import {FilmsContainer} from '../components/films-container';
import {ExtraContainer} from '../components/films-extra-container.js';
import {Profile} from '../components/profile.js';
import {StatisticController} from './statistic-controller.js';

export class PageController {
  constructor(containerBody, main, films, arrayNavigation, radio, onDataChange) {
    this._containerBody = containerBody;
    this._films = films;
    this._arrayNavigation = arrayNavigation;
    this._main = main;
    this._radio = radio;

    this._showMore = new ShowMore();
    this._sort = new Sort();
    this._statistic = new Statistic();
    this._filmsContainer = new FilmsContainer();
    this._filmsContainerTopRated = new ExtraContainer(`top`, `Top rated`);
    this._filmsContainerMostCommented = new ExtraContainer(`bottom`, `Most commented`);

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._count = 5;

    this._array = null;

    this.onDataChange = onDataChange;
  }

  init() {
    this._renderBoard();
    this._renderFilmsTopRated();
    this._renderFilmsMostCommented();
  }

  hide() {
    this._containerBody.querySelector(`.films`).classList.add(`visually-hidden`);
  }

  show() {
    this._containerBody.querySelector(`.films`).classList.remove(`visually-hidden`);
  }

  _getContainerFilms() {
    const sectionFilms = this._main.querySelector(`.films`);
    render(sectionFilms, this._filmsContainer.getElement());
  }

  _renderBoard(_films) {
    this._getContainerFilms();
    const container = this._filmsContainer.getElement().querySelector(`.films-list__container`);
    container.innerHTML = ``;
    this._films.slice(0, this._count).forEach((taskMock) => this._renderFilm(container, taskMock, false));
  }

  _renderFilm(container, films, radio) {
    const movieController = new MovieController(container, this._containerBody, films, this._onDataChange, this._onChangeView, this.onDataChange, radio);
    this._subscriptions.push(movieController.setDefaultView.bind(movieController));
  }

  _renderFilmsTopRated(_films) {
    const container = this._filmsContainerTopRated.getElement().querySelector(`.films-list__container`);
    container.innerHTML = ``;
    render(this._main.querySelector(`.films`), this._filmsContainerTopRated.getElement());
    this._films.sort(this._sort.sortByRating).slice(0, 2).forEach((filmMock) => this._renderFilm(container, filmMock, false));
  }

  _renderFilmsMostCommented(_films) {
    const container = this._filmsContainerMostCommented.getElement().querySelector(`.films-list__container`);
    container.innerHTML = ``;
    render(this._main.querySelector(`.films`), this._filmsContainerMostCommented.getElement());
    this._films.sort(this._sort.sortByCommentsLength).slice(0, 2).forEach((filmMock) => this._renderFilm(container, filmMock, false));
  }

  _onDataChange(newData, oldData) {
    this._films[this._films.findIndex((it) => it === oldData)] = newData;
    if (this._radio === false) {
      this._unrenderNavigation();
      this._renderNavigation();
      this._renderBoard(this._films);
      this._renderFilmsTopRated(this._films);
      this._renderFilmsMostCommented(this._films);
      this._unrenderStatistic();
      this._renderStatistic();
    } else {
      this._renderBoard(this._films);
    }
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _renderLoadMore() {
    const container = this._filmsContainer.getElement().querySelector(`.films-list__container`);
    const containerButton = document.querySelector(`.films-list`);

    const makeLoadMore = () => {
      const number = 5;
      const pageCount = this._filmsContainer.getElement().querySelectorAll(`.film-card`).length;
      const totalCard = this._films.length;
      this._count = pageCount + number;

      container.innerHTML = ``;
      this._films.slice(0, this._count).forEach((filmMock) => this._renderFilm(container, filmMock));

      if (pageCount >= totalCard) {
        this._showMore.getElement().classList.add(`visually-hidden`);
      }
    };

    render(containerButton, this._showMore.getElement());
    this._showMore.getElement().addEventListener(`click`, makeLoadMore);
  }

  _unrenderLoadMore() {
    unrender(this._showMore.getElement());
  }

  _renderNavigation() {
    const scoreFilms = (category) => {
      const array = [];
      for (const value of this._films) {
        if (category === `isWatchlist` && value.isWatchlist === true) {
          array.push(value);
        } else if (category === `isHistory` && value.isHistory === true) {
          array.push(value);
        } else if (category === `isFavorites` && value.isFavorites === true) {
          array.push(value);
        }
      }
      return array;
    };

    const nav = new Navigation(scoreFilms(`isWatchlist`).length, scoreFilms(`isHistory`).length, scoreFilms(`isFavorites`).length, this._containerBody, this._main);
    this._main.insertBefore(nav.getElement(), this._main.querySelector(`.sort`));
    nav.getElement()
      .querySelector(`.main-navigation__item--watchlist`)
      .addEventListener(`click`, () => {
        const sectionFilms = this._main.querySelector(`.films`);
        sectionFilms.innerHTML = ``;
        nav._renderOtherFilms(scoreFilms(`isWatchlist`));
        nav.changeFocus(`watchlist`);
      });
    nav.getElement()
      .querySelector(`.main-navigation__item--history`)
      .addEventListener(`click`, () => {
        const sectionFilms = this._main.querySelector(`.films`);
        sectionFilms.innerHTML = ``;
        nav._renderOtherFilms(scoreFilms(`isHistory`));
        nav.changeFocus(`history`);
      });
    nav.getElement()
      .querySelector(`.main-navigation__item--favorites`)
      .addEventListener(`click`, () => {
        const sectionFilms = this._main.querySelector(`.films`);
        sectionFilms.innerHTML = ``;
        nav._renderOtherFilms(scoreFilms(`isFavorites`));
        nav.changeFocus(`favorites`);
      });
    nav.getElement()
      .querySelector(`.main-navigation__item--all`)
      .addEventListener(`click`, () => {
        const sectionFilms = this._main.querySelector(`.films`);
        sectionFilms.innerHTML = ``;
        this._unrenderSort();
        this._renderSort();
        this.init();
        nav.changeFocus(`all`);
      });
  }

  _unrenderNavigation() {
    const nav = this._main.querySelector(`nav`);
    if (nav) {
      nav.parentNode.removeChild(nav);
    }
  }

  _renderSort() {
    this._main.insertBefore(this._sort.getElement(), this._main.querySelector(`.films`));

    const sorting = (sortType, functionSortType) => {
      this._sort.getElement()
        .querySelector(`.sort__button--${sortType}`)
        .addEventListener(`click`, () => {
          const container = this._filmsContainer.getElement().querySelector(`.films-list__container`);
          container.innerHTML = ``;
          this._films.sort(functionSortType).slice(0, this._count).forEach((taskMock) => this._renderFilm(container, taskMock, false));
          this._renderFilmsTopRated();
          this._renderFilmsMostCommented();
          this._sort.changeFocus(sortType);
        });
    };

    sorting(`rating`, this._sort.sortByRating);
    sorting(`default`, this._sort.sortByDefault);
    sorting(`date`, this._sort.sortByDate);
  }

  _unrenderSort() {
    const sort = this._main.querySelector(`.sort`);
    if (sort) {
      sort.parentNode.removeChild(sort);
    }
  }

  _renderProfile(profileMock) {
    const profile = new Profile(profileMock);
    render(this._containerBody.querySelector(`header`), profile.getElement());
  }

  _renderStatistic() {
    const filmsHistory = () => {
      const filmsArray = [];
      for (const value of this._films) {
        if (value.isHistory === true) {
          filmsArray.push(value);
        }
      }
      return filmsArray;
    };

    const statistic = new StatisticController(this._main, filmsHistory());
    statistic.init();

    document.querySelector(`.main-navigation`).addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const btn = event.target.closest(`a`);

      switch (btn.getAttribute(`href`)) {
        case `#all`:
          this._main.querySelector(`.statistic`).classList.add(`visually-hidden`);
          this._sort.getElement().classList.remove(`visually-hidden`);
          this.show();
          break;

        case `#watchlist`:
          this._main.querySelector(`.statistic`).classList.add(`visually-hidden`);
          this._sort.getElement().classList.remove(`visually-hidden`);
          this.show();
          break;

        case `#history`:
          this._main.querySelector(`.statistic`).classList.add(`visually-hidden`);
          this._sort.getElement().classList.remove(`visually-hidden`);
          this.show();
          break;

        case `#favorites`:
          this._main.querySelector(`.statistic`).classList.add(`visually-hidden`);
          this._sort.getElement().classList.remove(`visually-hidden`);
          this.show();
          break;

        case `#stats`:
          this._sort.getElement().classList.add(`visually-hidden`);
          this.hide();
          this._main.querySelector(`.statistic`).classList.remove(`visually-hidden`);
          break;
      }
    });
  }

  _unrenderStatistic() {
    const statistic = this._main.querySelector(`.statistic`);
    if (statistic) {
      statistic.parentNode.removeChild(statistic);
    }
  }
}
