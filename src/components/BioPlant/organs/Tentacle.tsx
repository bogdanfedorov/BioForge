import { Circle } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { FC, useCallback, useRef, useState } from 'react';
import { Color, Mesh, Vector3 } from 'three';
import { useEntity } from '../../../context/Entity.context';
import { useGame } from '../../../context/Game.context';

const COLLECTION_RADIUS = 2;
const TENTACLE_COLOR = new Color(0x8a2be2); // Purple color for tentacle
const RADIUS_COLOR = new Color(0x00ff00); // Green color for radius circle

export const Tentacle: FC = () => {
  const { entity } = useEntity();
  const game = useGame();
  const tentacleRef = useRef<Mesh>(null);
  const [isSelected, setIsSelected] = useState(false);
  const [targetPosition, setTargetPosition] = useState<Vector3 | null>(null);
  const { camera, raycaster, scene } = useThree();

  const wriggle = useCallback((t: number) => {
    if (tentacleRef.current) {
      const wriggleAmount = Math.sin(t * 5) * 0.2;
      tentacleRef.current.rotation.x = wriggleAmount;
      tentacleRef.current.rotation.z = wriggleAmount;
    }
  }, []);

  const reach = useCallback((target: Vector3, progress: number) => {
    if (tentacleRef.current) {
      const startPosition = new Vector3(0, 1, 0);
      const currentPosition = new Vector3().lerpVectors(
        startPosition,
        target,
        progress,
      );
      tentacleRef.current.position.copy(currentPosition);
      tentacleRef.current.lookAt(target);
      tentacleRef.current.scale.y = 1 + progress * 2; // Stretch the tentacle
    }
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (targetPosition) {
      const progress = t % 1; // 0 to 1 over 1 second
      if (progress < 0.5) {
        reach(targetPosition, progress * 2);
      } else {
        reach(new Vector3(0, 1, 0), (progress - 0.5) * 2);
      }
      if (progress > 0.99) {
        setTargetPosition(null);
        if (game) {
          game.removeEntity(targetPosition.userData.id);
          entity.energy?.add(1);
          console.log(
            `Collected resource. New energy: ${entity.energy?.current}`,
          );
        }
      }
    } else {
      wriggle(t);
    }
  });

  const handleClick = useCallback(
    (event) => {
      if (isSelected) {
        raycaster.setFromCamera(event.pointer, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);
        const clickedEntity = intersects.find(
          (intersect) =>
            intersect.object.userData.type === 'resource' &&
            intersect.point.distanceTo(entity.position) <= COLLECTION_RADIUS,
        );
        if (clickedEntity) {
          setTargetPosition(clickedEntity.point);
        }
      } else {
        setIsSelected(true);
      }
    },
    [isSelected, raycaster, camera, scene, entity.position],
  );

  return (
    <group onClick={handleClick}>
      <mesh ref={tentacleRef} position={[0, 1, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
        <meshStandardMaterial color={TENTACLE_COLOR} roughness={0.5} />
      </mesh>
      {isSelected && (
        <Circle
          args={[COLLECTION_RADIUS, 32]}
          rotation-x={-Math.PI / 2}
          position-y={0.01}
        >
          <meshBasicMaterial color={RADIUS_COLOR} transparent opacity={0.2} />
        </Circle>
      )}
    </group>
  );
};
