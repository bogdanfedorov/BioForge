import { createContext, FC, ReactNode, useContext } from 'react';
import { FullEntity } from '../types';

interface EntityContextType {
  entity: FullEntity;
}

const EntityContext = createContext<EntityContextType | undefined>(undefined);

interface EntityProviderProps {
  children: ReactNode;
  entity: FullEntity;
}
export const EntityProvider: FC<EntityProviderProps> = ({
  children,
  entity,
}) => {
  const value = { entity };
  return (
    <EntityContext.Provider value={value}>{children}</EntityContext.Provider>
  );
};

export const useEntity = (): EntityContextType => {
  const context = useContext(EntityContext);
  if (context === undefined) {
    throw new Error('useEntity must be used within a EntityProvider');
  }

  return context;
};
