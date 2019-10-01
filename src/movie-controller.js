import {FilmList} from "./components/film-list";
import {FilmListExtra} from "./components/film-list-extra.js";
import {FilmDetails} from "./components/film-details.js";
import {Comment} from "./components/comment.js";
import {AbstractComponent} from "./components/abstract-component.js";
import {LoadMore} from "./components/load-more";
import {deleteElement, processIfEnterEvent} from "./utils.js";

export class MovieController extends AbstractComponent {
  constructor({data, onDataChange, onChangeView, cardContainer}) {
    super();
    this._data = data;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._lastPortion = 0;
    this._cardEls = [];
    this._CARDS_LOAD_QUANTITY_PORTION = 5;
    this._loadedCardsQuantity = 0;
    this._mainEl = document.querySelector(`.main`);
    this._loadMoreObj = null;
    this._filmListObj = null;
    this._filmListExtraObj = [];
    this._cardDataArrPortion = [];
    this._cardContainer = cardContainer;
  }

  getFilmCardsObjArr() {
    this._cardDataArrPortion = this._data.slice(0, this._CARDS_LOAD_QUANTITY_PORTION + this._loadedCardsQuantity);
    this._loadedCardsQuantity += this._CARDS_LOAD_QUANTITY_PORTION;

    if (!this._cardDataArrPortion.length) {
      return ``;
    }

    if ((this._data.length - this._loadedCardsQuantity) < this._CARDS_LOAD_QUANTITY_PORTION) {
      this._lastPortion = 1;
    }
    return this._cardDataArrPortion;
  }
  setDefaultView() {
    const popupEl = document.querySelector(`.film-details`);

    if (popupEl) {
      deleteElement(popupEl);
    }
  }
  callbackFuncOnLoadMore() {
    const showMoreEl = this._element.querySelector(`.films-list__show-more`);
    if (showMoreEl) {
      showMoreEl.addEventListener(`click`, () => {
        this.renderInnerComponents();
      });
    }
  }
  clickCallbackForFilmDetailChildren() {
    const filmDetailEl = document.querySelector(`.film-details__inner`);
    const filmDetailNewCommentEl = document.querySelector(`.film-details__new-comment`);
    const boundOnDataChange = this._onDataChange;

    filmDetailEl.addEventListener(`click`, (event) => {
      function ratingClickCallback() {
        event.target.parentNode.querySelectorAll(`input`).forEach((item) => item.removeAttribute(`checked`));
        event.target.previousElementSibling.inputEl.setAttribute(`checked`, `checked`);
      }
      function callbackFuncOnCardDetailToClose() {
        deleteElement(document.querySelector(`.film-details`));
      }
      function callbackFuncOnCardDetailControlls() {
        const prevValue = event.target.getAttribute(`val`);
        let value = (prevValue === `false`) ? `true` : `false`;
        event.target.setAttribute(`val`, value);
        boundOnDataChange();
      }
      function callbackFuncOnEmojiImgInComment() {
        const placeEl = document.querySelector(`.film-details__add-emoji-label`).querySelector(`img`);
        placeEl.removeAttribute(`class`);
        placeEl.src = event.target.src;
      }

      switch (event.target.className) {
        case `film-details__user-rating-label`: // обработчик на оценку пользователем фильма
          ratingClickCallback();
          break;
        case `film-details__close-btn`: // обработчик на закрытие filmDetails
          callbackFuncOnCardDetailToClose();
          break;
        case `film-details__control-input visually-hidden`: // обработчик на контролы filmCard
          callbackFuncOnCardDetailControlls();
          break;
        case `film-details__emoji-label-img`: // обработчик на клик по эмоджи в комментарии
          callbackFuncOnEmojiImgInComment();
          break;
      }
    });
    // обработчик на добавление нового комментария
    filmDetailNewCommentEl.addEventListener(`keydown`, (event) => {
      function onAddingNewComment() {
        const parent = event.currentTarget.previousElementSibling;
        const emojiImg = event.currentTarget.querySelector(`.film-details__add-emoji-label`).querySelector(`img`).src;
        new Comment({emoji: emojiImg, text: event.target.value, author: `Ksusha Bukovskaya`, daysAgo: `today`,
          isDeleted: false}).render(parent);
        boundOnDataChange();
      }
      processIfEnterEvent(event, onAddingNewComment);
    });
  }
  callbackFuncOnCards() {
    // show popup
    for (let i = 0; i <= this._cardEls.length - 1; i++) {
      let cardClickEls = [
        {id: this._cardEls[i].getAttribute(`id`), el: this._cardEls[i].querySelector(`.film-card__poster`)},
        {id: this._cardEls[i].getAttribute(`id`), el: this._cardEls[i].querySelector(`.film-card__title`)},
        {id: this._cardEls[i].getAttribute(`id`), el: this._cardEls[i].querySelector(`.film-card__comments`)}
      ];
      cardClickEls.forEach((itemObj) => {
        itemObj.el.addEventListener(`click`, () => {
          this._onChangeView();
          const dataObj = this._cardDataArrPortion.find((item) => item.id === itemObj.id);
          const filmDetailsObj = new FilmDetails(dataObj);
          const container = document.querySelector(`body`);
          filmDetailsObj.render(container);
          this.clickCallbackForFilmDetailChildren();
        });
      });
    }
    // update mocks on film card
    this.callbackFuncOnCardControlls();
  }
  callbackFuncOnCardControlls() {
    for (let i = 0; i <= this._cardEls.length - 1; i++) {
      let cardClickEls = [
        {type: `toWatch`, el: this._cardEls[i].querySelector(`.film-card__controls-item--add-to-watchlist`)},
        {type: `alreadyWatched`, el: this._cardEls[i].querySelector(`.film-card__controls-item--mark-as-watched`)},
        {type: `isFavorite`, el: this._cardEls[i].querySelector(`.film-card__controls-item--favorite`)}
      ];
      cardClickEls.forEach((itemObj) => {
        itemObj.el.addEventListener(`click`, () => {
          const parentNode = itemObj.el.parentNode;
          const prevValue = parentNode.getAttribute(`${itemObj.type}`);
          let value = (prevValue === `false`) ? `true` : `false`;
          switch (itemObj.type) {
            case `toWatch`:
              parentNode.setAttribute(`toWatch`, value);
              break;
            case `alreadyWatched`:
              parentNode.setAttribute(`alreadyWatched`, value);
              break;
            case `isFavorite`:
              parentNode.setAttribute(`isFavorite`, value);
              break;
          }
          this._onDataChange(itemObj.el);
        });
      });
    }
  }
  getTopRatedFilms() {
    const cardDataArrCopy = this._data.slice(0, this._data.length);
    cardDataArrCopy.sort((obj1, obj2) => -(obj1.rating - obj2.rating));
    return cardDataArrCopy.slice(0, 2);
  }
  getMostCommentedFilms() {
    const cardDataArrCopy = this._data.slice(0, this._data.length);
    cardDataArrCopy.sort((obj1, obj2) => obj1.comments.length - obj2.comments.length);
    return cardDataArrCopy.slice(0, 2);
  }
  getTemplate() {
    return `<section class="films">
    </section>`;
  }

