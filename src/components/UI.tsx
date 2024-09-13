import React from 'react';

interface UIProps {
  getPlayerPosition: () => { x: number; y: number; z: number };
}

export const UI: React.FC<UIProps> = ({ getPlayerPosition }) => {
  const handleButtonClick = () => {
    const position = getPlayerPosition();
    console.log(`Player position: `, position.getPlayerPosition());
  };

  return (
    <div style={styles.container}>
      <button onClick={handleButtonClick} style={styles.button}>
        Показати позицію гравця
      </button>
    </div>
  );
};

const styles = {
  container: {
    position: 'absolute' as 'absolute',
    top: '20px',
    left: '20px',
    zIndex: 1,
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};
