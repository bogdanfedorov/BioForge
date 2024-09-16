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
import { CollisionProvider } from './context/Collision.context';
import { useResizeWindow } from './hooks/useResizeWindow';
import { PlayerKeys } from './types';
import { Base } from './components/Base';
import { GameProvider } from './context/Game.context';

const GameComponent: FC = () => {
  const canvasRef = useResizeWindow();

  const keyMap: Array<KeyboardControlsEntry<PlayerKeys>> = [
    { name: PlayerKeys.North, keys: ['ArrowUp', 'w', 'W'] },
    { name: PlayerKeys.South, keys: ['ArrowDown', 's', 'S'] },
    { name: PlayerKeys.West, keys: ['ArrowLeft', 'a', 'A'] },
    { name: PlayerKeys.East, keys: ['ArrowRight', 'd', 'D'] },
  ];

  return (
    <>
      <UI />
      <KeyboardControls map={keyMap}>
        <Canvas ref={canvasRef}>
          <Sky sunPosition={[100, 20, 100]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />

          <EntityRenderer />

          <Box
            args={[1, 1, 1]}
            position={[0, 0, 0]}
            name="base"
            onClick={(test) => {
              console.log('cliecked', test.eventObject.name);
            }}
          />

          <Box
            args={[1, 1, 1]}
            scale={0.25}
            position={[1, 0, 0]}
            onClick={() => {
              console.log('cliecked');
            }}
          />
          <Plane args={[10, 10]} material-color="hotpink" />
          <Player />
        </Canvas>
      </KeyboardControls>
    </>
  );
};

const Game: FC = () => {
  return (
    <GameProvider>
      <CollisionProvider>
        <GameComponent />
      </CollisionProvider>
    </GameProvider>
  );
};

export default Game;
