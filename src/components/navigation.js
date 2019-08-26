import {AbstractComponent} from './absctract-component.js';

export class Navigation extends AbstractComponent {
  constructor({title, count, tag, classList}) {
    super();
    this._title = title;
    this._count = count;
    this._tag = tag;
    this._classList = classList;
  }

  getTemplate() {
    return `<a href="#${this._tag}" class="main-navigation__item ${this._classList}">${this._title} ${this._count}</a>`;
  }
}

