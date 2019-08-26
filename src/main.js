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
import {render, unrender} from './components/utils.js';


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

const renderShowMore = () => {
  const makeLoadMore = () => {
    const number = 5;
    const pageCount = filmListContainer.querySelectorAll(`.film-card`).length;

    arrayFilms.slice(pageCount, pageCount + number).forEach((filmMock) => renderFilmCard(filmMock, filmListContainer));
    if (pageCount >= totalCard) {
      load.classList.add(`visually-hidden`);
    }
  };

  addComponent(sectionFilmsList, getElementShowMore());
  const load = document.querySelector(`.films-list__show-more`);
  load.addEventListener(`click`, makeLoadMore);
};

const renderProfile = (profileMock) => {
  const profile = new Profile(profileMock);
  render(header, profile.getElement());
};

const renderNavigation = (navMock) => {
  const nav = new Navigation(navMock);
  if (!main.querySelector(`.main-navigation`)) {
    navigation.classList.add(`main-navigation`);
    main.appendChild(navigation);
  }

  render(navigation, nav.getElement());
};

const renderFilmCard = (filmMock, where) => {
  const film = new Film(filmMock);
  const filmDetails = new FilmDetails(filmMock);

  if (!sectionFilmsList.querySelector(`.films-list__container`)) {
    filmListContainer.classList.add(`films-list__container`);
    sectionFilmsList.appendChild(filmListContainer);
  }

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

  render(where, film.getElement());
};

const renderFilmsExtra = (section, container, title, first, second) => {
  section.classList.add(`films-list--extra`);
  sectionFilms.appendChild(section);

  addComponent(section, title);

  container.classList.add(`films-list__container`);
  section.appendChild(container);

  arrayFilms.slice(first, second).forEach((filmMock) => renderFilmCard(filmMock, container));
};

addComponent(header, getElementSearch());

arrayNavigation.forEach((navMock) => renderNavigation(navMock));

addComponent(main, getElementSort());


sectionFilms.classList.add(`films`);
main.appendChild(sectionFilms);

sectionFilmsList.classList.add(`films-list`);
sectionFilms.appendChild(sectionFilmsList);

addComponent(sectionFilmsList, filmListTitle);

arrayFilms.slice(0, 5).forEach((filmMock) => renderFilmCard(filmMock, filmListContainer));

renderFilmsExtra(sectionFilmListTopRated, filmListContainerTopRated, filmListTopRatedTitle, 0, 2);
renderFilmsExtra(sectionFilmListMostCommented, filmListContainerMostCommented, filmListMostCommentedTitle, 3, 5);

renderProfile(numberWatched);

renderShowMore();

footerCount.innerHTML = `<p>${arrayFilms.length} movies inside</p>`;
