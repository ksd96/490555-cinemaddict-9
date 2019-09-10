import {Comments} from '../components/film-details-comments.js';
import {render} from '../components/utils.js';

export class CommentsController {
  constructor(arrayComments, containerPopup) {
    this._arrayComments = arrayComments;
    this._containerPopup = containerPopup;
    this._commentsList = null;
  }

  _onCommentsChange(newData, oldData) {
    const index = this._arrayComments.findIndex((comments) => {
      if (oldData !== null && comments.text === oldData._text && comments.image === oldData._image && comments.author === oldData._author) {
        return true;
      } else {
        return false;
      }
    });

    if (newData === null) {
      this._arrayComments = [...this._arrayComments.slice(0, index), ...this._arrayComments.slice(index + 1)];
    } else {
      this._arrayComments.unshift(newData);
    }
    this._renderCommentsAgain(this._arrayComments);
  }

  _renderCommentsAgain(_comments) {
    this._commentsList.innerHTML = ``;
    this._arrayComments.forEach((commentMock) => this._renderComment(commentMock));
    // entry.arrayComments = this._arrayComments;
  }

  _renderComment(comments) {
    const comment = new Comments(comments);
    comment.getElement()
      .querySelector(`.film-details__comment-delete`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._onCommentsChange(null, comment);
        let quantityComments = this._containerPopup.querySelector(`.film-details__comments-count`).innerHTML;
        this._containerPopup.querySelector(`.film-details__comments-count`).innerHTML = `${+quantityComments - 1}`;
      });
    this._commentsList = this._containerPopup.querySelector(`.film-details__comments-list`);
    render(this._commentsList, comment.getElement());
  }

  init() {
    this._arrayComments.forEach((commentMock) => this._renderComment(commentMock));
  }
}
