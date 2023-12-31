import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import rootReducers from './reducers';

const initialState = {};

const store = configureStore({
  reducer: rootReducers,
  devTools: true,
  middleware: [thunk],
  preloadedState: initialState
});

export default store;
