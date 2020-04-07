import React from 'react';
import {
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';

const ProgressionBody = props => {
  return(
    <Card id="titleCard">
      <CardContent>
        <Typography variant="h4" color="textPrimary">
          Progression tab
        </Typography>
      </CardContent>
    </Card>
  )
}


export default ProgressionBody;