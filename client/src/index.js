import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {BrowserRouter} from 'react-router-dom';
import './fonts/magilio-font/MagilioRegular-Yzv2O.ttf';
import './fonts/Wagon-free-personal-Use/Wagon-Free-Personal-Use/Wagon-Bold.otf'
import './fonts/Wagon-free-personal-Use/Wagon-Free-Personal-Use/Wagon-ExtraLight.otf'


ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);


