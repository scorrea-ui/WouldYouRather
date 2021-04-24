import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  img: {
    maxWidth: '120px',
  },
  alignCenter: {
    textAlign: 'center',
  },
  button: {
    width: '80%',
  },
}));

const QuestionTab = ({ question, user, answered }) => {
  const classes = useStyles();

  return (
    <Grid container justify='center' alignItems='center'>
      <Grid item xs={12} md={4} className={classes.alignCenter}>
        <p>{user.name} asks</p>
        <img className={classes.img} src={user.avatarURL} alt=''></img>
      </Grid>
      <Grid item xs={12} md={8}>
        <h3>Would you rather</h3>
        <p>...{question.optionOne.text}...</p>
        <Link
          to={`${answered ? '/results/' : '/questions/'}` + question.id}
          variant='contained'
          color='primary'
          className={classes.button}
        >
          View Poll
        </Link>
      </Grid>
    </Grid>
  );
};

export default QuestionTab;
