import {FilmDetails} from './film-details.js';
import {AbstractComponent} from './abstract-component.js';
import {PageController} from '../page-controller.js';

export class FilmCard extends AbstractComponent {
  constructor({order, filmCardObj}) {
    super();
    this._order = order;
    this._title = filmCardObj.title;
    this._posterSrc = filmCardObj.posterSrc;
    this._description = filmCardObj.description;
    this._year = filmCardObj.year;
    this._duration = filmCardObj.duration;
    this._genre = filmCardObj.genre;
    this._rating = filmCardObj.rating;
    this._comments = filmCardObj.comments;
    this._isFavorite = filmCardObj.isFavorite;
    this._alreadyWatched = filmCardObj.alreadyWatched;
    this._toWatch = filmCardObj.toWatch;
    this._director = filmCardObj.director;
    this._writers = filmCardObj.writers;
    this._actors = filmCardObj.actors;
    this._country = filmCardObj.country;
    this.commentsDetail = filmCardObj.commentsDetail;
  }
  getContainer() {
    return document.querySelector(`.films-list__container`);
  }
  callbackFunc() {
    const clickEls = [this._element.querySelector(`.film-card__poster`),
      this._element.querySelector(`.film-card__title`),
      this._element.querySelector(`.film-card__comments`)];

    clickEls.forEach((item) => {
      item.addEventListener(`click`, () => {
        if (!document.querySelector(`.film-details`)) {
          let filmDetails = new FilmDetails(this._title,
              this._posterSrc,
              this._description,
              this._year,
              this._duration,
              this._genre, this._rating, this._comments, this._isFavorite, this._alreadyWatched,
              this._toWatch, this._director, this._writers, this._actors, this._country, this.commentsDetail);
          new PageController(filmDetails.getContainer(), filmDetails).init();
        }
      });
    });
  }
  getDtYear(ms) {
    const dt = new Date(ms);
    return dt.getFullYear();
  }

  getTemplate() {
    return `<article class="film-card">
    <h3 class="film-card__title">${this._title}</h3>
    <p class="film-card__rating">${this._rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${this.getDtYear(this._year)}</span>
      <span class="film-card__duration">${this._duration}</span>
      <span class="film-card__genre">${this._genre[0]}</span>
    </p>
    <img src="${this._posterSrc}" alt="" class="film-card__poster">
    <p class="film-card__description">${this._description}</p>
    <a class="film-card__comments">${this._comments}</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
    </form>
    </article>`;
  }
}
