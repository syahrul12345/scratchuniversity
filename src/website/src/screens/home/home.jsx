import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import Create from '../createaccount';
import Login from '../login';
import Dashboard from '../dashboard';
import Forget from '../forget';
import VerifiedAccount from '../VerifiedAccount';

function App() {
  // Set the global state

  return (
    <Router>
      <CssBaseline />
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/create">
          <Create redirect="/dashboard" />
        </Route>
        <Route exact path="/forgetpassword">
          <Forget />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/verify">
          <VerifiedAccount />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
