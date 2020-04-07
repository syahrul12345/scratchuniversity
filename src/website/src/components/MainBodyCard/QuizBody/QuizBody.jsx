import React from 'react'
import {
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';

const QuizBody = (props) => {
  return(
    <Card id="titleCard">
      <CardContent>
        <Typography variant="h4" color="textPrimary">
          Quiz tab
        </Typography>
      </CardContent>
    </Card>
  )
}

export default QuizBody;