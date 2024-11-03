import { FC } from 'react';
import { Sphere } from '@react-three/drei';
import { useGame } from '../../context/Game.context';
import { BaseEntityTypeProps } from '../types';

export const Base: FC<BaseEntityTypeProps> = ({ entity }) => {
  const game = useGame();

  const onClickHandler = () => {
    if (game) {
      game.setSelectedEntity(entity);
    }
  };

  return (
    <Sphere
      name={entity.name}
      position={entity.position}
      onClick={onClickHandler}
      scale={0.5}
      material-color="hotpink"
    ></Sphere>
  );
};
