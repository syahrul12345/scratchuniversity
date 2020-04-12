import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Grid, TextField, Button, Typography,
} from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// Redux stuff
import { connect } from 'react-redux';
// Cookie stuff
import { useCookies } from 'react-cookie';
import { CreateAccountAction } from '../../redux-modules/user/actions';
// Helper functions
import { getCreateAccountUrl } from '../../utils';

// DialogBox
import DialogBox from '../Dialog';

function CreateAccountForm(props) {
  const history = useHistory();
  const [cookie, setCookie] = useCookies(['cookie-name']);
  const [userInfo, setUserInfo] = useState({
    email: '',
    username: '',
    password: '',
    confirm_password: '',
    showPassword: false,
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (input) => (event) => {
    setUserInfo({ ...userInfo, [input]: event.target.value });
  };

  useEffect(() => {
    if ((userInfo.password === userInfo.confirm_password) && userInfo.password !== '') {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [userInfo]);
  const createAccount = () => {
    const url = getCreateAccountUrl();
    // ensure that the password and confirm password is the same..
    axios.post(url, userInfo)
      .then((res) => {
        // Set the returned cookie from the backend
        if (res.data.status === false) {
          throw new Error(res.data.message);
        }
        const { account } = res.data;
        setCookie('x-token', `bearer ${account.Token}`);
        props.dispatch(CreateAccountAction(account, account.Token));
        history.push('/dashboard');
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.response.data.message);
        setOpenErrorDialog(true);
      });
  };
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      alignContent="center"
      style={{ minHeight: '60vh' }}
    >
      <Grid item xs={12}>
        <TextField
          label="Email"
          variant="outlined"
          style={{ width: '50vw', marginBlockEnd: '1vh' }}
          onChange={handleChange('email')}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Username"
          variant="outlined"
          style={{ width: '50vw', marginBlockEnd: '1vh' }}
          onChange={handleChange('username')}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Password"
          variant="outlined"
          type={userInfo.showPassword ? 'text' : 'password'}
          style={{ width: '50vw', marginBlockEnd: '1vh' }}
          onChange={handleChange('password')}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Confirm Password"
          variant="outlined"
          style={{ width: '50vw', marginBlockEnd: '1vh' }}
          type={userInfo.showPassword ? 'text' : 'password'}
          onChange={handleChange('confirm_password')}
        />
        {userInfo.password !== userInfo.confirm_password
          ? <Typography variant="subtitle2" style={{ textAlign: 'center', color: 'red', paddingBottom: '1vh' }}> The passwords must be the same </Typography>
          : <></>}
      </Grid>
      <Grid item xs={12}>
        <Button disabled={buttonDisabled} variant="outlined" onClick={createAccount}> Create Account </Button>
      </Grid>
      <DialogBox
        errorMessage={errorMessage}
        openDialog={openErrorDialog}
        setOpenDialog={setOpenErrorDialog}
      />
    </Grid>
  );
}

CreateAccountForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    account: state.account,
    token: state.token,
  };
}

export default connect(mapStateToProps)(CreateAccountForm);
