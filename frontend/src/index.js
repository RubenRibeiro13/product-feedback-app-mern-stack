import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ProductRequestsProvider} from "./context/ProductRequestsContext";
import {AuthContextProvider} from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProductRequestsProvider>
        <App />
      </ProductRequestsProvider>
    </AuthContextProvider>
  </React.StrictMode>
);