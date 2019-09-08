import {AbstractComponent} from './absctract-component.js';

export class ResultCount extends AbstractComponent {
  constructor(count) {
    super();
    this._count = count;
  }

  getTemplate() {
    return `<div class="result">
        <p class="result__text">Result <span class="result__count">${this._count}</span></p>
      </div>`;
  }
}
