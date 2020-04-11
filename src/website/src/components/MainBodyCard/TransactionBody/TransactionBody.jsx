import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  Divider,
} from '@material-ui/core';

// Cookie stuff
import { useCookies } from 'react-cookie';

import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { UpdateSelectedCardsAction, UpdateCardTransactions } from '../../../redux-modules/user/actions';

// Api calls
import { getTransactions } from '../../../utils/api';

// Table
import Table from './Table';

import Dialog from '../../Dialog';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const TransactionBody = (props) => {
  const classes = useStyles();

  const {
    account, cards, selectedCard, transactions,
  } = props;

  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [cookies] = useCookies(['cookie-name']);
  const xToken = cookies['x-token'];

  const setTransactions = (newTransactions) => {
    if (transactions.length !== newTransactions.length) {
      props.dispatch(UpdateCardTransactions(newTransactions));
    }
  };

  const handleChange = (event) => {
    props.dispatch(UpdateSelectedCardsAction(event.target.value));
  };

  // Get the transactions of the current selected card
  const payload = {
    ID: selectedCard.ID,
    CardNumber: selectedCard.CardNumber,
    Email: account.Email,
  };

  getTransactions(xToken, payload, setTransactions, setErrorMessage, setOpenErrorDialog);
  return (
    <Grid
      container
    >
      <Grid item>
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel>Card</InputLabel>
          <Select
            style={{ minWidth: '25vw' }}
            value={selectedCard}
            onChange={handleChange}
          >
            {cards.map((card) => (
              <MenuItem style={{ minWidth: '25vw' }} key={card.ID} value={card}>
                <Grid
                  justify="space-between"
                  container
                >
                  <Grid item>
                    {card.CardNumber}
                  </Grid>
                  <Grid item>
                    {card.Tag}
                  </Grid>
                </Grid>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Dialog
        errorMessage={errorMessage}
        openDialog={openErrorDialog}
        setOpenDialog={setOpenErrorDialog}
      />
      <Divider />
      <Grid item xs={12}>
        {transactions && transactions.length > 0
          ? <Table transactions={transactions} />
          : <Typography style={{marginTop:'30vh', textAlign: 'center' }} variant="h2"> No transactions for this card yet!</Typography>}
      </Grid>
    </Grid>
  );
};

TransactionBody.propTypes = {
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
  selectedCard: PropTypes.shape({
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
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      ID: PropTypes.number.isRequired,
      CreatedAt: PropTypes.string.isRequired,
      UpdatedAt: PropTypes.string.isRequired,
      DeletedAt: null,
      Date: PropTypes.string.isRequired,
      Name: PropTypes.string.isRequired,
      Value: PropTypes.number.isRequired,
      CreditCardID: PropTypes.number.isRequired,
    }),
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  account: state.user.account,
  cards: state.user.cards,
  selectedCard: state.user.selectedCard,
  transactions: state.user.transactions,
});

export default connect(mapStateToProps)(TransactionBody);
