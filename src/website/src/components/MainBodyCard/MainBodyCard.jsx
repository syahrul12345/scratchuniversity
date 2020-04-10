import React from 'react';
import PropTypes from 'prop-types';

import {
  Grid,
  Divider,
  Typography,
  makeStyles,
} from '@material-ui/core';

// Subbodiees
import { connect } from 'react-redux';

import TransactionBody from './TransactionBody';
import CardBody from './CardBody';
import AccountBody from './AccountBody';


const useStyles = makeStyles({
  headerCard: {
    minWidth: '75vw',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const RenderSubBody = (page) => {
  // Return different bodies accordingly
  switch (page) {
    case 'Cards':
      return (<CardBody />);
    case 'Transactions':
      return (<TransactionBody />);
    case 'Account':
      return (<AccountBody />);
    default:
      return (<></>);
  }
};

const MainBody = (props) => {
  const classes = useStyles();
  const { selectedTab } = props;

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      style={{ paddingTop: '1vh' }}
    >
      <Grid
        item
        xs={12}
        className={classes.headerCard}
      >
        <Typography variant="h4" color="textPrimary">
          { selectedTab }
        </Typography>
        <Divider />
      </Grid>
      <Grid
        item
        xs={12}
        className={classes.headerCard}
        style={{ paddingTop: '1vh' }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {RenderSubBody(selectedTab)}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};


MainBody.propTypes = {
  selectedTab: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    account: state.user.account,
    selectedTab: state.user.selectedTab,
  };
}
export default connect(mapStateToProps)(MainBody);
