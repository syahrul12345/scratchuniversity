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
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  )
}

function mapStateToProps(state) {
  return {
    selectedTab: state.user.selectedTab,
  }
}

export default connect(mapStateToProps)(LeftBarListItems);