import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import './styles.scss'
import 'bootstrap/dist/css/bootstrap.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import configStore from './store/configStore';

const store = configStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));