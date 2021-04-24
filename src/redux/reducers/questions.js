import {
  GET_QUESTIONS,
  SAVE_QUESTION,
  SAVE_QUESTION_ANSWER,
} from '../types/questions';

export default function questionsReducer(state = {}, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.questions,
      };
    case SAVE_QUESTION_ANSWER:
      const { qid, answer, authedUser } = action.payload;
      const obj = {
        ...state,
        questions: {
          ...state.questions,
          [qid]: {
            ...state.questions[qid],
            [answer]: {
              ...state.questions[qid][answer],
              votes: state.questions[qid][answer].votes.concat([authedUser]),
            },
          },
        },
      };
      return obj;
    case SAVE_QUESTION:
      const { question } = action;
      console.log(question.id, question);
      return {
        ...state,
        questions: {
          ...state.questions,
          [question.id]: {
            ...question,
          },
        },
      };
    default:
      return state;
  }
}

// User answers are an object
// User questions is an array
// questions is an objects
// We need to check if the authedUser has answered questions
// We need to check if the authedUser has not answered questions

/*
 *
 *  We get the authedUser by = users[authedUser]
 *
 *
 */
