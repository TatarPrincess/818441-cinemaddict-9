import {createElement} from '../utils.js';
import {render} from '../utils.js';
import {FilmDetails} from './film-details.js';

export class FilmCard {
  constructor({container = null, order, filmCardObj: {title, posterSrc, description, year, duration, genre,
    rating, comments, isFavorite, alreadyWatched, toWatch, director, writers, actors, country, commentsDetail}}) {
    this._containerEl = container;
    this._getContainer = () => document.querySelector(`.films-list__container`);
    this._order = order;
    this._title = title;
    this._posterSrc = posterSrc;
    this._description = description;
    this._year = year;
    this._duration = duration;
    this._genre = genre;
    this._rating = rating;
    this._comments = comments;
    this._isFavorite = isFavorite;
    this._alreadyWatched = alreadyWatched;
    this._toWatch = toWatch;
    this._director = director;
    this._writers = writers;
    this._actors = actors;
    this._country = country;
    this.commentsDetail = commentsDetail;
    this._callbackFunc = null;
    this._element = this.getElement();
    this._filmDetailsEl = null;
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

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    this._callbackFunc = () => {
      const containerEl = document.querySelector(`body`);
      const clickEls = [this._element.querySelector(`.film-card__poster`),
        this._element.querySelector(`.film-card__title`), this._element.querySelector(`.film-card__comments`)];

      clickEls.forEach((item) => {
        item.addEventListener(`click`, () => {
          if (!containerEl.querySelector(`.film-details`)) {
            let filmDetails = new FilmDetails(this._title,
                this._posterSrc,
                this._description,
                this._year,
                this._duration,
                this._genre, this._rating, this._comments, this._isFavorite, this._alreadyWatched,
                this._toWatch, this._director, this._writers, this._actors, this._country, this.commentsDetail);
            render(containerEl, filmDetails._element, filmDetails._callbackFunc);
          }
        });
      });
    };


    return this._element;
  }

  removeElement() {
    if (this._element) {
      this._element = undefined;
    }
  }


}
