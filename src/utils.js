import { getImgPath } from './api';

export const loadFromLocalStorage = key => {
  try {
    const serializedState = localStorage.getItem(key);

    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};


export function markupAdapter(itemListFromLocalStorage) {
  return itemListFromLocalStorage.map(
    ({ id, genres, poster_path, original_title, release_date, vote_average }) => ({
      id,
      genre_ids: genres.map(genre => genre.id),
      poster_path,
      original_title,
      release_date,
      vote_average,
    }),
  );
}

export function getGenres(genres, genre_ids){
  const newArr = [];
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

