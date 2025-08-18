import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ToolBarComponent from './components/tool-bar/toolBar.component';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ToolBarComponent></ToolBarComponent>
    <App />
  </React.StrictMode>
);

reportWebVitals();
