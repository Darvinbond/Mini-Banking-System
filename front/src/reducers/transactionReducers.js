const transactionReducers = (state = [], action) => {
    switch(action.type){
        case 'LOAD_TRA':
            return [
                action.payload
            ]
        case 'UPDATE_TRA':
            return [
                ...state,
                action.payload
            ]
        case 'CLEAR_TRA':
            return []
        default:
            return state
    }
}

export default transactionReducers;