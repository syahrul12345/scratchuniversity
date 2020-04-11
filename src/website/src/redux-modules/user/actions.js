export const LoginAction = (account, token) => ({
  type: 'LOGIN',
  payload: {
    account,
    token,
  },
});
export const CreateAccountAction = (account, token) => ({
  type: 'CREATE_ACCOUNT',
  payload: {
    createdAccount: account,
    createdAccountToken: token,
  },
});

export const UpdateSelectedTabAction = (selectedTab) => ({
  type: 'UPDATE_SELECTED_TAB',
  payload: {
    selectedTab,
  },
});

export const UpdateCardsAction = (cards) => ({
  type: 'UPDATE_CARDS_ACTION',
  payload: {
    cards,
  },
});

export const UpdateSelectedCardsAction = (selectedCard) => ({
  type: 'UPDATE_SELECTED_CARD',
  payload: {
    selectedCard,
  },
});

export const UpdateCardTransactions = (transactions) => ({
  type: 'UPDATE_CARD_TRANSACTIONS',
  payload: {
    transactions,
  },
});
