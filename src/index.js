import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SnackbarProvider, enqueueSnackbar } from 'notistack'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SnackbarProvider anchorOrigin={{vertical:'top', horizontal:'center'}}>
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);

