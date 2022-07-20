const AdminTransaction = (state = [], action) => {
    switch(action.type){
        case 'LOAD_A_TRA':
            return [
                action.payload
            ]
        case 'CLEAR_A_TRA':
            return []
        default:
            return state
    }
}

export default AdminTransaction;