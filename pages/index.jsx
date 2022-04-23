import React, { useState } from 'react'
import { Head } from '../components/meta'
import { useUser } from 'context/userContext'

import { Modal } from '@/components/utils'
import LoginReg from '@/components/admin/loginReg'
import Logout from '@/components/admin/logout'

export default function Home() {
    const { state, dispatch } = useUser()

    return (
        <div>
            <Head />
            <main className='grid grid-cols-1 place-items-center h-screen'>
                <div className='text-center'>
                    {
                        !state.user.loggedIn ?

                        <Modal
                        btnText="Login"
                        content={<LoginReg />}
                        title="Login or Register"
                        />
                        :
                        <>
                        <p>Already logged in</p>
                        <Logout />
                        </>
                    }
                </div>
            </main>

        </div>
    )
}
