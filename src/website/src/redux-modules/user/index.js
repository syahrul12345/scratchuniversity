const userInitialState = {
    account: {},
    token: '',
    selectedTab: '',
}

function userReducer(state = userInitialState, action) {
    switch(action.type){
        case 'LOGIN':
            const { account, token } = action.payload
            return {
                ...state,
                account,
                token
            }
        case 'CREATE_ACCOUNT':
            const { createdAccount, createdAccountToken } = action.payload
            return {
                ...state,
                account: createdAccount,
                token: createdAccountToken,
            }
        case 'UPDATE_SELECTED_TAB':
            const { selectedTab } = action.payload
            return {
                ...state,
                selectedTab: selectedTab,
            }
        default:
            return state
    }
}

export default userReducer