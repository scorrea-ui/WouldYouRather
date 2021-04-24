import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../Tabs/TabPanel';
import QuestionTab from './Tab';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
  },
  img: {
    maxWidth: '120px',
  },
  item: {
    marginBottom: theme.spacing(4),
  },
  alignCenter: {
    textAlign: 'center',
  },
  button: {
    width: '80%',
  },
}));

const QuestionTabs = ({
  answeredQuestions,
  questions,
  users,
  unansweredQuestions,
}) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor='primary'
        textColor='primary'
        centered
      >
        <Tab label='Unanswered' />
        <Tab label='Answered' />
      </Tabs>

      <TabPanel value={value} index={0} className={classes.item}>
        {unansweredQuestions.map((key) => {
          const question = questions[key];
          const user = users[question.author];
          return (
            <QuestionTab
              key={key}
              user={user}
              question={question}
              answered={false}
            />
          );
        })}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {answeredQuestions.map((key) => {
          const question = questions[key];
          const user = users[question.author];
          return (
            <QuestionTab
              key={key}
              user={user}
              question={question}
              answered={true}
            />
          );
        })}
      </TabPanel>
    </Paper>
  );
};

function mapStateToProps({ auth, questions }) {
  return {
    users: auth.users,
    authedUser: auth.authedUser,
    answeredQuestions: Object.keys(auth.users[auth.authedUser].answers),
    questions: questions.questions,
    unansweredQuestions: Object.keys(questions.questions)
      .sort(
        (a, b) =>
          questions.questions[b].timestamp - questions.questions[a].timestamp
      )
      .filter(
        (question) =>
          !Object.keys(auth.users[auth.authedUser].answers).includes(question)
      ),
  };
}

export default connect(mapStateToProps)(QuestionTabs);
