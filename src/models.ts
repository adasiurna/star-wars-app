export interface IFilm {
  title: string;
  characters: string[];
  release_date: string;
  episode_id: number;
}

export interface ICharacter {
  name: string;
  birth_year: string;
  gender: string;
  mass: string;
  url: string;
}