const descrArr = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`];
const getItemQuantity = () => 1 + Math.floor(Math.random() * 3);

const getDescriptionStr = () => {
  const qant = getItemQuantity();
  let descrStr = ``;
  for (let i = 1; i <= qant; i++) {
    descrStr = descrStr + descrArr[Math.floor(Math.random() * 7)];
  }
  return descrStr;
};

export const getFilmData = () => (
  ({title: [`Когда по синеве морей`,
    `Зефир скользит и тихо веет`,
    `В ветрила гордых кораблей`,
    `И челны на волнах лелеет`,
    `Живет на утлом он челне`,
    `Мне моря сладкий шум милее`][Math.floor(Math.random() * 6)],
  posterSrc: [`/images/posters/made-for-each-other.png`,
    `/images/posters/popeye-meets-sinbad.png`,
    `/images/posters/the-dance-of-life.jpg`,
    `/images/posters/the-great-flamarion.jpg`,
    `/images/posters/sagebrush-trail.jpg`,
    `/images/posters/santa-claus-conquers-the-martians.jpg`,
    `/images/posters/the-man-with-the-golden-arm.jpg`] [Math.floor(Math.random() * 7)],
  description: getDescriptionStr(),
  year: [1929, 1933, 1955, 1964, 1936, 1970][1 + Math.floor(Math.random() * 6)],
  duration: [`1h 55m`, `54m`, `1h 59m`, `1h 21m`, `16m`][1 + Math.floor(Math.random() * 5)],
  genre: [`musical`, `drama`, `Comedy`, `Cartoon`][1 + Math.floor(Math.random() * 4)],
  rating: [8.3, 3.2, 9.0, 2.3, 6.3][1 + Math.floor(Math.random() * 5)],
  comments: `${[5, 89, 18, 465, 0][Math.floor(Math.random() * 5)]} comments`,
  isFavorite: Boolean(Math.floor(Math.random() * 2)),
  alreadyWatched: Boolean(Math.floor(Math.random() * 2)),
  toWatch: Boolean(Math.floor(Math.random() * 2))
  }));

export const getFilterData = (filmData) => {
  const filterData = [];
  const titles = [`ALL MOVIES`, `WATCHLIST`, `HISTORY`, `FAVORITES`];

  const updateFilterData = (title, filmObj) => {
    const isInArray = () => filterData.find((item) => item.title === title);
    const needToAdd = () => {
      switch (title) {
        case `ALL MOVIES` : return true;
        case `WATCHLIST`: return (filmObj.toWatch) ? true : false;
        case `HISTORY`: return (filmObj.alreadyWatched) ? true : false;
        case `FAVORITES`: return (filmObj.isFavorite) ? true : false;
        default: return false;
      }
    };
    const foundObj = isInArray();
    const additionNeeded = needToAdd();
    if (foundObj && additionNeeded) {
      foundObj.count++;
    }
    if (!foundObj && additionNeeded) {
      filterData.push({title, count: 1});
    }
    if (!foundObj && !additionNeeded) {
      filterData.push({title, count: 0});
    }

  };

  filmData.forEach((filmDataObj) => titles.forEach((title) => updateFilterData(title, filmDataObj)));

  return filterData;
};

const writersArr = [`Анни Шмидт`, `Джанни Родари`, `Василий Шукшин`, `Александр Пушкин`, `Алексей Толстой`, `Александр Грин`];
const actorsArr = [`Юрий Никулин`, `Анджелина Джоли`, `Евгений Миронов`, `Джулия Робертс`, `Олег Попов`, `Никита Михалков`];

const getWriters = () => {
  const qant = getItemQuantity();
  let writersTotal = [];
  for (let i = 1; i <= qant; i++) {
    writersTotal.push(writersArr[1 + Math.floor(Math.random() * 7)]);
  }
  return writersTotal;
};

const getActors = () => {
  const qant = getItemQuantity();
  let actorsTotal = [];
  for (let i = 1; i <= qant; i++) {
    actorsTotal.push(actorsArr[1 + Math.floor(Math.random() * 7)]);
  }
  return actorsTotal;
};

const getCommentsTotal = () => {
  const qant = getItemQuantity();
  let commentsTotal = [];
  for (let i = 1; i <= qant; i++) {
    commentsTotal.push(getComments());
  }
  return commentsTotal;
};


const getComments = () => ({
  emoji: [`/images/emoji/angry.png`,
    `/images/emoji/puke.png`,
    `/images/emoji/sleeping.png`,
    `/images/emoji/smile.png`,
    `/images/emoji/trophy.png`] [Math.floor(Math.random() * 7)],
  text: [`Когда по синеве морей`,
    `Зефир скользит и тихо веет`,
    `В ветрила гордых кораблей`,
    `И челны на волнах лелеет`,
    `Живет на утлом он челне`,
    `Мне моря сладкий шум милее`][Math.floor(Math.random() * 6)],
  author: [`Антон Иванов`, `Сергей Смирнов`, `Александр Антонов`, `Ирина Панина`, `Марина Толкачева`, `Марианна Арготикова`][Math.floor(Math.random() * 6)],
  daysAgo: [`2 days ago`, `yeaterday`, `today`, `столько не живут`, `a week ago`, `previous year`][Math.floor(Math.random() * 6)],
  isDeleted: Boolean(Math.floor(Math.random() * 2))
});

export const getPopupData = () => (
  ({title: [`Когда по синеве морей`,
    `Зефир скользит и тихо веет`,
    `В ветрила гордых кораблей`,
    `И челны на волнах лелеет`,
    `Живет на утлом он челне`,
    `Мне моря сладкий шум милее`][Math.floor(Math.random() * 6)],
  posterSrc: [`/public/images/posters/made-for-each-other.png`,
    `/images/posters/popeye-meets-sinbad.png`,
    `/images/posters/the-dance-of-life.jpg`,
    `/images/posters/the-great-flamarion.jpg`,
    `/images/posters/sagebrush-trail.jpg`,
    `/images/posters/santa-claus-conquers-the-martians.jpg`,
    `/images/posters/the-man-with-the-golden-arm.jpg`] [Math.floor(Math.random() * 7)],
  description: getDescriptionStr(),
  director: [`Юлий Цезарь`, `Иван Бунин`, `Сергей Есенин`, `Марина Цветаева`, `Виктория Токарева`, `Алексей Учитель`][1 + Math.floor(Math.random() * 6)],
  writers: getWriters(),
  actors: getActors(),
  releaseDate: [`1 Jan 1929`, `1 Feb 1933`, `1 March 1955`, `1 April 1964`, `1 May 1936`, `1 June 1970`][1 + Math.floor(Math.random() * 6)],
  runTime: [`1h 55m`, `54m`, `1h 59m`, `1h 21m`, `16m`][1 + Math.floor(Math.random() * 5)],
  country: [`USA`, `GERMANY`, `RUSSIA`, `FRANCE`, `AUSTRIA`, `SPAIN`][1 + Math.floor(Math.random() * 6)],
  genre: [`musical`, `drama`, `Comedy`, `Cartoon`][1 + Math.floor(Math.random() * 4)],
  rating: [8.3, 3.2, 9.0, 2.3, 6.3][1 + Math.floor(Math.random() * 5)],
  comments: getCommentsTotal(),
  isFavorite: Boolean(Math.floor(Math.random() * 2)),
  alreadyWatched: Boolean(Math.floor(Math.random() * 2)),
  toWatch: Boolean(Math.floor(Math.random() * 2))
  }));

