import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { movieDetails } from '../assets/assets';
import { minuteToHours } from '../lib/minuteToHours';

const Home = () => {
  const [movie, setMovie] = useState(movieDetails[0]);
  const indexRef = useRef(0);

  useEffect(() => {
    const changeHeroBackground = () => {
      indexRef.current = (indexRef.current + 1) % movieDetails.length;
      setMovie(movieDetails[indexRef.current]);
    };

    const intervalId = setInterval(changeHeroBackground, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <motion.div
      // First time page load animation (Up-to-Down)
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative min-h-screen flex flex-col justify-center px-3 sm:px-4 md:px-[6vw] lg:px-[9vw] text-white bg-center bg-cover"
      style={{
        backgroundImage: `url(${movie.hero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 z-0 bg-black opacity-80"></div>

      {/* Hero Content */}
      <div className="relative overflow-hidden z-10 flex flex-col md:flex-row items-center justify-between w-full gap-6 md:gap-10 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={movie.title} // Important for AnimatePresence to detect change
            initial={{ x: '100%', opacity: 0 }} // Start from right
            animate={{ x: 0, opacity: 1 }} // Slide to center
            exit={{ x: '-100%', opacity: 0 }} // Slide left on exit
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="w-full max-w-2xl text-center md:text-left"
          >
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">{movie.title}</h1>
            <p className="text-sm sm:text-base md:text-lg leading-6 mb-4">{movie.description}</p>
            <p className="text-sm sm:text-base md:text-lg mb-4">
              {`${minuteToHours(movie.duration)} • ${movie.rating} • ${movie.release}`}
            </p>

            {/* Language */}
            <p className="mb-4 flex flex-wrap justify-center md:justify-start">
              Language:&nbsp;
              {movie.language.map((lang, index) => (
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
              {movie.genre.map((genre, index) => (
                <span
                  key={index}
                  className="text-white bg-yellow-500 font-medium rounded-lg px-3 py-[2px] mr-2 mb-2"
                >
                  {genre}
                </span>
              ))}
            </p>

            <p className="text-xl sm:text-2xl font mt-4 mb-4">Price: ₹{movie.price}</p>

            <button
              onClick={() => alert('Hello')}
              className="bg-[#FF0000] text-white px-5 sm:px-6 py-2 rounded-lg font-semibold hover:bg-red-900 transition-all duration-200 ease-in cursor-pointer hover:translate-x-1"
            >
              Book Now
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Right Side Image */}
        <motion.div
          key={movie.thumbnail} // Animate image on change
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-100%', opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="w-3/4 sm:w-3/5 md:max-w-sm"
        >
          <img
            className="rounded-lg shadow-lg w-full object-cover"
            src={movie.thumbnail}
            alt={movie.title}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
