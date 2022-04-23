import React, { useState } from 'react'

import Utils from '@/styles/utils.module.css'
import { cx } from '@/lib/utils'
import { bcrypt } from '@/lib/utils'

export default function Index(props) {
    const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]$')
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [formErr, setFormErr] = useState({
        email: '',
        password: ''
    })

    const update = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const formSubmit = async () => {
        let isValid = validate()

        if (isValid){
            var potentialUser = await fetch('api/user/getOne', {
                method: 'post',
                body: JSON.stringify({
                    email: form.email
                })
            })
            .then(resp => resp.json())

            // compare hash password
            isValid = bcrypt.compareSync(form.password, potentialUser.password)
        }

        if (isValid){
            props.onComplete(potentialUser)
        }
    }

    const validate = () => {
        let isValid = true
        for (const key in form) {
            if (form[key].length === 0){
                isValid = false
            }
        }
        for (const key in formErr) {
            if(formErr[key].length > 0){
                isValid = false
            }
        }
        if (isValid){
            // check the email
            if (!validEmail.test(form.email)){
                isValid = false
            } else {
            }
        }

        return isValid
    }


    return (
        <div className='flex justify-center my-5'>
            <div className='grid grid-col-2 w-6/12'>
                <h3 className='text-3xl uppercase col-span-2'>Login</h3>
                <div className='col-span-2'>
                    <input className={cx(Utils.input, 'w-full')} type="text" name="email" id="email" placeholder='Email' value={form.email} onChange={(e) => update(e)} />
                    <span>{formErr.email}</span>
                </div>
                <div className='col-span-2'>
                    <input className={cx(Utils.input, 'w-full')} type="text" name="password" id="password" placeholder='Password' value={form.password} onChange={(e) => update(e)} />
                    <span>{formErr.password}</span>
                </div>
                <div className='col-span-2 grid grid-cols-2 items-center'>
                    <button className={cx(Utils.btn, 'bg-utils-success w-full')} onClick={formSubmit}>Login</button>
                    <div>
                        <span>Are you new?</span>
                        <p className='text-blue-500 underline cursor-pointer' onClick={() => props.onPageChange('register')}>Register Here</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
