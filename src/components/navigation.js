import {createElement} from './utils.js';

export class Navigation {
  constructor({title, count, tag, classList}) {
    this._title = title;
    this._count = count;
    this._tag = tag;
    this._classList = classList;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    if (this._element) {
      this._element = null;
    }
  }

  getTemplate() {
    return `<a href="#${this._tag}" class="main-navigation__item ${this._classList}">${this._title} ${this._count}</a>`;
  }
}

