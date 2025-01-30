import React from 'react';
import Oneko from './Oneko.tsx';

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f3f4f6'
    }}>
      <h1 style={{
        fontSize: '5rem',
        padding: '1rem'
      }}>Move your mouse around!</h1>
      <Oneko />
    </div>
  );
}

export default App;
