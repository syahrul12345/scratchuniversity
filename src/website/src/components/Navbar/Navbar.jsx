import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';

// redux
import { connect } from 'react-redux';
import { UpdateSelectedTabAction } from '../../redux-modules/user/actions';

const useStyles = makeStyles(() => ({
  navbar: {
    paddingTop: '5%',
    paddingLeft: '15%',
    paddingRight: '15%',
  },
}));

const NavBar = (props) => {
  const classes = useStyles();
  const selectMenu = (item) => {
    props.dispatch(UpdateSelectedTabAction(item));
  };
  return (
    <nav>
      <Grid
        container
        spacing={3}
        direction="row"
        alignItems="center"
        justify="center"
        className={classes.navbar}
      >
        <Grid item>
          <Button onClick={() => selectMenu('Cards')}>
            Cards
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={() => selectMenu('Transactions')}>
            Transactions
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={() => selectMenu('Account')}>
            Account
          </Button>
        </Grid>
      </Grid>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  selectedTab: state.user.selectedTab,
});

NavBar.propTypes = {
  dispatch: PropTypes.func.isRequired
}
export default connect(mapStateToProps)(NavBar);
