import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef } from 'react';
import { UI } from '../components/UI';
import { CameraControls } from '../components/CameraControls';
import { Plane } from '../components/Plane';

function App() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const cameraControlsRef = useRef<any>(null);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.style.width = `${window.innerWidth}px`;
        canvasRef.current.style.height = `${window.innerHeight}px`;
      }
    };
    handleResize(); // Set size initially
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      ref={canvasRef}
      style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}
    >
      <Suspense fallback={null}>
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />

          <CameraControls ref={cameraControlsRef} />
          <Plane />

          <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="blue" />
          </mesh>
        </Canvas>
        <UI getPlayerPosition={() => cameraControlsRef.current} />
      </Suspense>
    </div>
  );
}

export default App;
