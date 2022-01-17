import noImg from '../src/images/noImageAvailable.jpg';
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
  getGenres(genres)
console.log(genres)
  const markup = films.results.map(({poster_path, title, id}) => `<li class='main__item'>
    <img class='main__img' src=${getImgPath(poster_path)}>
      <div class='block__text'>
        <p class='text__name'>${title}</p>
        <p class='text__info'>${id}</p>
      </div>
  </li>`
    ).join("");


  mainSectionContainer.innerHTML = `<ul class='main__list'>${markup}</ul>`


}
function getGenres(genres){
  const markGenres = genres.genres.map(genre => genre.id)
  console.log(markGenres)

}




