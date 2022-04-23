import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Head } from '@/components/meta'
import { Header } from '@/components/blog/admin'
import { cx } from '@/lib/utils'
import Utils from '@/styles/utils.module.css'

import Login from './login'
import Register from './register'
import jsCookie from 'js-cookie'


export default function Index() {
    const [page, setPage] = useState('login')
    const [signedIn, setSignedIn] = useState()
    const router = useRouter()

    useEffect(() => {
        check()
    }, [signedIn])

    const check = async() => {
        let token = jsCookie.get('user')
        let isValid = await fetch('/api/auth/jwt/validate', {
            method: 'post',
            body: JSON.stringify(token)
        }) 
        .then(resp => resp.json())

        if (isValid) {
            router.push('/admin/dashboard')
        }
    }

    const pageChange = (value) => {
        setPage(value)
    }

    const pages = {
        'login': <Login onPageChange={(v) => pageChange(v)} />,
        'register': <Register onPageChange={(v) => pageChange(v)} />
    }

    return (
        <div>
            <div>
                <Head />
            </div>
            <div className='h-screen flex flex-col'>
                <div className=''>
                    <Header page="Login" />
                </div>
                <div className='m-auto flex flex-col w-1/4'>
                    {pages[page]}
                </div>
            </div>
        </div>
    )
}
