import React from 'react';
import { createRoot } from 'react-dom/client'; // Импорт createRoot из ReactDOM

import { Provider } from 'react-redux';
import store from '/Users/temirhanmamaev/Documents/SystemVersioningFiles/my-app/src/store/store.js'; 
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App';

// Создаем пользовательскую тему Material-UI
const theme = createTheme({
  palette: {
    mode: 'light', // Вы можете установить 'dark' вместо 'light', если хотите темную тему
  },
});

// Используем createRoot вместо ReactDOM.render
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>
);
