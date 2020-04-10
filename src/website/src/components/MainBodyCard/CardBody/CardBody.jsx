import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Cookie stuff
import { useCookies } from 'react-cookie';

import {
  Grid,
  Card,
  Button,
  CardContent,
  Typography,
} from '@material-ui/core';


import { connect } from 'react-redux';
import { createCard, getCards } from '../../../utils/api';

const CourseBody = (props) => {
  const { account } = props;

  const [cards, setCards] = useState([]);
  const [cookies] = useCookies(['cookie-name']);
  const xToken = cookies['x-token'];
  
  const createNewCard = () => {
    createCard(xToken, account);
    getCards(xToken, account, setCards);
  }

  // Call the api if 0 cards
  if (cards.length === 0) {
    getCards(xToken, account, setCards);
  }
  
  // Rerender if we add a new card.
  useEffect(() => {

  },[cards])

  return (
    <Grid item xs={12}>
      <Grid
        container
        spacing={2}
        style={{ paddingTop: '2vh', maxWidth: '75vw' }}
      >
        <Grid item xs={12}>
          <Button onClick={() => createNewCard()}> New Card</Button>
        </Grid>
        {cards.length !== 0 ? cards.map((card) => (
          <Grid
            item
            xs={4}
            key={`${card.ID}`}
          >
            <Card id="titleCard">
              <CardContent>
                <Typography variant="h6" color="textPrimary" gutterBottom>
                  {card.CardNumber}
                </Typography>
                <p>
                  <img style={{ maxWidth: '10%', height: 'auto' }} src="/visa.png" alt="visa-img" />
                </p>

                <Grid
                  container
                  justify="space-between"
                  alignContent="space-between"
                >
                  <Grid item xs={3}>
                    <Typography variant="body1" compoenent="p">
                      Card Expiry
                    </Typography>
                    <Typography variant="body2" component="p">
                      <span>{card.CardExpiry}</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="body1" compoenent="p">
                      Card CVV
                    </Typography>
                    <Typography variant="body1" component="p">
                      <span>{card.CardCCV}</span>
                    </Typography>
                  </Grid>
                </Grid>
                <div>
                  {card.Tags}
                </div>
              </CardContent>
            </Card>
          </Grid>
        )) : <></>}
      </Grid>
    </Grid>
  );
};

CourseBody.propTypes = {
  account: PropTypes.shape({
    ID: PropTypes.number.isRequired,
    CreatedAt: PropTypes.string.isRequired,
    UpdatedAt: PropTypes.string.isRequired,
    DeletedAt: null,
    Email: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  account: state.user.account,
});

export default connect(mapStateToProps)(CourseBody);
