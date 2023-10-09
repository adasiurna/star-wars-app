import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface CharacterProps {
  characterUrl: string;
  index: number;
}

const Character: React.FC<CharacterProps> = ({ characterUrl, index }) => {
  const character = useSelector(
    (state: RootState) => state.characters.characters[characterUrl]
  );

  if (!character) {
    return null;
  }

  return (
    <tr>
      <td>{index + 1}.</td>
      <td>{character.name}</td>
      <td><small>{character.birth_year}</small></td>
      <td><small>{character.gender}</small></td>
      <td><small>{character.mass} kg</small></td>
    </tr>
  );
};

export default Character;