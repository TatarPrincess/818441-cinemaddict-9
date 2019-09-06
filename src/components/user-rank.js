import {createElement} from '../utils.js';

export class UserRank {
  constructor({rank, container, order}) {
    this._rating = rank;
    this._containerEl = container;
    this._getContainer = null;
    this._order = order;
    this._element = this.getElement();
  }
  getTemplate() {
    return `<section class="header__profile profile">
    <p class="profile__rating">${this._rating}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
 </section>`;
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    if (this._element) {
      this._element = undefined;
    }
  }
}
