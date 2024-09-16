import { useRef, useState } from 'react';
import { Vector3 } from 'three';

export const useMainGameProcess = () => {
  const canvasRef = useRef(null);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const entitys = [
    {
      type: EntityEnum.Base,
      name: 'base_1',
      position: new Vector3(0, 0.5, 0),
    },
  ];

  const MIN_DISTANCE_FROM_BASE = 5;

  const spawnEntity = (type: EntityEnum, name: string) => {
    const baseEntity = entitys.find(
      (entity) => entity.type === EntityEnum.Base,
    );

    if (!baseEntity) {
      console.error('Base not found! Cannot spawn units.');
      return;
    }

    const r1 = entitySizes.base() / 2;
    const r2 = entitySizes[type]() / 2;
    const cos = r2 / (r1 + r2);
    const angle = cos * 2 * Math.PI;
    const distance = MIN_DISTANCE_FROM_BASE + Math.random() * 5;
    const x = baseEntity.position.x + distance * Math.cos(angle);
    const z = baseEntity.position.z + distance * Math.sin(angle);
    const potentialPosition = new Vector3(x, 0.5, z);

    console.log('potentialPosition', potentialPosition);

    const newEntity = {
      type,
      name,
      position: potentialPosition,
      size: entitySizes[type](),
    };

    entitys.push(newEntity);
  };

  return { selectedEntity, setSelectedEntity, canvasRef, spawnEntity, entitys };
};
