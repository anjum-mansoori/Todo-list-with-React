import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 py-3 bg-blue-900 text-white gap-3 sm:gap-0'>

            <div className="logo">
                <span className='font-bold text-2xl'>
                    iTask
                </span>
            </div>

            <ul className='flex gap-4 sm:gap-8 text-lg sm:text-base'>
                <li className='cursor-pointer hover:font-bold transition-all'>
                    Home
                </li>

                <li className='cursor-pointer hover:font-bold transition-all'>
                    Your Todos
                </li>
            </ul>
        </nav>
    )
}

export default Navbar