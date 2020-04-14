import React, { useState } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { verifyToken } from '../../utils/api';

import Dialog from '../../components/Dialog';

const VerifiedAccount = () => {
  const [verified, setVerified] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');

  const setVerifiedCallback = (status) => {
    setVerified(status);
  };
  const failVerifyCallback = (error) => {
    setErrorMessage(error);
    setOpenErrorDialog(true);
  };

  verifyToken(token, setVerifiedCallback, failVerifyCallback);

  const goToLogin = () => {
    history.push('/');
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
      {verified
        ? (
          <>
            <Typography variant="h6" component="p"> Congratulations, your account is now verified!</Typography>
            <Typography variant="h6" component="p" gutterBottom> Login below to start spending.</Typography>
            <Button variant="contained" onClick={() => goToLogin()}> Login </Button>
          </>
        ) : <></>}
      <Dialog
        errorMessage={errorMessage}
        openDialog={openErrorDialog}
        setOpenDialog={setOpenErrorDialog}
      />
    </Grid>
  );
};
export default VerifiedAccount;
