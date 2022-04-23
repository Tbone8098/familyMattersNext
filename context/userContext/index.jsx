import React, { useContext, useReducer, useEffect } from 'react'

const initUserState = {
    user: {
        loggedIn: false,
        token: ''
    }
}

const UserContext = React.createContext(initUserState)

function reducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                user: initUserState.user
            }
        default:
            return state
    }
}

export default function UserProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initUserState)

    useEffect(() => {
        checkLoginStatus()
    }, [])

    const checkLoginStatus = async () => {
        let token = localStorage.getItem('token')
        if (token){

            let isValid = await fetch('/api/auth/jwt/validate', {
                method: 'post',
                body: token
            })
            if (isValid) {
                token = JSON.parse(token)
                dispatch({
                    type: 'LOGIN',
                    payload: {
                        loggedIn: true,
                        token: token
                    }
                })
            }
        }
    }

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext)
}