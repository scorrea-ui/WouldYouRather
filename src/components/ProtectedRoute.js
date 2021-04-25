import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';

const ProtectedRoute = ({ component: Component, authedUser, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authedUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

function mapStateToProps({ auth }) {
  return {
    authedUser: auth.authedUser,
  };
}

export default connect(mapStateToProps)(ProtectedRoute);
