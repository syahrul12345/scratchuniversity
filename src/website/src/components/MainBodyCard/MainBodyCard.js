import React from 'react'
import { 
  Grid, 
  Card,
  CardContent, 
  Typography, 
  AppBar,
  Toolbar,
  Button,
  IconButton,
  makeStyles } from '@material-ui/core'

import {
  Menu
} from '@material-ui/icons'

// Redux
import { connect } from 'react-redux'

const useStyles = makeStyles({
  headerCard: {
    minWidth: '75vw',
  },
  appBarRoot: {
    flexGrow: 1,
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

const MainCard = (props) => {
  const classes = useStyles()
  const bull = <span className={classes.bullet}>•</span>;
  const { selectedTab } = props
  
  return(
      <div className={classes.appBarRoot}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          style={{paddingTop: '10vh'}}
        >
          <Grid 
          item 
          xs={12}
          className={classes.headerCard}>
            <Card id="titleCard">
              <CardContent>
                <Typography variant="h4" color="textPrimary">
                  {selectedTab}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid 
          item 
          xs={12}
          className={classes.headerCard}
          style={{paddingTop:'1vh'}}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card id="titleCard">
                <CardContent>
                  <Typography variant="h4" color="textPrimary">
                    {selectedTab}
                  </Typography>
                </CardContent>
              </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    account: state.user.account,
    selectedTab: state.user.selectedTab,
  }
}
export default connect(mapStateToProps)(MainCard);