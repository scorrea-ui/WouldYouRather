import { GET_USERS, LOG_IN, LOG_OUT } from '../types/auth';
import { SAVE_QUESTION_ANSWER, SAVE_QUESTION } from '../types/questions';

export default function authReducer(state = {}, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.users,
      };
    case LOG_IN:
      return {
        ...state,
        authedUser: action.user,
      };
    case LOG_OUT:
      return {
        ...state,
        authedUser: null,
      };
    case SAVE_QUESTION_ANSWER:
      const { qid, answer, authedUser } = action.payload;
      return {
        ...state,
        users: {
          ...state.users,
          [authedUser]: {
            ...state.users[authedUser],
            answers: {
              ...state.users[authedUser].answers,
              [qid]: answer,
            },
          },
        },
      };
    case SAVE_QUESTION:
      const { question } = action;
      return {
        ...state,
        users: {
          ...state.users,
          [state.authedUser]: {
            ...state.users[state.authedUser],
            questions: state.users[state.authedUser].questions.concat(question.id),
          },
        },
      };
    default:
      return state;
  }
}
