import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authReducer from './auth';
import questionsReducer from './questions';

export default combineReducers({
  loadingBar: loadingBarReducer,
  auth: authReducer,
  questions: questionsReducer,
});
