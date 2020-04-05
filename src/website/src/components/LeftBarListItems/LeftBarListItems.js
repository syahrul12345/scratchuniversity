import React from 'react';
import {
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { Mail } from '@material-ui/icons/'

const LeftBarListItems = () => {
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
            <Mail/>
          </ListItemIcon>
        </Grid>
        <Grid item xs={12}>
          <ListItemText style={{textAlign:'center'}} primary={"Classes"} />
        </Grid>
      </Grid>
    </ListItem>
  )
}

export default LeftBarListItems;