import {getElementSearch} from './components/search.js';
import {makeElementProfile} from './components/profile.js';
import {getProfile} from './components/data-profile.js';
import {makeElementNavigation} from './components/navigation.js';
import {getElementNavigation} from './components/data-filter.js';
import {getElementSort} from './components/sort.js';
import {makeFilm} from './components/film-card.js';
import {getElementShowMore} from './components/button-show-more.js';
import {getPopup} from './components/data-popup.js';
import {makePopup} from './components/film-details.js';
import {getComment} from './components/data-comments.js';
import {makeComment} from './components/film-details-comments.js';
import {arrayFilms} from './components/array-films.js';
import {totalCard} from './components/array-films.js';


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

const renderFilms = (where, array, start, end, make) => {
  where.insertAdjacentHTML(`beforeend`, array.slice(start, end).map(make).join(``));
};

const renderFilters = (where, get, make) => {
  for (const value of get) {
    const getF = () => (value);
    where.insertAdjacentHTML(`beforeend`, new Array(1)
    .fill(``)
    .map(getF)
    .map(make)
    .join(``));
  }
};

const renderElement = (where, count, get, make) => {
  where.insertAdjacentHTML(`beforeend`, new Array(count)
  .fill(``)
  .map(get)
  .map(make)
  .join(``));
};

const makeLoadMore = () => {
  const number = 5;

  renderFilms(filmListContainer, arrayFilms, renderStart + number, renderEnd + number, makeFilm);
  renderStart += number;
  renderEnd += number;
  if (renderEnd >= totalCard) {
    load.classList.add(`visually-hidden`);
  }
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
renderFilms(filmListContainer, arrayFilms, 0, 5, makeFilm);
renderFilms(filmListContainerTopRated, arrayFilms, 0, 2, makeFilm);
renderFilms(filmListContainerMostCommented, arrayFilms, 2, 4, makeFilm);
renderFilters(navigation, getElementNavigation(), makeElementNavigation);
renderElement(header, 1, getProfile, makeElementProfile);
renderElement(body, 1, getPopup, makePopup);
const commentsList = document.querySelector(`.film-details__comments-list`);
renderElement(commentsList, 4, getComment, makeComment);

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
