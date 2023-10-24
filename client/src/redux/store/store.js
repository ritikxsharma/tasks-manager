import { createStore, combineReducers } from "redux";
import authReducer from "../reducers/authReducer";
import tasksReducer from '../reducers/tasksReducer'
import loadingReducer from "../reducers/loadingReducer"

const rootReducers = combineReducers({
    auth: authReducer,
    tasks: tasksReducer,
    loading: loadingReducer
})

const persistedToken = localStorage.getItem('token')
const persistedUser = localStorage.getItem('user')

const store = createStore(rootReducers,{
    auth: {
        token: persistedToken,
        user: persistedUser
    }
})

export default store