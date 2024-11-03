import { FC } from 'react';
import { useGame } from '../context/Game.context';
import { BaseEntityTypeProps, EntityType } from '../types';
import { BioPlant } from './BioPlant';
import { EntityProvider } from '../context/Entity.context';

const renderMap: Record<EntityType, FC<BaseEntityTypeProps>> = {
  storage: BioPlant,
  bioPlant: BioPlant,
  harvester: BioPlant,
  processor: BioPlant,
};

const EntityRenderer: FC = () => {
  const { entities } = useGame();

  return (
    <>
      {entities.map((entity) => {
        if (entity.renderModel) {
          return (
            <EntityProvider entity={entity} key={entity.id}>
              <entity.renderModel />;
            </EntityProvider>
          );
        }
        return null;
      })}
    </>
  );
};

export default EntityRenderer;
