const defaultValue = {
    isLogin: false,
    loading: false,
}

export default function reducer(state = defaultValue, action){
    switch (action.type){
        case 'SET_LOADING_TRUE':
            return {
                ...state,
                loading: true
            }    
        case 'SET_LOADING_FALSE':
            return {
                ...state,
                loading: false
            }    
        case 'USER_LOGIN':
            return {
                ...state,
                isLogin: true,
            }
        case 'USER_LOGOUT':
            return {
                ...state,
                isLogin: false,
            }    
        default:
            return state
        }
}
