import noImg from '../src/images/noImageAvailable.jpg';
import './pagination'
import { handleMovieClick } from './modal'
import { settings, fetchResults, getImgPath} from './api';


const mainSectionContainer = document.querySelector(`[data-id=main-container]`)


window.addEventListener('load', async () => {
  const films = await fetchResults(settings.TRENDING_URL)
  const genres = await fetchResults(settings.GENRES_URL)
  renderFilms(films,genres)
});

mainSectionContainer.addEventListener("click", handleMovieClick)

function renderFilms(films,genres){
  console.log(films.results)


  // console.log(genres)
  const markup = films.results.map(({poster_path, title, genre_ids, release_date, id}) => `<li class='main__item'>
    <a class='modal__link' href='#' data-id=${id}>
    <img class='main__img' src=${getImgPath(poster_path)}>
      <div class='block__text'>
        <p class='text__name'>${title}</p>
        <p class='text__info'>${getGenres(genres, genre_ids)}<span> | ${getDate(release_date)}</span></p>
      </div>
      </a>
  </li>`
  ).join("");

  mainSectionContainer.innerHTML = `<ul class='main__list'>${markup}</ul>`

}



function getGenres(genres, genre_ids){
  const newArr = [];

  for( const arg of genres.genres){
    const incl = genre_ids.includes(Number(arg.id))
    if(incl){
      newArr.push(arg.name)
    }
  }

  if(newArr.length <= 2){
    return newArr.join(", ")
  } newArr.splice(2, 10, "Other")
  return newArr.join(", ")
}

function getDate(release_date){
  return release_date.slice(0, 4)
}