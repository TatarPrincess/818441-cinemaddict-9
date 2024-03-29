import {AbstractComponent} from './abstract-component.js';

export class UserRank extends AbstractComponent {
  constructor(rank) {
    super();
    this._rating = rank;
  }
  getTemplate() {
    return `<section class="header__profile profile">
    <p class="profile__rating">${this._rating}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
 </section>`;
  }
}
