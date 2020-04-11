import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

// Material ui
// Cookie stuff
import { useCookies } from 'react-cookie';

// Components
import Header from '../../components/Header';
import NavBar from '../../components/Navbar';
import Dialog from '../../components/Dialog';
import MainBodyCard from '../../components/MainBodyCard';

// Redux
import { LoginAction, UpdateCardsAction, UpdateSelectedTabAction } from '../../redux-modules/user/actions';

// Api
import { getAccount, getCards } from '../../utils/api';


const Dashboard = (props) => {
  // Pull account from the store.
  // If empty (due to refresh, get back the account using the token stored.)
  const { account, cards } = props;

  const [cookies] = useCookies(['cookie-name']);
  const xToken = cookies['x-token'];

  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const setCards = (newCards) => {
    if (cards.length !== newCards.length) {
      props.dispatch(UpdateCardsAction(newCards));
    }
  };

  const setAccount = (newAccount) => {
    props.dispatch(LoginAction(newAccount, xToken));
    props.dispatch(UpdateSelectedTabAction('Cards'));
    getCards(xToken, newAccount, setCards, setErrorMessage, setOpenErrorDialog);
  };

  // Empty account in redux, so we call the backend to get account. And then we call get cards
  if (account && account.ID === undefined) {
    getAccount(xToken, setAccount, setErrorMessage, setOpenErrorDialog);
  }

  return (
    <>
      <Header title="Dashboard" />
      <NavBar />
      <MainBodyCard />
      <Dialog
        errorMessage={errorMessage}
        openDialog={openErrorDialog}
        setOpenDialog={setOpenErrorDialog}
      />
    </>
  );
};

Dashboard.propTypes = {
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

function mapStateToProps(state) {
  return {
    account: state.user.account,
    cards: state.user.cards,
  };
}
export default connect(mapStateToProps)(Dashboard);
