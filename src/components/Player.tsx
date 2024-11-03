import { useKeyboardControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { PlayerKeys } from '../types';
import { useMemo } from 'react';

export const Player = () => {
  const { camera } = useThree();
  const [, get] = useKeyboardControls<PlayerKeys>();

  const speed = useMemo(() => 0.05, []);

  useFrame(() => {
    const { north, south, west, east } = get();
    const moveVector = new Vector3();

    if (north) moveVector.y += speed;
    if (south) moveVector.y -= speed;
    if (west) moveVector.x -= speed;
    if (east) moveVector.x += speed;

    camera.position.add(moveVector);
  });

  camera.rotation.x = Math.PI / 5;

  return null;
};
