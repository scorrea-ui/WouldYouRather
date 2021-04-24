import { _getUsers, _getQuestions } from '../../DATA';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { users } from './auth';
import { questions } from './questions';

export function getInitialData() {
  return async (dispatch) => {
    dispatch(showLoading());
    const allUsers = await _getUsers();
    const allQuestions = await _getQuestions();
    dispatch(hideLoading());
    dispatch(users(allUsers));
    dispatch(questions(allQuestions));
  };
}
