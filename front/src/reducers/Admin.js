const Admin = (state = false, action) => {
    switch(action.type){
        case 'LOG_ADMIN':
            return true
        case 'UNLOG_ADMIN':
            return false
        default:
            return state
    }
}

export default Admin;