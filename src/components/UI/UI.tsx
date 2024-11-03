import { FC } from 'react';
import { useGame } from '../../context/Game.context';
import { EntityProvider } from '../../context/Entity.context';

export const UI: FC = () => {
  const { selectedEntity } = useGame();

  return (
    <>
      {selectedEntity && selectedEntity.renderMenu && (
        <section className="absolute z-50 bottom-0">
          <EntityProvider entity={selectedEntity}>
            <selectedEntity.renderMenu />
          </EntityProvider>
        </section>
      )}
    </>
  );
};
