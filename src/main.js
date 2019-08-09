import {getElementSearch} from './components/search.js';
import {getElementProfile} from './components/profile.js';
import {getElementNavigation} from './components/navigation.js';
import {getElementSort} from './components/sort.js';
import {getElementCard} from './components/film-card.js';
import {getElementShowMore} from './components/button-show-more.js';
import {getElementFilmDetails} from './components/film-details.js';

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

const addComponent = function (where, what) {
  where.insertAdjacentHTML(`beforeend`, what);
};


addComponent(header, getElementSearch());
addComponent(header, getElementProfile());
addComponent(main, getElementNavigation());
addComponent(main, getElementSort());

sectionFilms.classList.add(`films`);
main.appendChild(sectionFilms);

sectionFilmsList.classList.add(`films-list`);
sectionFilms.appendChild(sectionFilmsList);

addComponent(sectionFilmsList, filmListTitle);

filmListContainer.classList.add(`films-list__container`);
sectionFilmsList.appendChild(filmListContainer);

addComponent(filmListContainer, getElementCard(`The Dance of Life`, `8.3`, `1929`, `1h 55m`, `Musical`, `the-dance-of-life.jpg`, `Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…`, 5));
addComponent(filmListContainer, getElementCard(`Sagebrush Trail`, `3.2`, `1933`, `54m`, `Western`, `sagebrush-trail.jpg`, `Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the real killer. By chance Brant's narrow escap…`, 89));
addComponent(filmListContainer, getElementCard(`The Man with the Golden Arm`, `9.0`, `1955`, `1h 59m`, `Drama`, `the-man-with-the-golden-arm.jpg`, `Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…`, 18));
addComponent(filmListContainer, getElementCard(`Santa Claus Conquers the Martians`, `2.3`, `1964`, `1h 21m`, `Comedy`, `santa-claus-conquers-the-martians.jpg`, `The Martians Momar ("Mom Martian") and Kimar ("King Martian") are worried that their children Girmar ("Girl Martian") and Bomar ("Boy Marti…`, 465));
addComponent(filmListContainer, getElementCard(`Popeye the Sailor Meets Sindbad the Sailor`, `6.3`, `1936`, `16m`, `Cartoon`, `popeye-meets-sinbad.png`, `In this short, Sindbad the Sailor (presumably Bluto playing a "role") proclaims himself, in song, to be the greatest sailor, adventurer and…`, 18));

addComponent(sectionFilmsList, getElementShowMore());

sectionFilmListTopRated.classList.add(`films-list--extra`);
sectionFilms.appendChild(sectionFilmListTopRated);

addComponent(sectionFilmListTopRated, filmListTopRatedTitle);

filmListContainerTopRated.classList.add(`films-list__container`);
sectionFilmListTopRated.appendChild(filmListContainerTopRated);

addComponent(filmListContainerTopRated, getElementCard(`The Man with the Golden Arm`, `9.0`, `1955`, `1h 59m`, `Drama`, `the-man-with-the-golden-arm.jpg`, `Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…`, 18));
addComponent(filmListContainerTopRated, getElementCard(`The Great Flamarion`, `8.9`, `1945`, `1h 18m`, `Mystery`, `the-great-flamarion.jpg`, `The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Grea…`, 12));

sectionFilmListMostCommented.classList.add(`films-list--extra`);
sectionFilms.appendChild(sectionFilmListMostCommented);

addComponent(sectionFilmListMostCommented, filmListMostCommentedTitle);

filmListContainerMostCommented.classList.add(`films-list__container`);
sectionFilmListMostCommented.appendChild(filmListContainerMostCommented);

addComponent(filmListContainerMostCommented, getElementCard(`Santa Claus Conquers the Martians`, `2.3`, `1964`, `1h 21m`, `Comedy`, `santa-claus-conquers-the-martians.jpg`, `The Martians Momar ("Mom Martian") and Kimar ("King Martian") are worried that their children Girmar ("Girl Martian") and Bomar ("Boy Marti…`, 465));
addComponent(filmListContainerMostCommented, getElementCard(`Made for Each Other`, `5.6`, `1939`, `1h 32m`, `Comedy`, `made-for-each-other.png`, `John Mason (James Stewart) is a young, somewhat timid attorney in New York City. He has been doing his job well, and he has a chance of bei…`, 56));

addComponent(body, getElementFilmDetails);
