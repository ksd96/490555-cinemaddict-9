import {getElementSearch} from './components/search.js';
import {Profile} from './components/profile.js';
import {numberWatched} from './components/data-profile.js';
import {Navigation} from './components/navigation.js';
import {arrayNavigation} from './components/data-navigation.js';
import {getElementSort} from './components/sort.js';
import {Film} from './components/film-card.js';
import {getElementShowMore} from './components/button-show-more.js';
import {FilmDetails} from './components/film-details.js';
import {arrayComents} from './components/data-comments.js';
import {Comments} from './components/film-details-comments.js';
import {arrayFilms} from './components/array-films.js';
import {totalCard} from './components/array-films.js';
import {Position, render, unrender} from './components/utils.js';


const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const sectionFilms = document.createElement(`section`);
const sectionFilmsList = document.createElement(`section`);
const filmListTitle = `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>`;
const filmListContainer = document.createElement(`div`);
const sectionFilmListTopRated = document.createElement(`section`);
const filmListTopRatedTitle = `<h2 class="films-list__title">Top rated</h2>`;
const filmListContainerTopRated = document.createElement(`div`);
const sectionFilmListMostCommented = document.createElement(`section`);
const filmListMostCommentedTitle = `<h2 class="films-list__title">Most commented</h2>`;
const filmListContainerMostCommented = document.createElement(`div`);
const body = document.querySelector(`body`);
const navigation = document.createElement(`nav`);
const footerCount = document.querySelector(`.footer__statistics`);

const addComponent = (where, what) => {
  where.insertAdjacentHTML(`beforeend`, what);
};

const makeLoadMore = () => {
  const number = 5;

  arrayFilms.slice(renderStart + number, renderEnd + number).forEach((filmMock) => renderFilmCard(filmMock, filmListContainer));
  renderStart += number;
  renderEnd += number;
  if (renderEnd >= totalCard) {
    load.classList.add(`visually-hidden`);
  }
};

const renderProfile = (profileMock) => {
  const profile = new Profile(profileMock);
  render(header, profile.getElement(), Position.BEFOREEND);
};

const renderNavigation = (navMock) => {
  const nav = new Navigation(navMock);
  render(navigation, nav.getElement(), Position.BEFOREEND);
};

let commentsList = null;
const renderComment = (commentMock) => {
  const comment = new Comments(commentMock);
  commentsList = document.querySelector(`.film-details__comments-list`);
  render(commentsList, comment.getElement(), Position.BEFOREEND);
};


const renderFilmCard = (filmMock, where) => {
  const film = new Film(filmMock);
  const filmDetails = new FilmDetails(filmMock);

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
      render(body, filmDetails.getElement(), Position.BEFOREEND);
      arrayComents.forEach((commentMock) => renderComment(commentMock));
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  film.getElement()
    .querySelector(`.film-card__title`)
    .addEventListener(`click`, () => {
      render(body, filmDetails.getElement(), Position.BEFOREEND);
      arrayComents.forEach((commentMock) => renderComment(commentMock));
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  film.getElement()
    .querySelector(`.film-card__comments`)
    .addEventListener(`click`, () => {
      render(body, filmDetails.getElement(), Position.BEFOREEND);
      arrayComents.forEach((commentMock) => renderComment(commentMock));
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  filmDetails.getElement()
    .querySelector(`.film-details__close-btn`)
    .addEventListener(`click`, () => {
      unrender(filmDetails.getElement());
      commentsList.innerHTML = ``;
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  render(where, film.getElement(), Position.BEFOREEND);
};

addComponent(header, getElementSearch());
navigation.classList.add(`main-navigation`);
main.appendChild(navigation);
addComponent(main, getElementSort());

sectionFilms.classList.add(`films`);
main.appendChild(sectionFilms);

sectionFilmsList.classList.add(`films-list`);
sectionFilms.appendChild(sectionFilmsList);

addComponent(sectionFilmsList, filmListTitle);

filmListContainer.classList.add(`films-list__container`);
sectionFilmsList.appendChild(filmListContainer);
arrayFilms.slice(0, 5).forEach((filmMock) => renderFilmCard(filmMock, filmListContainer));
arrayFilms.slice(0, 2).forEach((filmMock) => renderFilmCard(filmMock, filmListContainerTopRated));
arrayFilms.slice(3, 5).forEach((filmMock) => renderFilmCard(filmMock, filmListContainerMostCommented));
arrayNavigation.forEach((navMock) => renderNavigation(navMock));
renderProfile(numberWatched);

addComponent(sectionFilmsList, getElementShowMore());

sectionFilmListTopRated.classList.add(`films-list--extra`);
sectionFilms.appendChild(sectionFilmListTopRated);

addComponent(sectionFilmListTopRated, filmListTopRatedTitle);

filmListContainerTopRated.classList.add(`films-list__container`);
sectionFilmListTopRated.appendChild(filmListContainerTopRated);


sectionFilmListMostCommented.classList.add(`films-list--extra`);
sectionFilms.appendChild(sectionFilmListMostCommented);

addComponent(sectionFilmListMostCommented, filmListMostCommentedTitle);

filmListContainerMostCommented.classList.add(`films-list__container`);
sectionFilmListMostCommented.appendChild(filmListContainerMostCommented);

const load = document.querySelector(`.films-list__show-more`);
let renderStart = 0;
let renderEnd = 5;
load.addEventListener(`click`, makeLoadMore);

footerCount.innerHTML = `<p>${arrayFilms.length} movies inside</p>`;
