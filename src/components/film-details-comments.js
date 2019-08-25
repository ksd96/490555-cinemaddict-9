import {createElement} from './utils.js';

export class Comments {
  constructor({image, text, author}) {
    this._image = image;
    this._text = text;
    this._author = author;
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
    return `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${this._image}" width="55" height="55" alt="emoji">
      </span>
      <div>
        <p class="film-details__comment-text">${this._text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${this._author}</span>
          <span class="film-details__comment-day">3 days ago</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`;
  }
}
