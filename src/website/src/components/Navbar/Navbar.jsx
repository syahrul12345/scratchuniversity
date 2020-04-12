import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';

// redux
import { connect } from 'react-redux';
import { UpdateSelectedTabAction } from '../../redux-modules/user/actions';

const useStyles = makeStyles(() => ({
  navbar: {
    paddingTop: '2%',
    paddingLeft: '15%',
    paddingRight: '15%',
  },
}));

const NavBar = (props) => {
  const classes = useStyles();
  const selectMenu = (item) => {
    props.dispatch(UpdateSelectedTabAction(item));
  };
  const logout = () => {
    console.log('logout clicked');
  };
  return (
    <nav>
      <Grid container>
        <Grid item xs={10}>
          <Grid
            container
            spacing={3}
            direction="row"
            justify="left"
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
        </Grid>
        <Grid style={{paddingTop:'2%'}} item xs={2}>
          <Button onClick={() => logout()}>
            LogOut
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
  dispatch: PropTypes.func.isRequired,
};
export default connect(mapStateToProps)(NavBar);
