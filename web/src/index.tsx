import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Pede para o REACT mostrar em tela o arquivo App (App.tsx) dentro da div id root
// Quero que renderize o meu App dentro do getElementById root
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
