export const Base = () => {
  return (
    <mesh position={[0, 0.5, 0]}>
      <sphereGeometry args={[5, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
};
