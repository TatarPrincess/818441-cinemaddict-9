// export const getFooterStatMarkup = (amount) =>
//   `<section class="footer__statistics">
//   <p>${amount} movies inside</p>
//   </section>`;
import {createElement} from '../utils.js';

export class FooterStat {
  constructor({quant, container, order}) {
    this._amount = quant;
    this._containerEl = container;
    this._getContainer = null;
    this._order = order;
    this._element = this.getElement();
  }
  getTemplate() {
    return `<section class="header__profile profile">
      <p class="profile__rating">${this._amount}</p>
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
