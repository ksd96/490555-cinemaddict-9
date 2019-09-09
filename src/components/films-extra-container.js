import {AbstractComponent} from './absctract-component.js';

export class ExtraContainer extends AbstractComponent {
  constructor(sectionClass, title) {
    super();
    this._sectionClass = sectionClass;
    this._title = title;
  }

  getTemplate() {
    return `<section class="films-list--extra films-list--${this._sectionClass}"><h2 class="films-list__title">${this._title}</h2><div class="films-list__container"></div></section>`;
  }
}