  renderInnerComponents() {
    this._filmListObj = new FilmList(this.getFilmCardsObjArr());
    this._filmListObj.unrender();
    this._filmListObj.render(this._cardContainer);

    if (!this._lastPortion) {
      this._loadMoreObj = new LoadMore();
      this._loadMoreObj.unrender();
      this._loadMoreObj.render(this._cardContainer);
    } else {
      this._loadMoreObj.unrender();
    }
    // extra
    this._filmListExtraObj.forEach((item) => {
      item.unrender();
    });
    this._filmListExtraObj.splice(0, this._filmListExtraObj.length);
    this._filmListExtraObj.push(new FilmListExtra(this.getTopRatedFilms(), `Top rated`),
        new FilmListExtra(this.getMostCommentedFilms(), `Most commented`));
    this._filmListExtraObj.forEach((item) => {
      item.render(this._element);
    });
    this.init();
  }
  render(container) {
    super.render(container);
    this._element.appendChild(this._cardContainer);
    this.renderInnerComponents();
  }
  init() {
    // навешиваем все обработчики на элемент .films и его подэлементы
    const cardContainer = this._element.querySelector(`.films-list__container`);
    this._cardEls = Array.from(cardContainer.querySelectorAll(`.film-card`));
    this.setDefaultView();
    this.callbackFuncOnCards();
    this.callbackFuncOnLoadMore();
  }
}
