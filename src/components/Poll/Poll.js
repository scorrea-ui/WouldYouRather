import React from 'react';
import PollAnswered from './PollAnswered';
import PollQuestions from './PollQuestions';

const Poll = (props) => {
  const { question_id } = props.match.params;
  const { answered } = props.location.state;

  return (
    <>
      {answered ? (
        <PollAnswered question_id={question_id} />
      ) : (
        <PollQuestions question_id={question_id} />
      )}
    </>
  );
};

export default Poll;
