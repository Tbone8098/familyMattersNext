import React, { useState } from 'react'
import Login from '../login'
import Reg from '../register/index'

import { useUser } from 'context/userContext'

export default function Index() {
    const { state, dispatch } = useUser({})
    const [view, setView] = useState('login')

    const pageChangeHandler = (e) => {
        setView(e)
    }

    const loginUser = async (user) => {
        let token = await fetch('/api/auth/jwt/create', {
            method: 'post',
            body: JSON.stringify(user)
        }).then(resp => resp.json())

        localStorage.setItem('token', JSON.stringify(token))
        dispatch({
            type: 'LOGIN',
            payload: {
                loggedIn: true,
                token: token
            }
        })
    }

    return (
        <div>
            {
                view == 'login'
                    ?
                    <Login
                        onPageChange={(e) => pageChangeHandler(e)}
                        onComplete = {(user) => loginUser(user)}
                    />
                    :
                    <Reg
                        onPageChange={(e) => pageChangeHandler(e)}
                        onComplete = {(user) => loginUser(user)}
                    />
            }
        </div>
    )
}
