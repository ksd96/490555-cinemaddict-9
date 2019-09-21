import AbstractComponent from './abstract-component.js';

export default class Sort extends AbstractComponent {
  getTemplate() {
    return `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--default sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button sort__button--date">Sort by date</a></li>
      <li><a href="#" class="sort__button sort__button--rating">Sort by rating</a></li>
    </ul>`;
  }

  changeFocus(sortType) {
    const a = this.getElement().querySelector(`.sort__button--active`);
    const b = this.getElement().querySelector(`.sort__button--${sortType}`);
    a.classList.remove(`sort__button--active`);
    b.classList.add(`sort__button--active`);
  }

  sortByRating(a, b) {
    return b.rating - a.rating;
  }

  sortByDefault(a, b) {
    return a.id - b.id;
  }

  sortByDate(a, b) {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }

  sortByCommentsLength(a, b) {
    return b.arrayComments.length - a.arrayComments.length;
  }
}

