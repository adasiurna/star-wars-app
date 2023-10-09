// src/components/Films.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardTitle, CardLink, Row, Col, Badge, Table, Button, Spinner } from 'reactstrap';
import { RootState } from '../store';
import { setFilms } from '../features/filmSlice';
import { setCharacter } from '../features/characterSlice';
import Character from './Character';
import { IFilm } from '../models';

const Films: React.FC = () => {
  const dispatch = useDispatch();
  const films = useSelector((state: RootState) => state.films.films);

  const [selectedFilm, setSelectedFilm] = useState<IFilm | null>(null);
  const [charactersLoading, setCharactersLoading] = useState(false);

  useEffect(() => {
    // fetching films from API and storing them in Redux
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
  }, [dispatch]);

  const showPeople = async (film: IFilm) => {
    setSelectedFilm(film);
    setCharactersLoading(true);

    // fetching people data for the film one by one
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
  };

  if (films.length === 0 ) {
    return (
      <div className='p-5'><Spinner>Loading...</Spinner></div>
    )
  }

  return (
    <div className="vh-100 d-flex flex-column">
      <div className='container-films'>      
        <div className="container mt-5">
          <div className="row flex-nowrap overflow-auto pb-4">
            {films.map((film) => (
              <div key={film.release_date} className="col-6 col-md-4 col-xl-3">
                <Card className='shadow-sm h-100'>
                  <CardBody className='flex-grow-20'>
                    <Row>
                      <Col xs="8" md="6" lg="8">
                        <CardTitle><strong>{film.title}</strong></CardTitle>
                        <small className='text-muted'>Release Date: {film.release_date}</small>
                      </Col>
                      <Col xs="4" md="6" lg="4">
                        <h1>
                          <Badge>{film.episode_id}</Badge>
                        </h1>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardBody>
                    <CardLink>
                      <Button color="primary"
                              onClick={() => showPeople(film)}
                              disabled={charactersLoading}>
                        Show People
                      </Button>
                    </CardLink>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
        {selectedFilm && (
          <div className='container container-scrollable mt-5 mb-3'>
            <Table className='border' striped>
              <thead>
                <tr>
                  <td className='text-center border-top' colSpan={5}>
                    <small>
                      People in <strong>{selectedFilm.title}</strong>:
                      { charactersLoading && <Spinner className='ms-2' size="sm">Loading...</Spinner>}
                    </small>
                  </td>
                </tr>
              </thead>
              <tbody>
              {selectedFilm.characters.map((characterUrl, index) => (
                <Character key={index} index={index} characterUrl={characterUrl} />
              ))}
              </tbody>
            </Table>
          </div>
        )}
    </div>
  );
};

export default Films;
