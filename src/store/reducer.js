const initialState = {
    auth: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'False_Auth':
            return {
                ...state,
                auth: false
            }
        case 'True_Auth':
            return {
                ...state,
                auth: true
            }
        default:
            return state;
    }
}

export default reducer;