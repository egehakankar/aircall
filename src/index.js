import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

import './css/body.css';
import './css/app.css';
import './css/header.css';
import './css/calls.css';
import './css/bottom.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
);