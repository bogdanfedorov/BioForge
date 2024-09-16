import { Button } from '@nextui-org/button';
import { Vector3 } from 'three';
import { useCollision } from '../../context/Collision.context';
import { Entity } from '../../types';
import { UiItem } from './proto/UiItem';

export const BaseMenu = () => {
  const collision = useCollision();
  const position = new Vector3(1, 1, 1);

  const handleSpawnEntity = () => {
    if (collision && collision.canPlaceEntity(position, 'unit')) {
      collision.addEntity(new Entity('unit', position, `${Math.random()}`));
    } else {
      console.error('Cannot place entity here, collision detected.');
    }
    position.x += 1;
  };

  return (
    <UiItem className="h-7">
      <h1>Base menu</h1>
      <Button onClick={handleSpawnEntity}>Spawn Ertity</Button>
    </UiItem>
  );
};
