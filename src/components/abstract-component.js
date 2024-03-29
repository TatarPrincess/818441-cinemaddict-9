import {createElement} from '../utils.js';

export class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }
    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
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
  unrender() {
    let child = document.querySelector(`.${this.getElement().className}`);

    if (child !== null) {
      child.remove();
      this.removeElement();
    }
  }

  render(containerEl) {
    containerEl.appendChild(this.getElement());
  }
}
