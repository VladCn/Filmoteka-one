import noImg from './images/noImageAvailable.jpg';
import { settings, fetchResults, getImgPath} from './api';

const modalGen = document.querySelector(".modal")
const hiddenAct = document.querySelector(".hidden")
const modalBtn = document.querySelector(".modal__button")
const modalLink = document.querySelectorAll(".modal__link")
const modalRend =document.querySelector(".modal__rend")


modalBtn.addEventListener("click", actionBtn)

function actionBtn(e){

  modalGen.classList.add("hidden")
}

export async function handleMovieClick(event){
  let movieId = 0;

  for (let el of event.path) {

    if (el.classList?.contains('modal__link')) {

      movieId = el.dataset.id;
      console.log(movieId)
  }}

  const result = await fetchResults(`${settings.FULL_URL}${movieId}`)
  console.log(result)
  modalRend.innerHTML =`
      <img class='modal__img' src='${getImgPath(result.poster_path)}'>
      <p class='text__name'>${result.title}</p>
      <ul>
        <li>
          <p>Vote / Votes 7.3/1260</p>
        </li>
        <li>
          <p>Popularity 100.2</p>
        </li>
        <li>
          <p>Original Title A FISTFUL OF LEAD</p>
        </li>
        <li>
          <p>Genre Western </p>
        </li>
      </ul>
      <p>About </p>
      <p>Four of the West’s most infamous outlaws assemble to steal a huge stash of gold from the most corrupt settlement of the gold rush towns. But not all goes to plan one is killed and the other three escapes with bags of gold hide out in the abandoned gold mine where they happen across another gang of three – who themselves were planning to hit the very same bank! As tensions rise, things go from bad to worse as they realise the bags of gold are filled with lead... they’ve been double crossed – but by who and how?</p>
`
  // renderFilmsModal()
  modalGen.classList.remove("hidden")
}
//
//   function actionLink(e){
//     console.log(e)
//   }
