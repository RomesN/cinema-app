import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducers from './reducers';

const initialState = {};
const middleware = [thunk];

export const store = configureStore({
  reducer: rootReducers,
  devTools: true,
  middleware: composeWithDevTools(applyMiddleware(...middleware)),
  preloadedState: initialState
});
