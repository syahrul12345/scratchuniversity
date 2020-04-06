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
  root: {
    minWidth: 275,
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
        <AppBar color="transparent" position="static">
              <Toolbar>
                <Button color="inherit">{selectedTab}</Button>
              </Toolbar>
            </AppBar>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          // style={{ minHeight: '100vh' }}
        >
          <Grid item xs={12}>
            
          </Grid> 
          <Grid
            item 
            xs={12}>
              <Card>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Word of the Day
                </Typography>
                <Typography variant="h5" component="h2">
                  be{bull}nev{bull}o{bull}lent
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  adjective
                </Typography>
                <Typography variant="body2" component="p">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
          </CardContent>
              </Card>
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