import {Comment} from '../components/comment.js';
import {FilmCard} from './film-card.js';
import {FilmDetailsRating} from './film-details-rating.js';

export class FilmDetails extends FilmCard {
  constructor(filmCardObj) {
    super(filmCardObj);
  }

  getDtMonth(ms) {
    const dt = new Date(ms);
    return dt.toLocaleString(`en`, {month: `long`});
  }
  getDtDay(ms) {
    const dt = new Date(ms);
    return dt.toLocaleString(`en`, {year: `numeric`});
  }
  getDtYear(ms) {
    const dt = new Date(ms);
    return dt.toLocaleString(`en`, {day: `numeric`});
  }
  // alreadyWatchedReaction() {
  //   const posterSrcEl = this._element.querySelector(`.film-details__poster-img`);
  //   if (this._alreadyWatched === `true`) {
  //     const container = this._element.querySelector(`.film-details__inner`);
  //     const beforeEl = this._element.querySelector(`.form-details__bottom-container`);
  //     const filmDetailRatingObj = new FilmDetailsRating(posterSrcEl.src, this._alreadyWatched);
  //     filmDetailRatingObj.render(container, beforeEl);
  //   } else {
  //     new FilmDetailsRating(posterSrcEl.src, this._alreadyWatched).unrender();
  //   }
  // }

  alreadyWatchedReaction() {
    const posterSrcEl = this._element.querySelector(`.film-details__poster-img`);
    const container = this._element.querySelector(`.film-details__inner`);
    const beforeEl = this._element.querySelector(`.form-details__bottom-container`);
    const filmDetailRatingObj = new FilmDetailsRating(posterSrcEl.src, this._alreadyWatched);
    filmDetailRatingObj.render(container, beforeEl);

  }

  render(containerEl) {
    containerEl.appendChild(this.getElement());
    this.alreadyWatchedReaction();
  }

  getTemplate() {
    let str = ``;
    this._genre.forEach((element) => {
      str = str + `<span class="film-details__genre">${element}, </span>`;
    });
    let comms = ``;
    this._comments.forEach((element) => {
      comms = comms + new Comment(element).getTemplate();
    });
    return `<section class="film-details" id = ${this.id}>
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${this._posterSrc}" alt="">

            <p class="film-details__age">18+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${this._title}</h3>
                <p class="film-details__title-original">Original: ${this._title}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${this._rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${this._director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${this._writers.join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${this._actors.join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${this.getDtDay(this._year) + ` ` + this.getDtMonth(this._year) + ` ` + this.getDtYear(this._year)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${this._duration}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${this._country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                ${str}
                </td>
              </tr>
            </table>

            <p class="film-details__film-description">
              ${this._description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" val = ${this._toWatch}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" val = ${this._alreadyWatched}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" val = ${this._isFavorite}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>

      <div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._comments.length}</span></h3>

          <ul class="film-details__comments-list">
          ${comms}
          </ul>

          <div class="film-details__new-comment">
            <div for="add-emoji" class="film-details__add-emoji-label">
            <img class="visually-hidden" src="" width="55" height="55" alt="emoji">
            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img class="film-details__emoji-label-img" src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img class="film-details__emoji-label-img" src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
              <label class="film-details__emoji-label" for="emoji-gpuke">
                <img class="film-details__emoji-label-img" src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img class="film-details__emoji-label-img" src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
  }


}
