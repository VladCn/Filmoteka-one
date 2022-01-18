import noImg from '../src/images/noImageAvailable.jpg';
import './pagination'
import './modal'

const mainSectionContainer = document.querySelector(`[data-id=main-container]`)
const settings = {
  BASE_URL : 'https://api.themoviedb.org/3/',
  API_KEY : '70fc5b973179caa818ae6622551a44d1',
  IMG_URL: 'https://image.tmdb.org/t/p/w500/',
  TRENDING_URL:`trending/movie/day`,
  GENRES_URL: `/genre/movie/list`,
}


const fetchResults = async(url) =>{
  try{
    const response = await fetch(`${settings.BASE_URL}${url}?api_key=${settings.API_KEY}`);
    const result = await response.json();
    return result
  }  catch (error) {
    console.log("Error", error)
  }
}
const getImgPath = imgPath => (!imgPath ? `${noImg}` : `${settings.IMG_URL}${imgPath}`);

window.addEventListener('load', async () => {
  const films = await fetchResults(settings.TRENDING_URL)
  const genres = await fetchResults(settings.GENRES_URL)
  renderFilms(films,genres)
});

function renderFilms(films,genres){
  console.log(films.results)


console.log(genres)
  const markup = films.results.map(({poster_path, title, genre_ids, release_date, id}) => `<li class='main__item'>
    <a class='modal__link' href='#' id=${id} onclick=clickF()>
    <img class='main__img' src=${getImgPath(poster_path)}>
      <div class='block__text'>
        <p class='text__name'>${title}</p>
        <p class='text__info'>${getGenres(genres, genre_ids)}<span> | ${getDate(release_date)}</span></p>
      </div>
      </a>
  </li>`
    ).join("");
  // const markupG = films.results.map((gengeItem) => gengeItem.genre_ids)
  // console.log(markupG)

  // const resultG = for()ifgetGenres(genres).includes(markupG)
  // console.log(resultG)

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
  // console.log(release_date)
  // const newSt = release_date.slice(0, 4)
  return newArr.join(", ")

  // const markGenres = genres.genres.map(genre => {
//      if(genre_ids.includes(Number(genre.id))){
//        return genre.name
//      }
//   }).filter(item => item)
// console.log(markGenres)
// return markGenres

}
function getDate(release_date){
  return release_date.slice(0, 4)
}