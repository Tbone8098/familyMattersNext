import { useUser } from 'context/userContext'
import React from 'react'

export default function Index() {
    const {state, dispatch} = useUser()

    const logout = () => {
        localStorage.removeItem('token')
        dispatch({
            type: 'LOGOUT'
        })
    }
    return (
        <button onClick={logout}>Logout</button>
    )
}
