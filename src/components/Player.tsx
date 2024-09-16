import { useKeyboardControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { Vector3 } from 'three';
import { PlayerKeys } from '../types';

const speed = 0.5;

export const Player = () => {
  const { camera } = useThree();
  const [, get] = useKeyboardControls<PlayerKeys>();

  useFrame((state) => {
    const { north, south, west, east } = get();
    const moveVector = new Vector3();

    if (north) moveVector.y += speed;
    if (south) moveVector.y -= speed;
    if (west) moveVector.x -= speed;
    if (east) moveVector.x += speed;

    camera.position.add(moveVector);
  });

  camera.rotation.x = Math.PI / 5;
  console.log(camera.rotation);
  return null;
};
