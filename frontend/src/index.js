import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ProductRequestsProvider} from "./context/ProductRequestsContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProductRequestsProvider>
      <App />
    </ProductRequestsProvider>
  </React.StrictMode>
);