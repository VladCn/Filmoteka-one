import noImg from './images/noImageAvailable.jpg';
import { settings, fetchResults, getImgPath} from './api';

const modalGen = document.querySelector(".modal")
const hiddenAct = document.querySelector(".hidden")
const modalBtn = document.querySelector(".modal__button")
const modalLink = document.querySelectorAll(".modal__link")
const modalRend =document.querySelector(".modal__rend")
const modalContent =document.querySelector(".modal__content")

document.addEventListener("keydown", keyDownHandler)
modalBtn.addEventListener("click", actionBtn)
modalGen.addEventListener("click", actionBtn)
modalContent.addEventListener("click", (e) => e.stopPropagation())



function actionBtn(e){
  console.log(e.path)
  modalGen.classList.add("hidden")
}

function keyDownHandler(event){
  if(event.code === "Escape"){
    modalGen.classList.add("hidden")
  }
}

export async function handleMovieClick(event){
  let movieId = 0;

  for (let el of event.path) {
    if (el.classList?.contains('modal__link')) {
      movieId = el.dataset.id;
  }}

  if (movieId) {
    const result = await fetchResults(`${settings.FULL_URL}${movieId}`)
    console.log(result)
    modalRend.innerHTML =`
      <img class='modal__img' src='${getImgPath(result.poster_path)}'>
      <p class='modal__text-name'>${result.title}</p>
      <ul class='modal__link'>
        <li class='modal__item'>
          <p class='modal__item-text'>Vote / Votes </p>
          <p class='modal__item-text2'><span class='modal__item-vote'>${result.vote_average}</span> / <span class='modal__item-span2'>${result.vote_count}</span></p>
        </li>
        <li class='modal__item'>
          <p class='modal__item-text'>Popularity </p>
          <p class='modal__item-text2'>${((result.popularity)/10).toFixed(2)}</p>
        </li>
        <li class='modal__item'>
          <p class='modal__item-text'>Original Title </p>
          <p class='modal__item-text2'>${result.original_title}</p>
        </li>
        <li class='modal__item'>
          <p class='modal__item-text'>Genre </p>
          <p class='modal__item-text2'><span class='modal__genres'>${(result.genres).map(genre => genre.name).join(", ")}</span></p>
        </li>
      </ul>
      <p class='modal__title'>About </p>
      <p class='modal__overview'>${result.overview}</p>`
    // renderFilmsModal()
    modalGen.classList.remove("hidden")
  }

}
//
//   function actionLink(e){
//     console.log(e)
//   }
