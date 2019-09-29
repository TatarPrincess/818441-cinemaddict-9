import {AbstractComponent} from './abstract-component.js';

export class FooterStat extends AbstractComponent {
  constructor(quant) {
    super();
    this._amount = quant;
  }
  getTemplate() {
    return `<section class="header__profile profile">
      <p class="profile__rating">${this._amount}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
   </section>`;
  }
}
