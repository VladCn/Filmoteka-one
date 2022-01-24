import noImg from './images/noImageAvailable.jpg';
import { settings, fetchResults, getImgPath} from './api';


const modalGen = document.querySelector(".modal")
const hiddenAct = document.querySelector(".hidden")
const modalBtn = document.querySelector(".modal__button")
const modalLink = document.querySelectorAll(".modal__link")
const modalRend = document.querySelector(".modal__rend")
const modalContent = document.querySelector(".modal__content")

modalBtn.addEventListener("click", handleCloseModal)
modalGen.addEventListener("click", handleCloseModal)
modalContent.addEventListener("click", (e) => e.stopPropagation())


function handleCloseModal(e){
  modalGen.classList.add("hidden")
  document.removeEventListener("keydown", keyDownHandler)
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
    document.addEventListener("keydown", keyDownHandler);

    modalRend.innerHTML =`
      <div class='modal__wrap-pic'>
            <img class='modal__img' src='${getImgPath(result.poster_path)}'>
      </div>
      <div class='modal__wrap-cont'>
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
      <p class='modal__overview'>${result.overview}</p>
            <div class='buttons_item'>
        <button class='buttons_item__btn' id='watched'>add to Watched</button>
        <button class='buttons_item__btn' id='queue'>add to queue</button>
      </div>
      </div>
`
    // renderFilmsModal()
    modalGen.classList.remove("hidden")

    const watchBtn = document.querySelector("#watched")
    watchBtn.addEventListener("click", () => {
      const prevSettings = localStorage.getItem("watched")
      if(prevSettings){
        const parsedSettings = JSON.parse(prevSettings)
       const isIncludeInLS = parsedSettings.some(({id}) => result.id === id)
        if(!isIncludeInLS){
          return localStorage.setItem("watched", JSON.stringify([...parsedSettings, result]))
        }
      }
      localStorage.setItem("watched", JSON.stringify([result]))
    })
    const queueBtn = document.querySelector("#queue")
    queueBtn.addEventListener("click", () => {
      const prevSettings = localStorage.getItem("queue")
      if(prevSettings){
        const parsedSettings = JSON.parse(prevSettings)
        const isIncludeInLS = parsedSettings.some(({id}) => result.id === id)
        if(!isIncludeInLS){
          return localStorage.setItem("queue", JSON.stringify([...parsedSettings, result]))
        }
      }
      localStorage.setItem("queue", JSON.stringify([result]))
    })
  }

}


