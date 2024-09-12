import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

function App() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.style.width = `${window.innerWidth}px`;
        canvasRef.current.style.height = `${window.innerHeight}px`;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      ref={canvasRef}
      style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}
    >
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <OrbitControls />
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="lightblue" />
        </mesh>
      </Canvas>
    </div>
  );
}

export default App;
