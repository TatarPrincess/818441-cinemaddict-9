import {AbstractComponent} from './abstract-component.js';

export class Comment extends AbstractComponent {
  constructor({emoji, text, author, daysAgo, isDeleted}) {
    super(null);
    this._emoji = emoji;
    this._text = text;
    this._author = author;
    this._daysAgo = daysAgo;
    this._isDeleted = isDeleted;
  }
  getTemplate() {
    return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="${this._emoji}" width="55" height="55" alt="emoji">
    </span>
    <div>
      <p class="film-details__comment-text">${this._text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${this._author}</span>
        <span class="film-details__comment-day">${this._daysAgo} days ago</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
  }
}
