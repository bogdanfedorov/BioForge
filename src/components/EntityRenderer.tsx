import { FC } from 'react';
import { useCollision } from '../context/Collision.context';
import { EntityType } from '../types';
import { Base } from './Base';
import { BaseEntityTypeProps } from './types';
import { Unit } from './Unit';

const renderMap: Record<EntityType, FC<BaseEntityTypeProps>> = {
  unit: Unit,
  base: Base,
};

const EntityRenderer: FC = () => {
  const collision = useCollision();

  return (
    <>
      {collision?.entitys.map((entity) => {
        const RenderComponent = renderMap[entity.type];

        if (RenderComponent) {
          return <RenderComponent entity={entity} />;
        }
        return null;
      })}
    </>
  );
};

export default EntityRenderer;
