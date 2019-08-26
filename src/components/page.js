import {render, unrender} from './utils.js';
import {Film} from './film-card.js';
import {FilmDetails} from './film-details.js';
import {Comments} from './film-details-comments.js';
import {arrayComents} from './data-comments.js';

const body = document.querySelector(`body`);

export class PageController {
  constructor(container, films) {
    this._container = container;
    this._films = films;
  }

  init() {
    this._films.forEach((filmMock) => this._renderFilm(filmMock));
  }

  _renderFilm(films) {
    const film = new Film(films);
    const filmDetails = new FilmDetails(films);

    let commentsList = null;

    const renderComment = (commentMock) => {
      const comment = new Comments(commentMock);
      commentsList = document.querySelector(`.film-details__comments-list`);
      render(commentsList, comment.getElement());
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        unrender(filmDetails.getElement());
        commentsList.innerHTML = ``;
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    film.getElement()
      .querySelector(`img`)
      .addEventListener(`click`, () => {
        render(body, filmDetails.getElement());
        arrayComents.forEach((commentMock) => renderComment(commentMock));
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    film.getElement()
      .querySelector(`.film-card__title`)
      .addEventListener(`click`, () => {
        render(body, filmDetails.getElement());
        arrayComents.forEach((commentMock) => renderComment(commentMock));
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    film.getElement()
      .querySelector(`.film-card__comments`)
      .addEventListener(`click`, () => {
        render(body, filmDetails.getElement());
        arrayComents.forEach((commentMock) => renderComment(commentMock));
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    filmDetails.getElement().querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    filmDetails.getElement().querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    filmDetails.getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, () => {
        unrender(filmDetails.getElement());
        commentsList.innerHTML = ``;
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    render(this._container, film.getElement());
  }
}
