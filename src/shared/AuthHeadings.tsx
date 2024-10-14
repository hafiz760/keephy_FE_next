import React from 'react'

interface HeadingProps {
    heading: String;
    description?: String | null;
    red?: Boolean
    business?: Boolean
}

const AuthHeadings: React.FC<HeadingProps> = ({ heading, description, red, business }) => {
    return (
        <div className={business ? '' : 'container mb-11'}>
            <div className={`flex flex-col ${business ? 'items-start' : 'items-center text-center'}`}>
                <h2 className='sm:text-3xl text-2xl font-medium text-black capitalize'>{heading}</h2>
                <p className={`text-sm font-normal max-w-lg ${red ? 'text-[#FB2525]' : 'text-[#8D8D8D]'}`}>{description}</p>
            </div>
        </div>
    )
}

export default AuthHeadings