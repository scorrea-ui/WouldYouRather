import { Button, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { saveQuestionToUser } from '../../redux/actions/questions';
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    'marginTop': theme.spacing(4),
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
      textAlign: 'center',
    },
  },
}));

const AddQuestion = ({ dispatch, authedUser}) => {
  const history = useHistory();
  const classes = useStyles();
  const [questions, setQuestions] = useState({
    optionOneText: '',
    optionTwoText: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    setQuestions(() => {
      return {
        ...questions,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { optionOneText, optionTwoText } = questions;
    dispatch(
      saveQuestionToUser({
        author: authedUser,
        optionOneText,
        optionTwoText,
      })
    );
    history.push('/');
  };

  return (
    <Grid
      direction='column'
      container
      justify='center'
      alignItems='center'
      className={classes.root}
    >
      <h1>Create New Question</h1>
      <h2>Would you rather</h2>
      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <div className={classes.root}>
          <TextField
            id='outlined-basic'
            label='Enter Option One Text Here'
            variant='outlined'
            name='optionOneText'
            onChange={handleChange}
          />
          <p>or</p>
          <TextField
            id='outlined-basic'
            label='Enter Option Two Text Here'
            variant='outlined'
            name='optionTwoText'
            onChange={handleChange}
          />
          <Button type='submit' variant='contained' color='primary' disabled={questions.optionOneText === '' || questions.optionTwoText === ''}>
            Submit
          </Button>
        </div>
      </form>
    </Grid>
  );
};

function mapStateToProps({ auth }) {
  return {
    authedUser: auth.authedUser,
  };
}

export default connect(mapStateToProps)(AddQuestion)
