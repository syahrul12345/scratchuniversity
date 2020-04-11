import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Grid, TextField, Button, Typography, Link,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import axios from 'axios';

// Redux stuff
import { connect } from 'react-redux';

// Cookie stuff
import { useCookies } from 'react-cookie';
import { LoginAction, UpdateSelectedTabAction } from '../../redux-modules/user/actions';
import { getLoginUrl } from '../../utils';
// DialogBox
import Dialog from '../Dialog';

function LoginForm(props) {
  const history = useHistory();
  const [cookies, setCookie] = useCookies(['cookie-name']);

  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (input) => (event) => {
    setUser({
      ...user, [input]: event.target.value,
    });
  };
  const login = () => {
    const url = getLoginUrl();
    axios.post(url, user)
      .then((res) => {
        const { account } = res.data;
        setCookie('x-token', `bearer ${account.Token}`);
        props.dispatch(LoginAction(account, account.Token));
        props.dispatch(UpdateSelectedTabAction('Cards'));
        history.push('/dashboard');
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setOpenErrorDialog(true);
      });
  };
  return (
    <>
      <Grid item xs={12} md={12}>
        <TextField
          onChange={handleChange('email')}
          style={{ marginBottom: '1vh', minWidth: '80vw' }}
          variant="outlined"
          label="Email"
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <TextField
          type="password"
          onChange={handleChange('password')}
          style={{ marginBottom: '1vh', minWidth: '80vw' }}
          variant="outlined"
          label="Password"
        />
      </Grid>
      <Typography style={{ marginBottom: '1vh' }} variant="subtitle2">
        <Link href="/forgetPassword"> Forget Password </Link>
      </Typography>
      <Typography style={{ marginBottom: '1vh' }} variant="subtitle2">
        {' '}
        No Account? Register
        <Link href="/create"> here </Link>
      </Typography>
      <Grid item xs={12}>
        <Button variant="outlined" onClick={() => login()}> LOGIN </Button>
      </Grid>
      <Dialog
        errorMessage={errorMessage}
        openDialog={openErrorDialog}
        setOpenDialog={setOpenErrorDialog}
      />
    </>
  );
}

LoginForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    token: state.token,
  };
}
export default connect(mapStateToProps)(LoginForm);
