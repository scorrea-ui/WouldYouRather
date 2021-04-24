import React from 'react';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(8),
  },
  img: {
    maxWidth: '120px',
    marginBottom: theme.spacing(2),
  },
  alignCenter: {
    textAlign: 'center',
    margin: '0 auto',
  },
  wrap: {
    width: '100%',
    marginBottom: theme.spacing(4),
    padding: theme.spacing(4)
  },
}));

const Leaderboard = ({ sortedUsers }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      justify='center'
      alignItems='center'
      className={classes.root}
    >
      <h1>Leaderboard</h1>
      {sortedUsers.map((user) => {
        const answeredQuestions = Object.keys(user.answers).length;
        const questionsAsked = user.questions.length;
        return (
          <Paper className={classes.wrap} elevation={2}>
            <Grid container justify='center' alignItems='center' key={user.id}>
              <Grid item xs={12} md={4} className={classes.alignCenter}>
                <img
                  src={user.avatarURL}
                  alt={user.name}
                  className={classes.img}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <h3>{user.name}</h3>
                <p>Answered Questions: {answeredQuestions}</p>
                <p>Created Questions: {questionsAsked}</p>
              </Grid>
              <Grid item xs={12} md={4}>
                <p>Score</p>
                <p>{answeredQuestions + questionsAsked}</p>
              </Grid>
            </Grid>
          </Paper>
        );
      })}
    </Grid>
  );
};

function mapStateToProps({ auth }) {
  const users = Object.keys(auth.users).map((key) => auth.users[key]);
  users.sort(
    (a, b) =>
      b.questions.length +
      Object.keys(b.answers).length -
      (a.questions.length + Object.keys(a.answers).length)
  );
  return {
    sortedUsers: users,
  };
}

export default connect(mapStateToProps)(Leaderboard);
