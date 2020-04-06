import React from 'react';
import { connect } from 'react-redux';

// Import actions from redux
import { UpdateSelectedTabAction } from '../../redux-modules/user/actions';
import {
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

const LeftBarListItems = (props) => {
  const { icon, text } = props
  const clickButton = (text) => {
    props.dispatch(UpdateSelectedTabAction(text))
  }

  return(
    <ListItem button key={"OK"} onClick={() => clickButton(text)}>
      <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      alignContent="center">
        <Grid item xs={12}>
          <ListItemIcon style={{justifyContent: 'center'}}>
            {icon}
          </ListItemIcon>
        </Grid>
        <Grid item xs={12}>
          <ListItemText style={{textAlign:'center'}} primary={text} />
        </Grid>
      </Grid>
    </ListItem>
  )
}

function mapStateToProps(state) {
  return {
    selectedTab: state.user.selectedTab,
  }
}

export default connect(mapStateToProps)(LeftBarListItems);