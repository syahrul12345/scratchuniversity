import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';

const VerifyAccount = (props) => {
  const { account } = props;
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      alignContent="center"
      style={{ minHeight: '60vh' }}
    >
      <Grid item>
        <Typography style={{ textAlign: 'center' }} variant="body1"> We've sent you a verification email to</Typography>
        <Typography style={{ textAlign: 'center' }} variant="subtitle1">
          {' '}
          {account.Email}
          {' '}
        </Typography>
        <Typography style={{ textAlign: 'center' }} variant="subtitle1"> Verify your account to get started.</Typography>
      </Grid>
    </Grid>
  );
};

VerifyAccount.propTypes = {
  account: PropTypes.shape({
    ID: PropTypes.number.isRequired,
    CreatedAt: PropTypes.string.isRequired,
    UpdatedAt: PropTypes.string.isRequired,
    DeletedAt: null,
    Email: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  account: state.user.account,
});

export default connect(mapStateToProps)(VerifyAccount);
