import { cx } from '@/lib/utils'
import React, { useState } from 'react'

import Utils from '@/styles/utils.module.css'

export default function Index(props) {
    const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]$')
    const validPassword = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$')

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [formErr, setFormErr] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const update = (e) => {
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
        } else if (e.target.name === 'password') {
            let errVal = ''
            if (!validPassword.test(e.target.value)) {
                errVal = 'Password must contain minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character'
            }
            setFormErr({
                ...formErr,
                ['password']: errVal
            })
        } else if (e.target.name === 'confirmPassword') {
            let errVal = ''
            if (e.target.value !== form['password']) {
                errVal = "passwords don't match"
            }
            setFormErr({
                ...formErr,
                ['confirmPassword']: errVal
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
            if (form[key].length === 0){
                isValid = false
            }
        }
        for (const key in formErr) {
            if (formErr[key].length > 0){
                isValid = false
            }
        }
        if (isValid){
            let potentialUser = await fetch('/api/user/getOne', {
                method: 'post',
                body: JSON.stringify({
                    email: form.email
                })
            }).then(resp => resp.json())
            
            if (potentialUser){
                isValid = false
                setFormErr({
                    formErr,
                    email: 'Email already taken'
                })
            }
        }
        if (isValid){
            let user = await fetch('/api/user/create', {
                method: 'post',
                body: JSON.stringify(form)
            }).then(resp => resp.json())

            props.onComplete(user)
        }
        
    }

    return (
        <div className='flex justify-center my-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 w-11/12 items-center'>
                <h3 className='text-3xl uppercase md:col-span-2'>Register</h3>
                <div className='md:grid md:grid-cols-2 flex flex-col gap-3 items-center text-sm'>
                    <span className={cx(Utils.err, 'p-2', formErr.firstName === '' && 'hidden')}>{formErr.firstName}</span>
                    <input className={cx(Utils.input, 'w-full p-2 md:col-start-2')} type="text" count={2} name="firstName" id="firstName" placeholder='First Name' value={form.firstName} onChange={(e) => update(e)} />
                </div>
                <div className='md:grid md:grid-cols-2 flex flex-col-reverse gap-3 items-center text-sm'>
                    <input className={cx(Utils.input, 'w-full p-2')} type="text" count={2} name="lastName" id="lastName" placeholder='Last Name' value={form.lastName} onChange={(e) => update(e)} />
                    <span className={cx(Utils.err, 'p-2', formErr.lastName === '' && 'hidden')}>{formErr.lastName}</span>
                </div>
                <div className='md:grid md:grid-cols-2 flex flex-col gap-3 items-center text-sm'>
                    <span className={cx(Utils.err, 'p-2', formErr.email === '' && 'hidden')}>{formErr.email}</span>
                    <input className={cx(Utils.input, 'w-full p-2 md:col-start-2')} type="text" count={2} name="email" id="email" placeholder='Email' value={form.email} onChange={(e) => update(e)} />
                </div>
                <div className='md:grid md:grid-cols-2 flex flex-col-reverse gap-3 items-center text-sm'>
                    <input className={cx(Utils.input, 'w-full p-2')} type="text" count={2} name="password" id="password" placeholder='Password' value={form.password} onChange={(e) => update(e)} />
                    <span className={cx(Utils.err, 'p-2', formErr.password === '' && 'hidden')}>{formErr.password}</span>
                </div>
                <div className='md:grid md:grid-cols-2 flex flex-col gap-3 items-center text-sm'>
                    <span className={cx(Utils.err, 'p-2', formErr.confirmPassword === '' && 'hidden')}>{formErr.confirmPassword}</span>
                    <input className={cx(Utils.input, 'w-full p-2 md:col-start-2')} type="text" count={2} name="confirmPassword" id="confirmPassword" placeholder='Confirm Password' value={form.confirmPassword} onChange={(e) => update(e)} />
                </div>
                <div className='md:grid md:grid-cols-2 flex flex-col gap-3'>
                    <div className='flex gap-3 justify-center items-center'>
                        <button className={cx(Utils.btn, 'bg-utils-success')} onClick={formSubmit}>Register</button>
                        <div>
                            <span>Already a member?</span>
                            <p className={cx('cursor-pointer text-blue-500 underline')} onClick={() => props.onPageChange('login')}>Login Here</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


