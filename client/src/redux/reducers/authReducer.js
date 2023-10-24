const initialState = {
    user: null,
    token: null
}

const authReducer = (state = initialState, action) =>{
    switch(action.type){
        
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('user', action.payload.user)
            return{
                user: action.payload.user,
                token: action.payload.token
            }
        case 'LOGOUT':
            localStorage.removeItem('token')
            return{
                user: null,
                token: null
            }
        default:
            return state

    }
}

export default authReducer