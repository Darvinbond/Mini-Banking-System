// import {useDispatch, useSelector} from 'react-redux'
// import axios from 'axios'
// const dispatch = useDispatch()

export const add_data = (val) => {
    return {
        type: 'LOAD_DATA',
        payload: val
    }
}

export const clear_data = () => {
    return {
        type: 'CLEAR_DATA'
    }
}


//admin routes

export const new_route = (val) => {
    return {
        type: 'NEW_ROUTE',
        payload: val
    }
}

export const clear_route = () => {
    return {
        type: 'CLEAR_ROUTE'
    }
}




// Transactions





export const add_tra = (val) => {
    return {
        type: 'LOAD_TRA',
        payload: val
    }
}


export const update_tra = (id, from_acc, from_name, to_acc, to_name, to_bank, amount, beneficiary, date, status) => {
    return {
        type: 'UPDATE_TRA',
        payload: {
            id, 
            from_acc, 
            from_name,
            to_acc, 
            to_name,
            to_bank, 
            amount, 
            beneficiary, 
            date,
            status
        }
    }
}

export const clear_tra = () => {
    return {
        type: 'CLEAR_TRA'
    }
}















export const add_a_tra = (val) => {
    return {
        type: 'LOAD_A_TRA',
        payload: val
    }
}

export const clear_a_tra = () => {
    return {
        type: 'CLEAR_A_TRA'
    }
}

export const add_a_users = (val) => {
    return {
        type: 'LOAD_A_USER',
        payload: val
    }
}

export const clear_a_users = () => {
    return {
        type: 'CLEAR_A_USER'
    }
}





export const alogged = () => {
    return {
        type: 'LOG_ADMIN'
    }
}
export const aunlogged = () => {
    return {
        type: 'UNLOG_ADMIN'
    }
}