import React from 'react';
import PollAnswered from './PollAnswered';
import PollQuestions from './PollQuestions';
import { connect } from 'react-redux';

const Poll = ({answered, ...props}) => {
  const { question_id } = props.match.params;

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

function mapStateToProps({ auth }, props) {
  const { question_id } = props.match.params;

  return {
    answered: question_id in auth.users[auth.authedUser].answers
  }
}

export default connect(mapStateToProps)(Poll);
