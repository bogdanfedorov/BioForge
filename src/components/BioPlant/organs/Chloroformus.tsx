import { Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { FC, useEffect, useMemo, useRef } from 'react';
import { Color, Mesh } from 'three';
import { useEntity } from '../../../context/Entity.context';

export const Chloroformus: FC = () => {
  const { entity } = useEntity();
  const growthFactor = useMemo(() => Math.random() * 0.5 + 0.5, []);
  const sphereRef = useRef<Mesh<any> | null>(null);
  const bulbColor = useMemo(() => new Color(0x7cfc00), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const pulsate = Math.sin(t * 2) * 0.1 + 1.5;

    if (sphereRef.current) {
      sphereRef.current.scale.setScalar(0.5 * pulsate * growthFactor);
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      entity.energy?.add(1);
      console.log('Energy object:', entity.energy); // Log the entire energy object
      console.log('Current energy:', entity.energy?.current); // Log the specific value of current
    }, 3000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [entity]);

  return (
    <Sphere
      ref={sphereRef}
      scale={0.7}
      args={[0.3, 16, 16]}
      position={[0, 1.5, 0]}
    >
      <meshStandardMaterial
        color={bulbColor}
        emissive={bulbColor}
        emissiveIntensity={0.2}
        roughness={0.3}
      />
    </Sphere>
  );
};
