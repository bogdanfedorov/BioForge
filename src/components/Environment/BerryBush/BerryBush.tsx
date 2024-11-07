import { FC, useRef } from 'react';
import { Color, Mesh } from 'three';

export const BerryBush: FC<{ position: [number, number, number] }> = ({
  position,
}) => {
  const bushRef = useRef<Mesh>(null);
  const berryColor = new Color(0x8b0000);
  const leafColor = new Color(0x228b22);

  return (
    <group position={position}>
      <mesh ref={bushRef} userData={{ type: 'resource', value: 2 }}>
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshStandardMaterial color={leafColor} />
      </mesh>
      {[...Array(5)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.random() * 0.4 - 0.2,
            Math.random() * 0.4 - 0.2,
            Math.random() * 0.4 - 0.2,
          ]}
        >
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color={berryColor} />
        </mesh>
      ))}
    </group>
  );
};
