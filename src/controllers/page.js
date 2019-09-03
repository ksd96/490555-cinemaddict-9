import {MovieController} from './movie.js';

export class PageController {
  constructor(container, containerPopup, films) {
    this._container = container;
    this._containerPopup = containerPopup;
    this._films = films;

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    this._films.forEach((filmMock) => this._renderFilm(filmMock));
  }

  _renderBoard(_films) {
    this._container.innerHTML = ``;
    this._films.forEach((taskMock) => this._renderFilm(taskMock));
  }

  _renderFilm(films) {
    const movieController = new MovieController(this._container, this._containerPopup, films, this._onDataChange, this._onChangeView);
    this._subscriptions.push(movieController.setDefaultView.bind(movieController));
  }

  _onDataChange(newData, oldData) {
    this._films[this._films.findIndex((it2) => it2 === oldData)] = newData;
    this._renderBoard(this._films);
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }
}
