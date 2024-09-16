import React, { createContext, useContext, useState } from 'react';
import { Vector3 } from 'three';
import { Entity, EntityType } from '../types';
import { entitySizes } from '../config';

type CollisionContextType = {
  entitys: Array<Entity>;
  canPlaceEntity: (position: Vector3, entityType: EntityType) => boolean;
  updateEntities: (entitys: Array<Entity>) => void;
  addEntity: (entity: Entity) => void;
};

const CollisionContext = createContext<CollisionContextType | null>(null);

export const useCollision = () => {
  return useContext(CollisionContext);
};

export const CollisionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [entitys, setEntitys] = useState<Entity[]>([]);

  const canPlaceEntity = (position: Vector3, entityType: EntityType) => {
    const newSize = entitySizes[entityType];
    for (let entity of entitys) {
      const size = entitySizes[entity.type];
      const distance = position.distanceTo(entity.position);
      if (distance < newSize / 2 + size / 2) {
        return false;
      }
    }
    return true;
  };

  const updateEntities = (newEntities: Entity[]) => {
    setEntitys(newEntities);
  };

  const addEntity = (entity: Entity) => {
    updateEntities([...entitys, entity]);
  };

  return (
    <CollisionContext.Provider
      value={{ entitys, canPlaceEntity, updateEntities, addEntity }}
    >
      {children}
    </CollisionContext.Provider>
  );
};
