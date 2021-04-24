import {
  GET_QUESTIONS,
  FILTER_QUESTIONS,
  SAVE_QUESTION_ANSWER,
  SAVE_QUESTION,
} from '../types/questions';

import { _saveQuestion, _saveQuestionAnswer } from '../../DATA';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const questions = (questions) => {
  return {
    type: GET_QUESTIONS,
    questions,
  };
};

export const filterQuestion = (payload) => {
  return {
    type: FILTER_QUESTIONS,
    payload,
  };
};

export const answerQuestions = (payload) => {
  return {
    type: SAVE_QUESTION_ANSWER,
    payload,
  };
};

export function saveQuestionAnswer(payload) {
  return async (dispatch) => {
    dispatch(showLoading());
    await _saveQuestionAnswer(payload);
    dispatch(answerQuestions(payload));
    dispatch(hideLoading());
  };
}

export const saveQuestion = (question) => {
  return {
    type: SAVE_QUESTION,
    question,
  };
};

export function saveQuestionToUser(payload) {
  return async (dispatch) => {
    dispatch(showLoading());
    const question = await _saveQuestion(payload);
    dispatch(saveQuestion(question));
    dispatch(hideLoading());
  };
}
