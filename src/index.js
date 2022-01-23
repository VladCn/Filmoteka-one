import noImg from '../src/images/noImageAvailable.jpg';
import './pagination'
import { handleMovieClick } from './modal'
import { settings, fetchResults, getImgPath} from './api';


const mainSectionContainer = document.querySelector(`[data-id=main-container]`)
const inputJS = document.querySelector(".header__enter")
let genres = []

window.addEventListener('load', async () => {
  const films = await fetchResults(settings.TRENDING_URL)
  genres = await fetchResults(settings.GENRES_URL)

  renderFilms(films,genres)
});


inputJS.addEventListener("submit", (event) => inputGetInfo( event, genres))
mainSectionContainer.addEventListener("click", handleMovieClick)

async function  inputGetInfo(event, genres){
  event.preventDefault()
  const resultInput = event.currentTarget.elements.film.value
  const inputFilms = await fetchResults(settings.SEARCH_URL, resultInput)
  console.log(inputFilms)

  renderFilms(inputFilms,genres)
}

function renderFilms(films,genres){

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
console.log(genres, genre_ids)
  for ( const arg of genres.genres){
   const incl = genre_ids.includes(Number(arg.id))
    if(incl){
      newArr.push(arg.name)
    }
  }

  if(newArr.length <= 2){
    return newArr.join(", ")
  }
  newArr.splice(2, 10, "Other")
  return newArr.join(", ")
}

function getDate(release_date){
  return release_date.slice(0, 4)
}