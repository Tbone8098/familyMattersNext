import React, { useState } from 'react'
import { cx } from '@/lib/utils'
import jsCookie from 'js-cookie'

import Utils from '@/styles/utils.module.css'



export default function Index(props) {
    const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]$')

    const validPassword = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$')

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        pw: '',
        confirmPw: ''
    })
    const [formErr, setFormErr] = useState({
        firstName: '',
        lastName: '',
        email: '',
        pw: '',
        confirmPw: '',
    })

    const updateValue = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        validations(e)
    }

    const validations = (e) => {
        let count = parseInt(e.target.getAttribute('count'))

        if (e.target.value.length === 0) {
            setFormErr({
                ...formErr,
                [e.target.name]: ''
            })
        } else if (e.target.value.length < count) {
            setFormErr({
                ...formErr,
                [e.target.name]: `${e.target.placeholder} must be longer than ${count} characters`
            })
        } else if (e.target.name === 'email') {
            let errVal = ''
            if (!validEmail.test(e.target.value)) {
                errVal = 'Invalid Email'
            }
            setFormErr({
                ...formErr,
                ['email']: errVal
            })
        } else if (e.target.name === 'pw') {
            let errVal = ''
            if (!validPassword.test(e.target.value)) {
                errVal = 'Password must contain minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character'
            }
            setFormErr({
                ...formErr,
                ['pw']: errVal
            })
        } else if (e.target.name === 'confirmPw') {
            let errVal = ''
            if (e.target.value !== form['pw']) {
                errVal = "passwords don't match"
            }
            setFormErr({
                ...formErr,
                ['confirmPw']: errVal
            })
        } else {
            setFormErr({
                ...formErr,
                [e.target.name]: ``
            })
        }
    }

    const formSubmit = async () => {
        let isValid = true
        for (const key in form) {
            if (form[key].length === 0) {
                isValid = false
            }
        }
        for (const key in formErr) {
            if (formErr[key].length > 0) {
                isValid = false
            }
        }

        let potentialUser = await fetch('/api/user/getOne', {
            method: 'post',
            body: JSON.stringify({ email: form['email'] })
        })

        if (potentialUser.status >= 400 && potentialUser.status < 500) {
            let user = await fetch('/api/user/create', {
                method: 'post',
                body: JSON.stringify(form)
            })
                .then(resp => resp.json())

            if (user){
                let jwt = await fetch('api/auth/jwt/create', {
                    method: 'post',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })

                let token = await jwt.json();
                
                jsCookie.set('user', JSON.stringify(token))


                setForm({
                    firstName: '',
                    lastName: '',
                    email: '',
                    pw: '',
                    confirmPw: ''
                })
            }

        } else {
            setFormErr({
                ...formErr,
                'email': "Email already Taken"
            })
        }
    }

    return (
        <div className='flex flex-col text-center'>
            <h2 className='text-2xl text-center mb-3'>Create a User</h2>
            <div className='flex flex-col flex-wrap'>
                <span className={cx(Utils.err)}>{formErr['firstName']}</span>
                <input className={
                    cx(Utils.input)
                }
                    value={form['firstName']}
                    onChange={(e) => updateValue(e)}
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder='First Name'
                    count='2' />
            </div>
            <div className='flex flex-col flex-wrap'>
                <span className={cx(Utils.err)}>{formErr['lastName']}</span>
                <input className={
                    cx(Utils.input)
                }
                    value={form['lastName']}
                    onChange={(e) => updateValue(e)}
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder='Last Name'
                    count='2' />
            </div>
            <div className='flex flex-col flex-wrap'>
                <span className={cx(Utils.err)}>{formErr['email']}</span>
                <input className={
                    cx(Utils.input)
                }
                    value={form['email']}
                    onChange={(e) => updateValue(e)}
                    type="text"
                    name="email"
                    id="email"
                    placeholder='Email'
                    count='2' />
            </div>
            <div className='flex flex-col flex-wrap'>
                <span className={cx(Utils.err)}>{formErr['pw']}</span>
                <input className={
                    cx(Utils.input)
                }
                    value={form['pw']}
                    onChange={(e) => updateValue(e)}
                    type="password"
                    name="pw"
                    id="pw"
                    placeholder='Password'
                    count='0' />
            </div>
            <div className='flex flex-col flex-wrap'>
                <span className={cx(Utils.err)}>{formErr['confirmPw']}</span>
                <input className={
                    cx(Utils.input)
                }
                    value={form['confirmPw']}
                    onChange={(e) => updateValue(e)}
                    type="password"
                    name="confirmPw"
                    id="confirmPw"
                    placeholder='Confirm Password'
                    count='0' />
            </div>
            <div className='flex gap-5 items-center'>
                <button className={
                    cx(Utils.btn, 'bg-utils-success')
                } onClick={formSubmit}>Create User</button>
                <span className='cursor-pointer underline'
                    onClick={
                        () => props.onPageChange('login')
                    }>Login</span>
            </div>
        </div>
    )
}
