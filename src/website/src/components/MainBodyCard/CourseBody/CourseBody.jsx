import React from 'react'
import {
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';

const CourseBody = props => {
  return(
    <Card id="titleCard">
      <CardContent>
        <Typography variant="h4" color="textPrimary">
          Course tab
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CourseBody;