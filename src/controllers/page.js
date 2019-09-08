import {MovieController} from './movie.js';
import {ShowMore} from '../components/load-more.js';
import {render} from '../components/utils.js';
import {Navigation} from '../components/navigation.js';
import {Statistic} from '../components/statistic.js';
import {Sort} from '../components/sort.js';
import {FilmsContainer} from '../components/films-container';
import {ExtraContainer} from '../components/films-extra-container.js';

export class PageController {
  constructor(containerBody, main, films, arrayNavigation, radio) {
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
    this._films.slice(0, this._count).forEach((taskMock) => this._renderFilm(container, taskMock));
  }

  _renderFilm(container, films) {
    const movieController = new MovieController(container, this._containerBody, films, this._onDataChange, this._onChangeView);
    this._subscriptions.push(movieController.setDefaultView.bind(movieController));
  }

  _renderFilmsTopRated(_films) {
    const container = this._filmsContainerTopRated.getElement().querySelector(`.films-list__container`);
    container.innerHTML = ``;
    render(this._main.querySelector(`.films`), this._filmsContainerTopRated.getElement());
    this._films.slice(0, 2).forEach((filmMock) => this._renderFilm(container, filmMock));
  }

  _renderFilmsMostCommented(_films) {
    const container = this._filmsContainerMostCommented.getElement().querySelector(`.films-list__container`);
    container.innerHTML = ``;
    render(this._main.querySelector(`.films`), this._filmsContainerMostCommented.getElement());
    this._films.slice(3, 5).forEach((filmMock) => this._renderFilm(container, filmMock));
  }

  _onDataChange(newData, oldData) {
    this._films[this._films.findIndex((it) => it === oldData)] = newData;
    this._renderBoard(this._films);
    if (this._radio === false) {
      this._renderFilmsTopRated(this._films);
      this._renderFilmsMostCommented(this._films);
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

  _renderNavigation() {
    const navigation = document.createElement(`nav`);
    navigation.classList.add(`main-navigation`);
    this._main.prepend(navigation);

    const renderNavigation = (navMock) => {
      const nav = new Navigation(navMock);
      render(this._main.querySelector(`.main-navigation`), nav.getElement());
    };
    this._arrayNavigation.forEach((navMock) => renderNavigation(navMock));
  }

  _renderSort() {
    render(this._main, this._sort.getElement());
  }

  _renderStatistic() {
    render(this._main, this._statistic.getElement());

    document.querySelector(`.main-navigation`).addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const btn = event.target.closest(`a`);

      switch (btn.getAttribute(`href`)) {
        case `#all`:
          this._statistic.getElement().classList.add(`visually-hidden`);
          this._sort.getElement().classList.remove(`visually-hidden`);
          this.show();
          break;
        case `#stats`:
          this._sort.getElement().classList.add(`visually-hidden`);
          this.hide();
          this._statistic.getElement().classList.remove(`visually-hidden`);
          break;
      }
    });
  }
}
