const contextReducer = (state, action) => {
    let transactions;

    switch (action.type) {
        case 'GET_TRANSACTIONS':
            return {
                ...state,
                loading: false,
                transactions: action.payload
            }
        case 'DELETE_TRANSACTION':
            transactions = state.filter((t) => t.id !== action.payload);

            return transactions;
        case 'ADD_TRANSACTION':
            transactions = [...state, action.payload];

            return transactions;
        default:
            return state;
    }
}

export default contextReducer;