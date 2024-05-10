// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // Import Provider
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './components/redux/store'; // Import your Redux store
import './index.css';

ReactDOM.render(
  <Provider store={store}> {/* Wrap your App component with Provider and pass the Redux store */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
