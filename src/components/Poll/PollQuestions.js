import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, makeStyles } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { saveQuestionAnswer } from '../../redux/actions/questions';
import { Redirect } from 'react-router';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
  img: {
    maxWidth: '120px',
  },
  alignCenter: {
    textAlign: 'center',
  },
}));

const PollQuestions = ({
  question,
  users,
  dispatch,
  authedUser,
  id,
  history,
}) => {
  const classes = useStyles();

  const [value, setValue] = useState({
    value: '',
    name: '',
  });

  const handleChange = (event) => {
    setValue({
      value: event.target.value,
      name: event.target.name,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      saveQuestionAnswer({
        authedUser,
        qid: id,
        answer: value.name,
      })
    );
  };

  if (question === undefined) {
    return <Redirect to='/404' />;
  }

  return (
    <Grid container justify='center' alignItems='center'>
      <Grid item xs={12}>
        <h1 className={classes.alignCenter}>
          {users[question.author].name} asks
        </h1>
      </Grid>
      <Grid container justify='center' alignItems='center'>
        <Grid item xs={12} md={4} className={classes.alignCenter}>
          <img
            className={classes.img}
            src={users[question.author].avatarURL}
            alt=''
          ></img>
        </Grid>
        <Grid item xs={12} md={8}>
          <div>
            <h3>Would you rather...</h3>
            <form onSubmit={handleSubmit}>
              <FormControl component='fieldset'>
                <RadioGroup value={value.value} onChange={handleChange}>
                  <FormControlLabel
                    name='optionOne'
                    value={question.optionOne.text}
                    control={<Radio />}
                    label={question.optionOne.text}
                  />
                  <FormControlLabel
                    name='optionTwo'
                    value={question.optionTwo.text}
                    control={<Radio />}
                    label={question.optionTwo.text}
                  />
                </RadioGroup>
                <Button
                  type='submit'
                  variant='outlined'
                  color='primary'
                  className={classes.button}
                >
                  Submit
                </Button>
              </FormControl>
            </form>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

function mapStateToProps({ questions, auth }, { question_id }) {
  return {
    id: question_id,
    question: questions.questions[question_id],
    users: auth.users,
    authedUser: auth.authedUser,
  };
}

export default connect(mapStateToProps)(PollQuestions);
