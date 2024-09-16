import { Suspense } from 'react';
import Game from '../Game';
import './App.css';

function App() {
  return (
    <div>
      <Suspense fallback={null}>
        <Game />
      </Suspense>
    </div>
  );
}

export default App;
