import React, {useState} from 'react'
import {cx} from '@/lib/utils'
import Utils from '@/styles/utils.module.css'
import jsCookie from 'js-cookie'

export default function Index(props) {

    const validPassword = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$')

    const [form, setForm] = useState({
        email: '',
        pw: '',
    })
    const [formErr, setFormErr] = useState({
        email: '',
        pw: ''
    })


    const changeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
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

        if (potentialUser.status >= 200 && potentialUser.status < 300) {
            let user = await fetch('/api/user/getOne', {
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
                    email: '',
                    pw: '',
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
        <div>
            <div className='m-auto flex flex-col'>
                <h2 className='text-2xl text-center'>Login</h2>
                <div className='flex flex-col w-full text-center'>
                    <span className={cx(Utils.err)}>{formErr['email']}</span>
                    <input className={
                            cx(Utils.input)
                        }
                        onChange={(e) => changeHandler(e)}
                        type="text"
                        name="email"
                        id="email"
                        placeholder='email'
                        value={form['email']}
                        count={2}
                        />
                </div>
                <div className='flex flex-col w-full text-center'>
                    <span className={cx(Utils.err)}>{formErr['pw']}</span>
                    <input className={
                            cx(Utils.input)
                        }
                        onChange={(e) => changeHandler(e)}
                        type="password"
                        name="pw"
                        id="pw"
                        placeholder='Password'
                        value={form['pw']}
                        count={2}
                        />
                </div>
                <div className='flex place-items-center gap-3'>
                    <button className={
                        cx(Utils.btn, 'bg-utils-success')
                    }
                    onClick={(e) => formSubmit(e)}>Login</button>
                    <span className='cursor-pointer underline' onClick={() => props.onPageChange('register')}>Register</span>
                </div>
            </div>
        </div>
    )
}
