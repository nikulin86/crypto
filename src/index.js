import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, HashRouter  } from 'react-router-dom';
import CryptoContext from './Pages/CryptoContext/CryptoContext';
import "react-alice-carousel/lib/alice-carousel.css";
import { Provider } from 'react-redux';
import store from './store/index'
import ThemeContext from './Pages/ThemeContext/ThemeContext';


ReactDOM.render(
  <BrowserRouter >
    <CryptoContext>
      <ThemeContext>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeContext>
    </CryptoContext >
</BrowserRouter>
  ,
  document.getElementById('root')
);

