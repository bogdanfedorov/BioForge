import { OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function CameraControls() {
  const controlsRef = useRef<any>(null);
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
    if (!controlsRef.current) return;

    const speed = 0.1;
    const direction = new THREE.Vector3();

    if (keys.w)
      controlsRef.current.object.position.add(new THREE.Vector3(0, 0, -speed));
    if (keys.s)
      controlsRef.current.object.position.add(new THREE.Vector3(0, 0, speed));
    if (keys.a)
      controlsRef.current.object.position.add(new THREE.Vector3(-speed, 0, 0));
    if (keys.d)
      controlsRef.current.object.position.add(new THREE.Vector3(speed, 0, 0));

    // Lock camera tilt (rotationX)
    controlsRef.current.object.rotation.x = -Math.PI / 6; // 30 degrees downwards
  });

  return <OrbitControls ref={controlsRef} enablePan={false} enableZoom />;
}
