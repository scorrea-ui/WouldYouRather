import './App.css';
import Login from './components/Login/Login';
import LoadingBar from 'react-redux-loading-bar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Home from './components/Home/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header/Header';
import NotFound from './components/NotFound/NotFound';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getInitialData } from './redux/actions/shared';
import AddQuestion from './components/AddQuestion/AddQuestion';
import Leaderboard from './components/Leaderboard/Leaderboard';
import Poll from './components/Poll/Poll';

function App({ dispatch }) {
  useEffect(() => {
    dispatch(getInitialData());
  });
  return (
    <div className='App'>
      <>
        <LoadingBar />
        <Router>
          <Header />
          <Container maxWidth='md'>
            <Switch>
              <ProtectedRoute exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
              <ProtectedRoute
                path='/questions/:question_id'
                component={Poll}
              ></ProtectedRoute>
              <ProtectedRoute
                path='/add'
                component={AddQuestion}
              ></ProtectedRoute>
              <ProtectedRoute
                path='/leaderboard'
                component={Leaderboard}
              ></ProtectedRoute>
              <Route path='*' component={NotFound} />
            </Switch>
          </Container>
        </Router>
      </>
    </div>
  );
}

export default connect()(App);
