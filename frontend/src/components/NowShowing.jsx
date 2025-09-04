import React, { useContext } from 'react'
import Card from './Card'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'

const NowShowing = () => {

    const { movies } = useContext(AppContext)

    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >

            {/* Content Start from here */}
            <div className=' my-20 flex w-full flex-col items-center px-3 sm:px-4 md:px-[6vw] lg:px-[9vw] text-white' >

                {/* Section Heading */}
                <h2 className='text-2xl sm:text-3xl font-bold mb-16'>🎬 Now Showing</h2>

                {/* Grid for Movies */}
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mb-16' >
                        {
                            movies.slice(0, 3).map((movie, index) => (
                                <Card key={index} movie={movie} />
                            ))
                        }
                    </div>
                </motion.div>

                <button
                    onClick={() => alert(`Show more section is comming soon`)}
                    className="bg-[#FF0000] text-white px-5 sm:px-6 py-2 rounded-lg font-semibold hover:bg-red-900 transition-all duration-200 ease-in cursor-pointer hover:translate-x-1"
                >
                    Show More
                </button>
            </div>
        </motion.div>
    )
}

export default NowShowing
