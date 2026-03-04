import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex justify-between py-2 bg-blue-900 text-white'>
            <div className="logo">
                <span className='font-bold text-2xl mx-8'> iTask</span>
            </div>
            <ul className='flex gap-8 mx-9'>
                <li className=' cursor-pointer hover:font-bold transition-all'>Home</li>
                <li className=' cursor-pointer hover:font-bold transition-all'>Your Todos</li>
            </ul>
        </nav>
    )
}

export default Navbar
