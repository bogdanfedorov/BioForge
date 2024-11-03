import { Cylinder } from '@react-three/drei';
import { FC, useMemo } from 'react';
import { useEntity } from '../../context/Entity.context';
import { useGame } from '../../context/Game.context';
import { Chloroformus } from './organs/Chloroformus';
import { Color, Euler } from 'three';

export const BioPlant: FC = () => {
  const game = useGame();
  const { entity } = useEntity();

  const onClickHandler = () => {
    if (game) {
      setTimeout(() => {
        game.setSelectedEntity(entity);
      });
    }
  };

  const stemColor = useMemo(() => new Color(0x2e8b57), []);

  return (
    <group
      name={entity.name}
      position={entity.position}
      onClick={onClickHandler}
      scale={0.5}
      rotation={new Euler(1, 0, 0)}
    >
      <Cylinder args={[0.2, 0.3, 2, 8]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color={stemColor} roughness={0.7} />
      </Cylinder>

      <Chloroformus />
    </group>
  );
};
