import { useFrame } from '@react-three/fiber';
import { FC, useRef } from 'react';
import { Mesh, Color, Vector3 } from 'three';

export const FlyingBird: FC<{ initialPosition: [number, number, number] }> = ({
  initialPosition,
}) => {
  const birdRef = useRef<Mesh>(null);
  const birdColor = new Color(0x4169e1); // Royal blue
  const flightRadius = 5;
  const flightHeight = 5;

  useFrame((state) => {
    if (birdRef.current) {
      const time = state.clock.getElapsedTime();
      const x = Math.cos(time * 0.5) * flightRadius;
      const z = Math.sin(time * 0.5) * flightRadius;
      const y = Math.sin(time) * 0.5 + flightHeight;

      birdRef.current.position.set(x, y, z);
      birdRef.current.rotation.y = -time * 0.5 + Math.PI / 2;

      // Flap wings
      birdRef.current.scale.y = Math.sin(time * 10) * 0.2 + 0.8;
    }
  });

  return (
    <group position={initialPosition}>
      <mesh ref={birdRef} userData={{ type: 'resource', value: 3 }}>
        <coneGeometry args={[0.2, 0.5, 4]} />
        <meshStandardMaterial color={birdColor} />
      </mesh>
    </group>
  );
};
