import Logo from '@/assets/icons/Logo'
import React from 'react'

const Loader = () => {
    return (
        <div className='h-screen w-screen flex items-center justify-center gradient-bg'>
            <div className='flex flex-col gap-3 justify-center items-center'>
                <Logo width={84}
                    height={74} />
                <div className="loading-text">
                    <span>K</span><span>e</span><span>e</span><span>p</span><span>h</span><span>y</span>
                </div>

            </div>
        </div>
    )
}

export default Loader