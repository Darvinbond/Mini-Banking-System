const AdminRoute = (state = "home", action) => {
    switch(action.type){
        case 'NEW_ROUTE':
            return action.payload
        case 'CLEAR_ROUTE':
            return ""
        default:
            return state
    }
}

export default AdminRoute;