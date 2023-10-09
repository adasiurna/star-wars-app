import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setFilms } from '../features/filmSlice';
import { setCharacter } from '../features/characterSlice';
import { IFilm } from '../models';
import { Spinner } from 'reactstrap';

const Films: React.FC = () => {
  const dispatch = useDispatch();
  const films = useSelector((state: RootState) => state.films.films);

  const [charactersLoading, setCharactersLoading] = useState(false);

  useEffect(() => {
    //fetching films from API and storing them in Redux
    async function fetchFilms() {
      try {
        const response = await fetch('https://swapi.dev/api/films/');
        const data = await response.json();
        dispatch(setFilms(data.results));
      } catch (err) {
        console.error('Error fetching films:', err);
      }
    }

    fetchFilms();
  }, [dispatch])

  const showPeople = async (film: IFilm) => {
    setCharactersLoading(true);

    //fetching people data for the film one by one
    for (const characterUrl of film.characters) {
      try {
        const response = await fetch(characterUrl);
        const characterData = await response.json();
        dispatch(setCharacter(characterData));
      } catch (err) {
        console.error('Error fetching people data:', err);
      }
    }

    setCharactersLoading(false);
  }

  if (films.length === 0 ) {
    return (
      <div className='p-5'><Spinner>Loading...</Spinner></div>
    )
  }

  return (
    <ul>
      {films.map(film => (
        <li key={film.release_date}>
          <strong>{film.title}</strong>
          <p>Release Date: {film.release_date}</p>
        </li>
      ))}
    </ul>
  )
}

export default Films
