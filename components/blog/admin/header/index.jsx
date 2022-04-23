import React from 'react'

export default function Index(props) {
    const { page } = props
    return (
        <div className='bg-blog-primary py-3'>
            <h2 className='text-2xl'> { page } </h2>
        </div>
    )
}
