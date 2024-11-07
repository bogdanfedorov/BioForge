import { useFrame } from '@react-three/fiber';
import { FC, useRef } from 'react';
import { Mesh, Color } from 'three';

export const Tree: FC<{ position: [number, number, number] }> = ({
  position,
}) => {
  const treeRef = useRef<Mesh>(null);
  const trunkColor = new Color(0x8b4513); // Saddle brown
  const leafColor = new Color(0x228b22); // Forest green

  useFrame((state) => {
    if (treeRef.current) {
      treeRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group position={position} userData={{ type: 'resource', value: 5 }}>
      <mesh position={[0, 1, 0]} ref={treeRef}>
        <cylinderGeometry args={[0.2, 0.3, 2, 8]} />
        <meshStandardMaterial color={trunkColor} />
      </mesh>
      <mesh position={[0, 2.5, 0]}>
        <coneGeometry args={[1, 2, 8]} />
        <meshStandardMaterial color={leafColor} />
      </mesh>
    </group>
  );
};
