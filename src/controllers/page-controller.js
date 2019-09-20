import MovieController from './movie-controller.js';
import ShowMore from '../components/show-more.js';
import {render, unrender} from '../components/utils.js';
import Sort from '../components/sort.js';
import FilmsContainer from '../components/films-container';
import ExtraContainer from '../components/extra-container.js';
import Profile from '../components/profile.js';
import StatisticController from './statistic-controller.js';
import NavigationController from './navigation-controller.js';

export default class PageController {
  constructor(containerBody, main, films, radio, onDataChange, categoryFocus) {
    this._containerBody = containerBody;
    this._films = films;
    this._main = main;
    this._radio = radio;

    this._showMore = new ShowMore();
    this._sort = new Sort();
    this._filmsContainer = new FilmsContainer();
    this._filmsContainerTopRated = new ExtraContainer(`top`, `Top rated`);
    this._filmsContainerMostCommented = new ExtraContainer(`bottom`, `Most commented`);

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._count = 5;

    this._categoryFocus = categoryFocus;

    this.onDataChange = onDataChange;
  }

  initMain() {
    this._renderSort();
    this._renderStatistic();
    this._renderNavigation(`all`);
    this.renderBoard();
    if (this._films.length > 5) {
      this.renderLoadMore();
    }
    this._renderFilmsTopRated();
    this._renderFilmsMostCommented();
    this._renderProfile();
  }

  initScan() {
    this._renderNavigation(`all`);
    this._renderSort();
    this._renderStatistic();
    this.renderBoard();
    if (this._films.length > 5) {
      this.renderLoadMore();
    }
    this._renderFilmsTopRated();
    this._renderFilmsMostCommented();
  }

  initNav() {
    this._unrenderSort();
    this._unrenderStatistic();
    this._renderSort();
    this._renderStatistic();
    this.renderBoard();
    if (this._films.length > 5) {
      this.renderLoadMore();
    }
    this._renderFilmsTopRated();
    this._renderFilmsMostCommented();
  }

  getContainerFilms() {
    const sectionFilms = this._main.querySelector(`.films`);
    render(sectionFilms, this._filmsContainer.getElement());
  }

  renderBoard(_films) {
    this.getContainerFilms();
    const container = this._filmsContainer.getElement().querySelector(`.films-list__container`);
    container.innerHTML = ``;
    if (this._films.length > 0) {
      this._films.slice(0, this._count).forEach((taskMock) => this._renderFilm(container, taskMock, false));
    } else {
      container.innerHTML = `There are no movies in our database`;
    }
  }

  _renderFilm(container, films, radio) {
    const movieController = new MovieController(container, this._containerBody, films, this._onDataChange, this._onChangeView, this.onDataChange, radio);
    this._subscriptions.push(movieController.setDefaultView.bind(movieController));
  }

  _renderFilmsTopRated() {
    const filmsTopRated = [];
    for (const value of this._films) {
      if (value.rating !== 0) {
        filmsTopRated.push(value);
      }
    }

    if (filmsTopRated.length > 0) {
      const container = this._filmsContainerTopRated.getElement().querySelector(`.films-list__container`);
      container.innerHTML = ``;
      render(this._main.querySelector(`.films`), this._filmsContainerTopRated.getElement());
      filmsTopRated.sort(this._sort.sortByRating).slice(0, 2).forEach((filmMock) => this._renderFilm(container, filmMock, false));
    }
  }

  _renderFilmsMostCommented() {
    const filmsMostCommented = [];
    for (const value of this._films) {
      if (value.arrayComments.length !== 0) {
        filmsMostCommented.push(value);
      }
    }

    if (filmsMostCommented.length !== 0) {
      const container = this._filmsContainerMostCommented.getElement().querySelector(`.films-list__container`);
      container.innerHTML = ``;
      render(this._main.querySelector(`.films`), this._filmsContainerMostCommented.getElement());
      filmsMostCommented.sort(this._sort.sortByCommentsLength).slice(0, 2).forEach((filmMock) => this._renderFilm(container, filmMock, false));
    }
  }

  _onDataChange(newData, oldData) {
    this._films[this._films.findIndex((it) => it === oldData)] = newData;
    if (this._radio === false) {
      this._unrenderNavigation();
      this._renderNavigation(this._categoryFocus);
      this.renderBoard(this._films);
      this._renderFilmsTopRated(this._films);
      this._renderFilmsMostCommented(this._films);
      this._unrenderStatistic();
      this._renderStatistic();
    } else {
      this.renderBoard(this._films);
    }
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  renderLoadMore() {
    const container = this._filmsContainer.getElement().querySelector(`.films-list__container`);
    const containerButton = document.querySelector(`.films-list`);

    const makeLoadMore = () => {
      const number = 5;
      const pageCount = this._filmsContainer.getElement().querySelectorAll(`.film-card`).length;
      const totalCard = this._films.length;
      this._count = pageCount + number;

      container.innerHTML = ``;
      this._films.slice(0, this._count).forEach((filmMock) => this._renderFilm(container, filmMock));

      if (pageCount >= totalCard - 5) {
        this._showMore.getElement().classList.add(`visually-hidden`);
      }
    };

    render(containerButton, this._showMore.getElement());
    this._showMore.getElement().addEventListener(`click`, makeLoadMore);
  }

  unrenderLoadMore() {
    unrender(this._showMore.getElement());
  }

  _renderNavigation(categoryFocus) {
    const nav = new NavigationController(this._main, this._containerBody, this._films, categoryFocus);
    nav.init();
  }

  _unrenderNavigation() {
    const nav = this._main.querySelector(`nav`);
    if (nav) {
      nav.parentNode.removeChild(nav);
    }
  }

  _renderSort() {
    if (this._films.length > 0) {
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
  }

  _unrenderSort() {
    const sort = this._main.querySelector(`.sort`);
    if (sort) {
      sort.parentNode.removeChild(sort);
    }
  }

  _getRank() {
    let rank = null;
    const counter = () => {
      const array = [];
      for (const value of this._films) {
        if (value.isHistory === true) {
          array.push(value);
        }
      }
      return array.length;
    };
    if (counter() >= 1 && counter() <= 10) {
      rank = `Novice`;
    } else if (counter() >= 11 && counter() <= 20) {
      rank = `Fan`;
    } else if (counter() >= 21) {
      rank = `Movie buff`;
    } else {
      rank = ``;
    }
    return rank;
  }

  _renderProfile() {
    const profile = new Profile(this._getRank());
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

    const statistic = new StatisticController(this._main, filmsHistory(), this._getRank());
    statistic.init();
  }

  _unrenderStatistic() {
    const statistic = this._main.querySelector(`.statistic`);
    if (statistic) {
      statistic.parentNode.removeChild(statistic);
    }
  }
}
