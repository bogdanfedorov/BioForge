import { FC } from 'react';

import { entitySizes } from '../config';
import { BaseEntityTypeProps } from './types';
import { useGame } from '../context/Game.context';

export const Base: FC<BaseEntityTypeProps> = ({ entity }) => {
  const game = useGame();

  const onClickHandler = () => {
    if (game) {
      game.setSelectedEntity(entity);
    }
  };

  return (
    <mesh
      name={entity.name}
      position={entity.position}
      onClick={onClickHandler}
    >
      <sphereGeometry
        args={[entitySizes.base, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]}
      />
      <meshStandardMaterial color="green" />
    </mesh>
  );
};
