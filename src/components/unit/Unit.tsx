import React, { FC, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

import { EntityType } from '../../types';
import { BaseEntityTypeProps } from '../types';

const entitySizes: Record<EntityType, number> = {
  base: 5,
  unit: 2,
};

export const Unit: FC<BaseEntityTypeProps> = ({ entity }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [targetPosition, setTargetPosition] = useState<THREE.Vector3 | null>(
    null,
  );

  const { camera, mouse, scene } = useThree();
  const unitRef = React.useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (targetPosition && unitRef.current) {
      const currentPosition = unitRef.current.position;
      const direction = new THREE.Vector3()
        .subVectors(targetPosition, currentPosition)
        .normalize();
      const distance = currentPosition.distanceTo(targetPosition);

      if (distance > 0.1) {
        unitRef.current.position.add(direction.multiplyScalar(0.1));
      } else {
        setTargetPosition(null);
      }
    }
  });

  const handleUnitClick = () => {
    setIsSelected(!isSelected);
  };

  const handleMapClick = (event: THREE.Event) => {
    if (!isSelected) return;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children);
    const planeIntersect = intersects.find(
      (intersect) => intersect.object.name === 'plane',
    );

    if (planeIntersect) {
      const newPosition = planeIntersect.point;
      setTargetPosition(new THREE.Vector3(newPosition.x, 0.5, newPosition.z)); // Устанавливаем новую цель
    }
  };

  return (
    <>
      <mesh
        name={entity.name}
        ref={unitRef}
        position={[2, 0.5, 2]}
        scale={[1, 0.5, 1]}
        onClick={handleUnitClick}
        onPointerMissed={handleMapClick}
      >
        <sphereGeometry args={[entitySizes.unit, 32, 32]} />
        <meshStandardMaterial
          color={isSelected ? 'blue' : 'pink'}
          wireframe={isSelected}
        />
      </mesh>

      {targetPosition && (
        <mesh
          name={`${name}_flag`}
          position={[targetPosition.x, 0, targetPosition.z]}
        >
          <cylinderGeometry args={[0.1, 0.1, 1, 32]} />
          <meshStandardMaterial color="red" />
          <mesh position={[0, 0.75, 0]}>
            <planeGeometry args={[0.5, 0.5]} />
            <meshStandardMaterial color="red" side={THREE.DoubleSide} />
          </mesh>
        </mesh>
      )}
    </>
  );
};
