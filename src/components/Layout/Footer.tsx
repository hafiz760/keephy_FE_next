import XIcon from '@/assets/icons/XIcon'
import LinkedInIcon from '@/assets/icons/LinkedInIcon'
import FaceBookIcon from '@/assets/icons/FacebookIcon'
import React from 'react'

const Footer = () => {
    return (
        <footer className='container'>
            <div className='flex items-center justify-between text-center sm:flex-row flex-col-reverse gap-3 py-5'>
                <p className='text-sm font-normal text-[#8D8D8D]'>© 2024 NFC Feedback Solutions. All rights reserved.</p>
                <div className='flex items-center gap-2'>
                    <a href="#"><FaceBookIcon /></a>
                    <a href="#"><XIcon /></a>
                    <a href="#"><LinkedInIcon /></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer