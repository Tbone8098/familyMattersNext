import { cx } from '@/lib/utils'
import React, { useState } from 'react'
import { useModal } from 'context/modalContext'


import Style from './style.module.css'

export default function Index(props) {
    const { state, dispatch } = useModal({})
    const { content = "content missing", title = "title needed", classnames, btnText } = props
    const [showing, setShowing] = useState(false)


    const toggle = () => {
        let isShowing = !state.modal.showing
        dispatch({
            type: 'SHOW',
            payload: {
                showing: isShowing
            }
        })
    }

    if (state.modal.showing) {
        return (
            <div className={cx(Style.wrapper)}>
                <div className={cx(Style.content)}>
                    <div className={cx(Style.header, 'flex items-center justify-between p-3')}>
                        <h2 className='text-4xl text-blog-secondary1 capitalize'>{title}</h2>
                        <button className={cx('text-utils-danger text-xl font-bold')} onClick={toggle}>CLOSE</button>
                    </div>
                    <div className={cx(Style.body)}>
                        <div className="col-span-2">
                        {content}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <button onClick={toggle}>{btnText}</button>
        )
    }
}
