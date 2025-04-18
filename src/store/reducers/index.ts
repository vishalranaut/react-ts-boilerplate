import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import pageReducer from './pageSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  page: pageReducer,
});

export default rootReducer;