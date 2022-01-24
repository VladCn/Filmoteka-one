import noImg from '../src/images/noImageAvailable.jpg';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { handleMovieClick } from './modal'
import { settings, fetchResults, getImgPath} from './api';
import { loadFromLocalStorage, markupAdapter, getGenres } from './utils';


const watchedBtn = document.querySelector('#library__btn-watch');
const queueBtn = document.querySelector('#library__btn-queue');
const mainSectionContainer = document.querySelector(`[data-id=main-container]`)
const errorText = document.querySelector(".error-text")
const inputJS = document.querySelector(".header__enter")
export let genres = []


window.addEventListener('load', async () => {
  const films = await fetchResults(settings.TRENDING_URL)
  genres = await fetchResults(settings.GENRES_URL)

  renderFilms(films.results,genres)
});

if(watchedBtn){
  watchedBtn.addEventListener('click', () => renderFilms(markupAdapter(loadFromLocalStorage('watched')), genres))
}

if(queueBtn){
  queueBtn.addEventListener('click', () => renderFilms(markupAdapter(loadFromLocalStorage('queue')), genres))
}

if(inputJS){
  inputJS.addEventListener("submit", (event) => inputGetInfo( event, genres))
}
mainSectionContainer.addEventListener("click", handleMovieClick)

async function  inputGetInfo(event, genres, enterInput){

  event.preventDefault()
  const resultInput = event.currentTarget.elements.film.value
  inputJS.reset();

  const inputFilms = await fetchResults(settings.SEARCH_URL, resultInput)
  if(!inputFilms.total_results){
    return errorText.classList.remove("hidden")
  }
  errorText.classList.add("hidden")
  renderFilms(inputFilms.results,genres)

  // if(resultInput.length > 0){
  //   console.log(resultInput)
  // }
}

export function renderFilms(films,genres){
  const markup = films.map(({poster_path, title, genre_ids, release_date, id}) => `<li class='main__item'>
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

function getDate(release_date){
  if(!release_date){
    return
  }

  return release_date.slice(0, 4)
}

