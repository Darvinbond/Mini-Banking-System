const detailsReducer = (state = {}, action) => {
    switch(action.type){
        case 'LOAD_DATA':
            return {
                user: action.payload
            }
        case 'CLEAR_DATA':
            return {}
        default:
            return state
    }
}

export default detailsReducer;