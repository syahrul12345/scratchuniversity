const userInitialState = {
  account: {},
  token: '',
  selectedTab: '',
  cards: [],
  selectedCard: {},
  transactions: {},
};

function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case 'LOGIN':
      const { account, token } = action.payload;
      return {
        ...state,
        account,
        token,
      };
    case 'CREATE_ACCOUNT':
      const { createdAccount, createdAccountToken } = action.payload;
      return {
        ...state,
        account: createdAccount,
        token: createdAccountToken,
      };
    case 'UPDATE_SELECTED_TAB':
      const { selectedTab } = action.payload;
      return {
        ...state,
        selectedTab,
      };
    case 'UPDATE_CARDS_ACTION':
      const { cards } = action.payload;
      return {
        ...state,
        cards,
      };
    case 'UPDATE_SELECTED_CARD':
      const { selectedCard } = action.payload
      return {
        ...state,
        selectedCard,
      };
    case 'UPDATE_CARD_TRANSACTIONS':
      const { transactions } = action.payload
      return {
        ...state,
        transactions,
      };
    default:
      return state;
  }
}

export default userReducer;
