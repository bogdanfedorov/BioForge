import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import { BioPlantEntiry } from '../components/BioPlant/BioPlant.entity';
import { Entity, NutrientsType } from '../types';

interface GameContextType {
  selectedEntity: Entity | null;
  setSelectedEntity: (entity: Entity | null) => void;
  resources: Record<NutrientsType, number>;
  addResource: (type: NutrientsType, amount: number) => void;
  removeResource: (type: NutrientsType, amount: number) => void;
  entities: Entity[];
  addEntity: (entity: Entity) => void;
  removeEntity: (entityId: string) => void;
  gameTime: number;
  incrementGameTime: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [resources, setResources] = useState<Record<NutrientsType, number>>({
    protein: 0,
    carbohydrates: 0,
    fats: 0,
  });
  const [entities, setEntities] = useState<Entity[]>([new BioPlantEntiry()]);
  const [gameTime, setGameTime] = useState(0);

  const addResource = useCallback((type: NutrientsType, amount: number) => {
    setResources((prev) => ({ ...prev, [type]: prev[type] + amount }));
  }, []);

  const removeResource = useCallback((type: NutrientsType, amount: number) => {
    setResources((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] - amount),
    }));
  }, []);

  const addEntity = useCallback((entity: Entity) => {
    setEntities((prev) => [...prev, entity]);
  }, []);

  const removeEntity = useCallback((entityId: string) => {
    setEntities((prev) => prev.filter((entity) => entity.id !== entityId));
  }, []);

  const incrementGameTime = useCallback(() => {
    setGameTime((prev) => prev + 1);
  }, []);

  const value = {
    selectedEntity,
    setSelectedEntity,
    resources,
    addResource,
    removeResource,
    entities,
    addEntity,
    removeEntity,
    gameTime,
    incrementGameTime,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
