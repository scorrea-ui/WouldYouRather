import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { login } from '../../redux/actions/auth';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(3),
    minWidth: 260,
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    marginBottom: theme.spacing(2),
  },
  body: {
    marginTop: theme.spacing(8),
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Login = ({ dispatch, users, history, location }) => {
  const classes = useStyles();

  useEffect(() => {
    users && setLogin(Object.keys(users)[0]);
  }, [users]);

  const [loggedInUser, setLogin] = useState(null);

  const handleChange = (e) => {
    setLogin(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { from } = location.state || { from: { pathname: '/' } };
    dispatch(login(loggedInUser));
    history.push(from);
  };

  return (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems='center'
      className={classes.body}
    >
      <Typography variant='h3' className={classes.title}>
        Welcome to the Would You Rather App!
      </Typography>
      <Typography variant='h4' className={classes.subtitle}>
        Sign into continue
      </Typography>

      <Grid item xs={12}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <FormControl className={classes.formControl}>
            <Select
              onChange={handleChange}
              displayEmpty
              className={classes.selectEmpty}
              value={loggedInUser || ''}
            >
              {users &&
                Object.keys(users).map((user) => {
                  const value = users[user];
                  return (
                    <MenuItem key={user} value={user}>
                      {value.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            className={classes.button}
          >
            Sign In
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

function mapStateToProps({ auth }) {
  return {
    users: auth.users,
  };
}

export default withRouter(connect(mapStateToProps)(Login));
