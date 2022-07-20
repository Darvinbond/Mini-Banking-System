const AdminUser = (state = [], action) => {
    switch(action.type){
        case 'LOAD_A_USER':
            return [
                action.payload
            ]
        case 'CLEAR_A_USER':
            return []
        default:
            return state
    }
}

export default AdminUser;