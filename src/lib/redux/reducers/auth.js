const initialState = {
    user: {
        fullname: '',
        phone: '',
        id: null
    },
    isAuthenticated: false,
    access_token: null
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                ...state,
                isAuthenticated: true,
            }

        case 'LOG_OUT':
            return {
                ...state,
                isAuthenticated: false,
                user: {
                    fullname: '',
                    phone: '',
                    id: null
                },
            }

        case 'PROFILE':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                access_token: action.payload.api_token
            }

        default:
            return state
    }
}

export default auth;