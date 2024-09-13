// src/components/CameraControls.tsx
import { useFrame, useThree } from '@react-three/fiber';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import * as THREE from 'three';

export const CameraControls = forwardRef((_, ref) => {
  const { camera } = useThree();
  const [keys, setKeys] = useState({
    w: false,
    a: false,
    s: false,
    d: false,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'w') setKeys((prev) => ({ ...prev, w: true }));
      if (event.key === 'a') setKeys((prev) => ({ ...prev, a: true }));
      if (event.key === 's') setKeys((prev) => ({ ...prev, s: true }));
      if (event.key === 'd') setKeys((prev) => ({ ...prev, d: true }));
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'w') setKeys((prev) => ({ ...prev, w: false }));
      if (event.key === 'a') setKeys((prev) => ({ ...prev, a: false }));
      if (event.key === 's') setKeys((prev) => ({ ...prev, s: false }));
      if (event.key === 'd') setKeys((prev) => ({ ...prev, d: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Update camera position based on keypress
  useFrame(() => {
    const speed = 0.5;
    const moveVector = new THREE.Vector3();

    if (keys.w) moveVector.z -= speed; // Move forward
    if (keys.s) moveVector.z += speed; // Move backward
    if (keys.a) moveVector.x -= speed; // Move left
    if (keys.d) moveVector.x += speed; // Move right

    camera.position.add(moveVector); // Двигаем камеру напрямую
  });

  // Set initial camera position and rotation (fixed angle)
  useEffect(() => {
    camera.position.set(0, 50, 50); // Устанавливаем высоту и начальное положение камеры
    camera.rotation.set(-Math.PI / 4, 0, 0); // Устанавливаем наклон камеры (фиксируем угол)
  }, [camera]);

  // Expose camera position to parent component
  useImperativeHandle(ref, () => ({
    getPlayerPosition: () => ({
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
    }),
  }));

  return null; // Компонент не возвращает JSX
});
