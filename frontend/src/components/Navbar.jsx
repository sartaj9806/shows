import React, { useState } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";


const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className='fixed w-full mt-2 px-2 lg:px-[8vw] md:px-[5vw]'>
            <div className='flex justify-between items-center' >
                <div className="sansita text-2xl md:text-3xl font-bold">
                    a1<span className='text-[#FF0000]'>shows</span>.in
                </div>

                <nav className='md:flex hidden gap-4 bg-[#d9d9d983] px-4 py-1 rounded-full text-lg font-medium ' >
                    <NavLink className='hover:-translate-y-0.5 transition-all duration-200 ease-in px-2 py-1 rounded-lg  ' to='/'>Home</NavLink>
                    <NavLink className='hover:-translate-y-0.5 transition-all duration-200 ease-in px-2 py-1 rounded-lg  ' to='/movies'>Movies</NavLink>
                    <NavLink className='hover:-translate-y-0.5 transition-all duration-200 ease-in px-2 py-1 rounded-lg  ' to='/theaters'>Theaters</NavLink>
                    <NavLink className='hover:-translate-y-0.5 transition-all duration-200 ease-in px-2 py-1 rounded-lg  ' to='/bookings'>My Bookings</NavLink>
                </nav>

                <div className='flex items-center gap-2'>
                    <div className='text-2xl md:text-3xl'>
                        <FaUserCircle />
                    </div>

                    <div onClick={() => setIsOpen(!isOpen)} className='md:hidden text-2xl transition-all duration-200 ease-in cursor-pointer hover:scale-110'>

                        { 
                            isOpen ? <IoMdClose /> : <FaBars />
                        }

                    </div>

                </div>


                {isOpen && (
                    <nav className='absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 w-48'>
                        <div className='flex flex-col gap-2 font-medium text-lg'>
                            <NavLink onClick={() => setIsOpen(false)} className='hover:-translate-y-0.5 transition-all duration-200 ease-in px-2 py-1 rounded-lg  ' to='/'>Home</NavLink>
                            <NavLink onClick={() => setIsOpen(false)} className='hover:-translate-y-0.5 transition-all duration-200 ease-in px-2 py-1 rounded-lg  ' to='/movies'>Movies</NavLink>
                            <NavLink onClick={() => setIsOpen(false)} className='hover:-translate-y-0.5 transition-all duration-200 ease-in px-2 py-1 rounded-lg  ' to='/theaters'>Theaters</NavLink>
                            <NavLink onClick={() => setIsOpen(false)} className='hover:-translate-y-0.5 transition-all duration-200 ease-in px-2 py-1 rounded-lg  ' to='/bookings'>My Bookings</NavLink>
                        </div>
                    </nav>
                )}


            </div>


        </div>
    )
}

export default Navbar
