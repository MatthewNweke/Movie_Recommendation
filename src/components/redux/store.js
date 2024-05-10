import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/movieReducer';
import axios from 'axios';

// Custom middleware to handle async actions
const asyncMiddleware = store => next => action => {
  if (typeof action === 'function') {
    return action(store.dispatch);
  }
  return next(action);
};

const store = createStore(rootReducer, applyMiddleware(asyncMiddleware));

export default store;
