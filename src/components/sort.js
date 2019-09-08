import {AbstractComponent} from './abstract-component.js';

export class Sort extends AbstractComponent {
  constructor({order}) {
    super(null);
    this._order = order;
  }
  getTemplate() {
    return `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`;
  }
}
