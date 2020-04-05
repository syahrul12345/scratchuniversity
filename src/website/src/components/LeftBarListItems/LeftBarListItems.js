import React from 'react';
import {
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

const LeftBarListItems = (props) => {
  const { icon, text } = props
  
  return(
    <ListItem button key={"OK"}>
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

export default LeftBarListItems;