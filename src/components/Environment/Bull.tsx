import { useFrame } from '@react-three/fiber';
import { FC, useRef } from 'react';
import { Color, Mesh } from 'three';

const Bull: FC<{ initialPosition: [number, number, number] }> = ({
  initialPosition,
}) => {
  const bullRef = useRef<Mesh>(null);
  const bullColor = new Color(0x8b4513); // Saddle brown

  useFrame((state) => {
    if (bullRef.current) {
      const time = state.clock.getElapsedTime();
      const x = Math.cos(time * 0.2) * 3 + initialPosition[0];
      const z = Math.sin(time * 0.2) * 3 + initialPosition[2];

      bullRef.current.position.set(x, initialPosition[1], z);
      bullRef.current.rotation.y = -time * 0.2 + Math.PI / 2;
    }
  });

  return (
    <mesh ref={bullRef} userData={{ type: 'resource', value: 4 }}>
      <boxGeometry args={[0.8, 0.6, 0.4]} />
      <meshStandardMaterial color={bullColor} />
      <mesh position={[0.4, 0.2, 0]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color={bullColor} />
      </mesh>
      <mesh position={[0.5, 0.3, 0.15]}>
        <cylinderGeometry
          args={[0.05, 0.05, 0.3, 8]}
          rotation={[0, 0, Math.PI / 2]}
        />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[0.5, 0.3, -0.15]}>
        <cylinderGeometry
          args={[0.05, 0.05, 0.3, 8]}
          rotation={[0, 0, Math.PI / 2]}
        />
        <meshStandardMaterial color="black" />
      </mesh>
    </mesh>
  );
};

export const BullHerd: FC<{ position: [number, number, number] }> = ({
  position,
}) => {
  return (
    <group position={position}>
      <Bull initialPosition={[0, 0, 0]} />
      <Bull initialPosition={[1, 0, 1]} />
      <Bull initialPosition={[-1, 0, -1]} />
    </group>
  );
};
