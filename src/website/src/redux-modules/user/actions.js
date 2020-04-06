export const LoginAction = (account, token) => {
    return {
        type: 'LOGIN',
        payload: {
            account,
            token,
        }
    }
}
export const CreateAccountAction = (account,token) => {
    return {
        type: 'CREATE_ACCOUNT',
        payload: {
            createdAccount: account,
            createdAccountToken: token,
        }
    }
}

export const UpdateSelectedTabAction = (selectedTab) => {
    return {
        type: 'UPDATE_SELECTED_TAB',
        payload: {
            selectedTab,
        },
    }
}