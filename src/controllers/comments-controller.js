import Comments from '../components/comments.js';
import {render} from '../components/utils.js';

export default class CommentsController {
  constructor(arrayComments, containerPopup, onDataChangeMain, idFilm) {
    this._arrayComments = arrayComments;
    this._containerPopup = containerPopup;
    this._commentsList = null;
    this._idFilm = idFilm;

    this._onDataChangeMain = onDataChangeMain;
  }

  _renderComment(comments) {
    const comment = new Comments(comments);

    comment.getElement()
      .querySelector(`.film-details__comment-delete`)
      .addEventListener(`click`, (evt) => {
        evt.target.innerHTML = `Deleting…`;
        evt.target.disabled = true;
        evt.preventDefault();

        const obj = {
          image: comments.image,
          text: comments.text,
          date: comments.date,
        };

        this._onDataChangeMain(`delete`, comments.id, obj, this._idFilm, evt.target);

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
