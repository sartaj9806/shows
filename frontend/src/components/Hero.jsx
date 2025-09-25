import React, { useContext, useEffect, useRef } from 'react'
import { AppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { minuteToHours } from '../lib/minuteToHours';
import { ISOToDateFormate } from '../lib/ISOToDateFormate';
import { useNavigate } from 'react-router-dom';

const Hero = () => {

    const { movieForHero, setMovieForHero, movies, setSelectedMovieTrailer, } = useContext(AppContext)

    const navigate = useNavigate();

    const indexRef = useRef(0);

    useEffect(() => {
        const changeHeroBackground = () => {
            indexRef.current = (indexRef.current + 1) % movies.length;
            setMovieForHero(movies[indexRef.current]);
        };

        const intervalId = setInterval(changeHeroBackground, 10000);
        return () => clearInterval(intervalId);
    }, []);


    return (
        <div
            className="relative min-h-screen flex flex-col justify-center px-3 sm:px-4 md:px-[6vw] lg:px-[9vw] text-white bg-center bg-cover"
            style={{
                backgroundImage: `url(${movieForHero.hero})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Black overlay */}
            <div className="absolute inset-0 z-0 bg-black opacity-80"></div>

            {/* Hero Content */}
            <div className="relative overflow-hidden z-10 flex flex-col md:flex-row items-center justify-between w-full gap-6 md:gap-10 py-12">

                {/* Hero Content Left Side */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={movieForHero.title} // Important for AnimatePresence to detect change
                        initial={{ x: '100%', opacity: 0 }} // Start from right
                        animate={{ x: 0, opacity: 1 }} // Slide to center
                        exit={{ x: '-100%', opacity: 0 }} // Slide left on exit
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                        className="w-full max-w-2xl text-center md:text-left"
                    >
                        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">{movieForHero.title}</h1>
                        <p className="text-sm sm:text-base md:text-lg leading-6 mb-4">{movieForHero.description}</p>
                        <p className="text-sm sm:text-base md:text-lg mb-4">
                            {`${minuteToHours(movieForHero.duration)} • ${movieForHero.rating} • ${ISOToDateFormate(movieForHero.release_date)}`}
                        </p>

                        {/* Language */}
                        <p className="mb-4 flex flex-wrap justify-center md:justify-start">
                            Language:&nbsp;
                            {movieForHero.language.map((lang, index) => (
                                <span
                                    key={index}
                                    className="text-white bg-yellow-500 font-medium rounded-lg px-3 py-[2px] mr-2 mb-2"
                                >
                                    {lang}
                                </span>
                            ))}
                        </p>

                        {/* Genre */}
                        <p className="mb-4 flex flex-wrap justify-center md:justify-start">
                            Genre:&nbsp;
                            {movieForHero.genres.map((genre, index) => (
                                <span
                                    key={index}
                                    className="text-white bg-yellow-500 font-medium rounded-lg px-3 py-[2px] mr-2 mb-2"
                                >
                                    {genre}
                                </span>
                            ))}
                        </p>

                        <p className="text-xl sm:text-2xl font mt-4 mb-4">Price: ₹{movieForHero.price}</p>

                        <button
                            onClick={() => navigate(`/movie/${movieForHero._id}`)}
                            className="bg-[#FF0000] text-white px-5 sm:px-6 py-2 rounded-lg font-semibold hover:bg-red-900 transition-all duration-200 ease-in cursor-pointer hover:translate-x-1"
                        >
                            Book Now
                        </button>
                    </motion.div>
                </AnimatePresence>

                {/* Right Side Image */}
                <motion.div
                    key={movieForHero.thumbnail} // Animate image on change
                    initial={{ x: '100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: '-100%', opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="w-3/4 sm:w-3/5 md:max-w-sm relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
                >
                    <img
                        onClick={() => setSelectedMovieTrailer(movieForHero.trailer)}
                        className="rounded-lg shadow-lg w-full object-cover hover:scale-105 transition-all duration-300 ease-in cursor-pointer "
                        src={movieForHero.thumbnail}
                        alt={movieForHero.title}
                    />

                    <button
                        onClick={() => setSelectedMovieTrailer(movieForHero.trailer)}
                        className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 ease-in cursor-pointer'
                    >
                        Watch Trailer
                    </button>

                </motion.div>
            </div>
        </div>
    )
}

export default Hero
