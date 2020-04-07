import React from 'react'
import {
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';

const AccountBody = (props) => {
  return(
    <Card id="titleCard">
      <CardContent>
        <Typography variant="h4" color="textPrimary">
          Account tab
        </Typography>
      </CardContent>
    </Card>
  )
}

export default AccountBody;