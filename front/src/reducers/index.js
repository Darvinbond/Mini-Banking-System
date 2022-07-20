import detailsReducer from './userDetails'
import transactionReducer from './transactionReducers'
import AdminTransaction from './AdminTransaction'
import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import AdminUser from './AdminUser'
import AdminRoute from './AdminRoute'
import Admin from './Admin'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['detail', 'transaction', 'atransaction', 'auser', 'aroute', 'ad']
}

// const rootReducer = combineReducers({
//     detail: detailsReducer
// });

const allReducers = combineReducers({
    detail: detailsReducer,
    transaction: transactionReducer,
    atransaction: AdminTransaction,
    auser: AdminUser,
    aroute: AdminRoute,
    ad: Admin
});

export default persistReducer(persistConfig, allReducers);