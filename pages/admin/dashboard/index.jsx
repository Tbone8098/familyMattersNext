import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import jsCookie from 'js-cookie'

export default function Index() {
    const router = useRouter()

    useEffect(() => {
        const check = async() => {
            let token = jsCookie.get('user')
            let isValid = await fetch('/api/auth/jwt/validate', {
                method: 'post',
                body: JSON.stringify(token)
            }) 
            .then(resp => resp.json())

            if (isValid) {
                router.push('/admin/dashboard')
            } else {
                router.push('/admin')
            }
        }
        check()
    }, [])

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}
