import {
  Box,
  KeyboardControls,
  KeyboardControlsEntry,
  Plane,
  Sky,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { FC } from 'react';
import EntityRenderer from './components/EntityRenderer';
import { Player } from './components/Player';
import { UI } from './components/UI';
import { GameProvider, useGame } from './context/Game.context';
import { useResizeWindow } from './hooks/useResizeWindow';
import { PlayerKeys } from './types';

const GameComponent: FC = () => {
  const canvasRef = useResizeWindow();

  const keyMap: Array<KeyboardControlsEntry<PlayerKeys>> = [
    { name: PlayerKeys.North, keys: ['ArrowUp', 'w', 'W'] },
    { name: PlayerKeys.South, keys: ['ArrowDown', 's', 'S'] },
    { name: PlayerKeys.West, keys: ['ArrowLeft', 'a', 'A'] },
    { name: PlayerKeys.East, keys: ['ArrowRight', 'd', 'D'] },
  ];

  const game = useGame();
  const planeHandler = () => {
    if (game) {
      game.setSelectedEntity(null);
    }
  };

  return (
    <>
      <UI />
      <KeyboardControls map={keyMap}>
        <Canvas ref={canvasRef}>
          <Sky sunPosition={[100, 20, 100]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />

          <EntityRenderer />

          <Plane
            args={[10, 10]}
            material-color="green"
            onClick={planeHandler}
          />
          <Player />
        </Canvas>
      </KeyboardControls>
    </>
  );
};

const Game: FC = () => {
  return (
    <GameProvider>
      <GameComponent />
    </GameProvider>
  );
};

export default Game;
