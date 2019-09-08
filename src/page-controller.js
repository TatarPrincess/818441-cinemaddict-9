import {render} from './utils.js';

export class PageController {
  constructor(container, dataObj) {
    this._container = container;
    this._dataObj = dataObj;
  }
  getElement() {
    this._dataObj.getElement();
  }
  init() {
    if (!this._container && this._dataObj.getContainer()) {
      this._container = this._dataObj.getContainer();
    }
    if (!this._container && !this._dataObj.getContainer()) {
      throw new Error(`Не передан метод для получения элемента-контейнера`);
    }

    this.getElement();
    render(this._container, this._dataObj._element);

    if (this._dataObj.callbackFunc && typeof this._dataObj.callbackFunc === `function`) {
      this._dataObj.callbackFunc();
    }
  }
}
