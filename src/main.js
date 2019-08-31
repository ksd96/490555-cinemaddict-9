import {getElementSearch} from './components/search.js';
import {Profile} from './components/profile.js';
import {numberWatched} from './components/data-profile.js';
import {Navigation} from './components/navigation.js';
import {arrayNavigation} from './components/data-navigation.js';
import {getElementSort} from './components/sort.js';
import {getElementShowMore} from './components/button-show-more.js';
import {arrayFilms} from './components/array-films.js';
import {totalCard} from './components/array-films.js';
import {render} from './components/utils.js';
import {PageController} from './controllers/page.js';


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
const navigation = document.createElement(`nav`);
const footerCount = document.querySelector(`.footer__statistics`);

const addComponent = (where, what) => {
  where.insertAdjacentHTML(`beforeend`, what);
};

const renderShowMore = () => {
  const makeLoadMore = () => {
    const number = 5;
    const pageCount = filmListContainer.querySelectorAll(`.film-card`).length;

    document.querySelector(`.films-list__container`).innerHTML = ``;
    const pageController = new PageController(filmListContainer, arrayFilms.slice(0, pageCount + number));
    pageController.init();

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

export const renderNavigation = (navMock) => {
  const nav = new Navigation(navMock);
  if (!main.querySelector(`.main-navigation`)) {
    navigation.classList.add(`main-navigation`);
    main.appendChild(navigation);
  }

  render(navigation, nav.getElement());
};

const renderFilmsExtra = (section, container, title, first, second) => {
  section.classList.add(`films-list--extra`);
  sectionFilms.appendChild(section);

  addComponent(section, title);

  container.classList.add(`films-list__container`);
  section.appendChild(container);

  const pageControllerExtra = new PageController(container, arrayFilms.slice(first, second));
  pageControllerExtra.init();
};

addComponent(header, getElementSearch());

arrayNavigation.forEach((navMock) => renderNavigation(navMock));

addComponent(main, getElementSort());

sectionFilms.classList.add(`films`);
main.appendChild(sectionFilms);

sectionFilmsList.classList.add(`films-list`);
sectionFilms.appendChild(sectionFilmsList);

addComponent(sectionFilmsList, filmListTitle);

filmListContainer.classList.add(`films-list__container`);
sectionFilmsList.appendChild(filmListContainer);
const pageController = new PageController(filmListContainer, arrayFilms.slice(0, 5));
pageController.init();

renderFilmsExtra(sectionFilmListTopRated, filmListContainerTopRated, filmListTopRatedTitle, 0, 2);
renderFilmsExtra(sectionFilmListMostCommented, filmListContainerMostCommented, filmListMostCommentedTitle, 3, 5);

renderProfile(numberWatched);

renderShowMore();

footerCount.innerHTML = `<p>${arrayFilms.length} movies inside</p>`;
