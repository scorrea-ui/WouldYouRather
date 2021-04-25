import React from 'react';
import { connect } from 'react-redux';
import { Grid, makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
  },
  full: {
    width: '100%',
  },
  img: {
    maxWidth: '120px',
  },
  alignCenter: {
    textAlign: 'center',
  },
}));

const PollAnswered = ({ question, users, authedUser }) => {
  const classes = useStyles();
  const allVotes =
    question.optionOne.votes.length + question.optionTwo.votes.length;
  const optionOneVotes = question.optionOne.votes.length;
  const optionTwoVotes = question.optionTwo.votes.length;
  return (
    <Grid
      container
      justify='center'
      alignItems='center'
      className={classes.root}
    >
      <Grid item xs={12}>
        <h1 className={classes.alignCenter}>
          Asked by {users[question.author].name}
        </h1>
      </Grid>
      <Paper className={classes.full}>
        <Grid container justify='center' alignItems='center'>
          <Grid item xs={12} md={4} className={classes.alignCenter}>
            <img
              className={classes.img}
              src={users[question.author].avatarURL}
              alt=''
            ></img>
          </Grid>
          <Grid item xs={12} md={8}>
            <h2>Results</h2>
            <div
              className={`c-results ${
                question.optionOne.votes.includes(authedUser)
                  ? 'voted'
                  : 'c-results'
              }`}
            >
              <p>{question.optionOne.text}</p>
              <p>{((optionOneVotes / allVotes) * 100).toFixed(2)}% of votes</p>
              <p>
                {optionOneVotes} out of {allVotes} votes
              </p>
            </div>
            <div
              className={`c-results ${
                question.optionTwo.votes.includes(authedUser)
                  ? 'voted'
                  : 'c-results'
              }`}
            >
              <p>{question.optionTwo.text}</p>
              <p>{((optionTwoVotes / allVotes) * 100).toFixed(2)}% of votes</p>
              <p>
                {optionTwoVotes} out of {allVotes} votes
              </p>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

function mapStateToProps({ questions, auth }, { question_id }) {
  return {
    question: questions.questions[question_id],
    users: auth.users,
    authedUser: auth.authedUser,
  };
}

export default connect(mapStateToProps)(PollAnswered);
