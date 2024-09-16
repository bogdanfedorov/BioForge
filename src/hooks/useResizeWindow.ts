import { LegacyRef, useEffect, useRef } from 'react';

export const useResizeWindow = (): LegacyRef<HTMLCanvasElement> => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef) {
      const handleResize = () => {
        if (canvasRef.current) {
          canvasRef.current.style.width = `${window.innerWidth}px`;
          canvasRef.current.style.height = `${window.innerHeight}px`;
        }
      };
      handleResize();
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, [canvasRef]);

  return canvasRef;
};
