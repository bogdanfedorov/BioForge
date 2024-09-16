import { FC } from 'react';
import { BaseMenu } from './BaseMenu';
import { useGame } from '../../context/Game.context';

export const UI: FC = () => {
  const gameState = useGame();
  if (!gameState || !gameState.selectedEntity) {
    return null;
  }

  if (gameState.selectedEntity.type === 'base') {
    return <BaseMenu />;
  }

  return null;
};
