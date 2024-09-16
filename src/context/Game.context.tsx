import React, { createContext, useContext, useState } from 'react';
import { Entity } from '../types';

interface GameContextType {
  selectedEntity: Entity | null;
  setSelectedEntity: (entity: Entity | null) => void;
}

const GameContext = createContext<GameContextType | null>(null);

export const useGame = () => {
  return useContext(GameContext);
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);

  return (
    <GameContext.Provider value={{ selectedEntity, setSelectedEntity }}>
      {children}
    </GameContext.Provider>
  );
};
