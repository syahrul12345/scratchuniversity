import React from 'react';
import { Grid } from '@material-ui/core';
import CreateAccountForm from '../../components/CreateAccountForm';

export default function CreateAccountPage() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
    >
      <CreateAccountForm />
    </Grid>
  );
}
