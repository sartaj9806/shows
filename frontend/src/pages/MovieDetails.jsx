import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { moviesCasting } from '../assets/assets';
import Card from '../components/Card';
import { motion } from 'framer-motion';

const MovieDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const { movies } = useContext(AppContext)
    const [movie, setMovie] = useState({})

    useEffect(() => {
        setMovie(movies.find(m => m._id === Number(id)))
    }, [id, movies])

    return (
        <div className='pt-20 min-h-screen flex w-full flex-col items-center px-3 sm:px-4 md:px-[6vw] lg:px-[9vw] text-white' >

            {/* Top Content */}
            <div className='flex flex-col md:flex-row items-center justify-center gap-10  w-full mt-12' >

                {/* Top Left content Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className='w-full sm:w-3/5 md:max-w-md overflow-hidden rounded-lg shadow-lg'
                >
                    <img className='rounded-lg shadow-lg w-full object-cover' src={movie.thumbnail} alt="" />
                </motion.div>

                {/* Top Right content */}
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className='flex flex-col max-w-3xl'
                >
                    <motion.h1
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-10'
                    >
                        {movie.title}
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className='text-sm md:text-lg text-gray-400 mb-3'
                    >
                        {movie.description}
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className='text-sm md:text-lg text-gray-400 mt-3'
                    >
                        {new Date(movie.release_date).getFullYear()} • {movie?.genres?.join(' | ')} • {movie?.duration} mins
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className='flex gap-4 mt-8'
                    >
                        <Link
                            to={movie.trailer}
                            target='_blank'
                            rel='noopener noreferrer'
                            className="border border-white text-white px-5 sm:px-6 py-2 rounded-lg font-semibold transition-all duration-200 ease-in cursor-pointer hover:translate-x-1"
                        >
                            Watch Trailer
                        </Link>

                        <button
                            onClick={() => navigate(`/select-seat/${movie._id}`)}
                            className="bg-[#FF0000] text-white px-5 sm:px-6 py-2 rounded-lg font-semibold hover:bg-red-900 transition-all duration-200 ease-in cursor-pointer hover:translate-x-1"
                        >
                            Book Now
                        </button>
                    </motion.div>
                </motion.div>

            </div>

            {/* Cast section  */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className='w-full mt-10 md:mt-16 flex flex-col items-center justify-center'
            >
                <h2 className='text-2xl sm:text-3xl font-bold mb-8'>Cast</h2>
                <div className='flex flex-wrap gap-2 ' >
                    {
                        moviesCasting.map((cast, index) => (
                            <motion.div
                                key={index}
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className='rounded-full w-[50px] h-[50px] sm:w-[100px] sm:h-[100px] overflow-hidden'
                            >
                                <img className='rounded-full w-fit object-cover ' src={cast.image} alt="" />
                            </motion.div>
                        ))
                    }
                </div>
            </motion.div>

            {/* Relevant */}
            <div className='w-full mt-10 md:mt-16 flex flex-col items-center justify-center' >
                <h2 className='text-2xl sm:text-3xl font-bold mb-8 transition-all duration-300 ease-in' > 🎬 Relevant Movies</h2>

                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mb-16' >
                        {
                            movies.filter(m => m.genres?.some(r => movie.genres?.includes(r)) && m._id !== movie._id).slice(0, 3).map((reMovie, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                >
                                    <Card movie={reMovie} />
                                </motion.div>
                            ))
                        }
                    </div>
                </motion.div>
            </div>

        </div>
    )
}

export default MovieDetails
