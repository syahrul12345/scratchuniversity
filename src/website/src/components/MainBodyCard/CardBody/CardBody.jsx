import React, { useState } from 'react';
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
import NewCardDialog from './NewCardDialog';

import { createCard, getCards } from '../../../utils/api';
import { UpdateCardsAction, UpdateSelectedTabAction, UpdateSelectedCardsAction } from '../../../redux-modules/user/actions';

import Dialog from '../../Dialog';

const CourseBody = (props) => {
  const { account, cards } = props;
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openNewCardDialog, setOpenNewCardDialog] = useState(false);


  const [cookies] = useCookies(['cookie-name']);
  const xToken = cookies['x-token'];

  const setCards = (newCards) => {
    // only set new redux store if the lenghth of previous cards is different then previous cards
    if (cards.length !== newCards.length) {
      props.dispatch(UpdateCardsAction(newCards));
    }
  };

  const createNewCard = (tag) => {
    // Set the tag in our account which is the paylod
    const payload = {
      Email: account.Email,
      Tag: tag,
    };
    createCard(xToken, payload, setCards, setErrorMessage, setOpenErrorDialog);
  };

  // call get cards is openDialog is not true.
  getCards(xToken, account, setCards, setErrorMessage, setOpenErrorDialog);

  return (
    <Grid item xs={12}>
      <Grid
        container
        spacing={2}
        style={{ paddingTop: '2vh', maxWidth: '75vw' }}
      >
        <Grid item xs={12}>
          <Button onClick={() => setOpenNewCardDialog(true)}> New Card</Button>
        </Grid>
        {cards.length !== 0 ? cards.map((card) => (
          <Grid
            item
            xs={4}
            key={`${card.ID}`}
          >
            <Card id="titleCard">
              <CardContent style={{ paddingBottom: '10px' }}>
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
                    <Typography style={{ textAlign: 'right' }} variant="body1" compoenent="p">
                      Card CVV
                    </Typography>
                    <Typography style={{ textAlign: 'right' }} variant="body1" component="p">
                      <span>{card.CardCCV}</span>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  style={{ paddingBlockStart: '5px', paddingBlockEnd: '-5px' }}
                  container
                  justify="space-between"
                >
                  <Grid item>
                    <Card style={{ border: '0.1em solid white' }}>
                      <Typography style={{ marginRight: '10px', marginLeft: '10px' }} variant="subtitle1">
                        {card.Tag}
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item>
                    <Button onClick={() => {
                      // set to the selected tab to transaction. also set the selected cards
                      props.dispatch(UpdateSelectedCardsAction(card));
                      props.dispatch(UpdateSelectedTabAction('Transactions'));
                    }}
                    >
                      <Typography variant="button">
                        View payments
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )) : <></>}
      </Grid>
      <NewCardDialog
        openDialog={openNewCardDialog}
        setOpenDialog={setOpenNewCardDialog}
        createNewCard={createNewCard}
      />
      <Dialog
        errorMessage={errorMessage}
        openDialog={openErrorDialog}
        setOpenDialog={setOpenErrorDialog}
      />
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
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      ID: PropTypes.number.isRequired,
      UserID: PropTypes.number.isRequired,
      CreatedAt: PropTypes.string.isRequired,
      UpdatedAt: PropTypes.string.isRequired,
      DeletedAt: null,
      CardNumber: PropTypes.string.isRequired,
      CardExpiry: PropTypes.string.isRequired,
      CardCCV: PropTypes.string.isRequired,
      Tag: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  account: state.user.account,
  cards: state.user.cards,
});

export default connect(mapStateToProps)(CourseBody);
