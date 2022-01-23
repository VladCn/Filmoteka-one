import noImg from './images/noImageAvailable.jpg';

export const settings = {
  BASE_URL : 'https://api.themoviedb.org/3/',
  API_KEY : '70fc5b973179caa818ae6622551a44d1',
  IMG_URL: 'https://image.tmdb.org/t/p/w500/',
  TRENDING_URL:`trending/movie/day`,
  GENRES_URL: `/genre/movie/list`,
  FULL_URL: `movie/`,
  SEARCH_URL:`search/movie`,
}


export const fetchResults = async(url, search) =>{
  try{
    const fetchUrl = search ? `${settings.BASE_URL}${url}?api_key=${settings.API_KEY}&query=${search}` : `${settings.BASE_URL}${url}?api_key=${settings.API_KEY}`
    const response = await fetch(fetchUrl);
    const result = await response.json();
    return result
  }  catch (error) {
    console.log("Error", error)
  }
}

export const getImgPath = imgPath => (!imgPath ? `${noImg}` : `${settings.IMG_URL}${imgPath}`);