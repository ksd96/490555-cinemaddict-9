import Navigation from "../components/navigation";
import {api} from "../main";
import PageController from "./page-controller";
import {onDataChange} from "../components/on-data-change";

export default class NavigationController {
  constructor(main, body, films, categoryFocus) {
    this._main = main;
    this._body = body;
    this._films = films;
    this._categoryFocus = categoryFocus;
  }

  _scoreFilms(category, films) {
    const array = [];
    for (const value of films) {
      if (category === `isWatchlist` && value.isWatchlist === true) {
        array.push(value);
      } else if (category === `isHistory` && value.isHistory === true) {
        array.push(value);
      } else if (category === `isFavorites` && value.isFavorites === true) {
        array.push(value);
      } else if (category === `all`) {
        return films;
      }
    }
    return array;
  }

  _renderOtherFilms(array, categoryFocus) {
    const navOnDateChange = (actionType, update, old, unit, evt) => {
      return onDataChange(actionType, update, old, unit, evt, page);
    };

    const page = new PageController(this._body, this._main, array, false, navOnDateChange, categoryFocus);
    page.initNav();
  }

  _changeFocus(navType) {
    const a = this._main.querySelector(`.main-navigation__item--active`);
    const b = this._main.querySelector(`.main-navigation__item--${navType}`);
    a.classList.remove(`main-navigation__item--active`);
    b.classList.add(`main-navigation__item--active`);
  }

  init() {
    api.getFilms().then((films) => {
      const nav = new Navigation(this._scoreFilms(`isWatchlist`, films).length, this._scoreFilms(`isHistory`, films).length, this._scoreFilms(`isFavorites`, films).length);
      this._main.insertBefore(nav.getElement(), this._main.querySelector(`.sort`));
      this._changeFocus(this._categoryFocus);

      const renderFilms = (categoryArray, categoryFocus) => {
        const sectionFilms = this._main.querySelector(`.films`);
        sectionFilms.innerHTML = ``;
        this._renderOtherFilms(this._scoreFilms(categoryArray, films), categoryFocus);
        this._changeFocus(categoryFocus);
      };

      const addEventForCategory = (categoryButton, categoryArray, categoryFocus) => {
        nav.getElement()
        .querySelector(`.main-navigation__item--${categoryButton}`)
        .addEventListener(`click`, () => {
          renderFilms(categoryArray, categoryFocus);
        });
      };

      addEventForCategory(`watchlist`, `isWatchlist`, `watchlist`);
      addEventForCategory(`history`, `isHistory`, `history`);
      addEventForCategory(`favorites`, `isFavorites`, `favorites`);
      addEventForCategory(`all`, `all`, `all`);

      this._main.querySelector(`.main-navigation`).addEventListener(`click`, (evt) => {
        evt.preventDefault();

        if (evt.target.tagName !== `A`) {
          return;
        }

        const btn = event.target.closest(`a`);

        const hideStatistic = () => {
          this._main.querySelector(`.statistic`).classList.add(`visually-hidden`);
          if (this._main.querySelector(`.sort`)) {
            this._main.querySelector(`.sort`).classList.remove(`visually-hidden`);
          }
          this._body.querySelector(`.films`).classList.remove(`visually-hidden`);
        };

        switch (btn.getAttribute(`href`)) {
          case `#all`:
            hideStatistic();
            break;

          case `#watchlist`:
            hideStatistic();
            break;

          case `#history`:
            hideStatistic();
            break;

          case `#favorites`:
            hideStatistic();
            break;

          case `#stats`:
            if (this._main.querySelector(`.sort`)) {
              this._main.querySelector(`.sort`).classList.add(`visually-hidden`);
            }
            this._body.querySelector(`.films`).classList.add(`visually-hidden`);
            this._main.querySelector(`.statistic`).classList.remove(`visually-hidden`);
            break;
        }
      });
    });
  }
}
