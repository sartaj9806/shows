import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import Card from '../components/Card'
import { IoIosRadioButtonOff, IoIosRadioButtonOn, IoIosArrowDown } from "react-icons/io";
import { motion, AnimatePresence } from 'framer-motion'

const Movies = () => {

    const { movies, genres } = useContext(AppContext)
    const [filterMovies, setFilterMovies] = useState([])
    const [genresFilter, setGenresFilter] = useState([])
    const [languageFilter, setLanguageFilter] = useState([])
    const [priceFilter, setPriceFilter] = useState('Relevance')
    const [isGenres, setIsGenres] = useState(false)
    const [isLanguage, setIsLanguage] = useState(false)

    // For Genres Filter
    const handleGenres = (genre) => {
        const isAvail = genresFilter.find(g => g === genre)
        if (isAvail) {
            setGenresFilter(genresFilter.filter(g => g !== genre))
        } else {
            setGenresFilter((prev) => [...prev, genre])
        }
    }

    // For Language Filter
    const handleLanguage = (language) => {
        const isAvail = languageFilter.find(lang => lang === language)
        if (isAvail) {
            setLanguageFilter(languageFilter.filter(lang => lang !== language))
        } else {
            setLanguageFilter((prev) => [...prev, language])
        }
    }

    // Filter Logic
    useEffect(() => {
        let filtered = movies.slice();

        if (genresFilter.length > 0) {
            filtered = filtered.filter(movie => movie.genres.some(genre => genresFilter.includes(genre)))
        }

        if (languageFilter.length > 0) {
            filtered = filtered.filter(movie => movie.language.some(lang => languageFilter.includes(lang)))
        }

        if (priceFilter === 'High to Low') {
            filtered.sort((a, b) => b.price - a.price)
        } else if (priceFilter === 'Low to High') {
            filtered.sort((a, b) => a.price - b.price)
        } else {
            filtered.sort((a, b) => a._id - b._id);
        }

        setFilterMovies(filtered)
    }, [genresFilter, languageFilter, priceFilter, movies])

    return (
        <div className=' pt-20 min-h-screen flex w-full flex-col items-center px-3 sm:px-4 md:px-[6vw] lg:px-[9vw] text-white' >

            {/* Heading */}
            <motion.h2
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='text-2xl sm:text-3xl font-bold mb-8'
            >
                🎬 All Movies
            </motion.h2>

            {/* Content Section */}
            <div className='flex flex-col md:flex-row gap-4 w-full' >

                {/* Left Side Filter Section */}
                <motion.aside
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className=' flex flex-col items-center w-full md:max-w-[220px] rounded-lg border h-fit'
                >
                    {/* Genre filter */}
                    <div className='mx-10 w-full'>
                        <h3
                            onClick={() => setIsGenres(!isGenres)}
                            className='border cursor-pointer flex items-center justify-between px-4 py-1 rounded-t-lg text-lg font-medium'
                        >
                            Genre <IoIosArrowDown />
                        </h3>

                        <AnimatePresence>
                            {isGenres && genres.map((genre, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    onClick={() => handleGenres(genre.name)}
                                    className='flex gap-4 px-4 items-center cursor-pointer hover:translate-x-1 transition-all duration-500 ease-in my-2'
                                >
                                    {genresFilter.find(g => g === genre.name) ? <IoIosRadioButtonOn /> : <IoIosRadioButtonOff />}
                                    {genre.name}
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Language Filter */}
                    <div className='mx-10 w-full'>
                        <h3
                            onClick={() => setIsLanguage(!isLanguage)}
                            className={`border flex items-center justify-between px-4 py-1 text-lg font-medium ${isLanguage ? 'rounded-b-none' : 'rounded-b-lg'} `}
                        >
                            Language <IoIosArrowDown />
                        </h3>

                        <AnimatePresence>
                            {isLanguage && (
                                <>
                                    {['English', 'Hindi', 'Telugu', 'Tamil'].map((lang, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            onClick={() => handleLanguage(lang)}
                                            className='flex gap-4 px-4 items-center cursor-pointer hover:translate-x-1 transition-all duration-500 ease-in my-2'
                                        >
                                            {languageFilter.find(l => l === lang) ? <IoIosRadioButtonOn /> : <IoIosRadioButtonOff />} {lang}
                                        </motion.li>
                                    ))}
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.aside>

                {/* Right Side Section */}
                <div className='flex flex-col w-full  items-center justify-start' >

                    {/* Top Side Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className='w-full flex justify-end mb-4 px-4 py-2 rounded-lg'
                    >
                        <select
                            onChange={(e) => setPriceFilter(e.target.value)}
                            className={`border px-4 py-1 text-white rounded-lg`}
                        >
                            <option className='bg-black text-white' value="Relevance">Relevance</option>
                            <option className='bg-black text-white' value="Low to High">Low to High</option>
                            <option className='bg-black text-white' value="High to Low">High to Low</option>
                        </select>
                    </motion.div>

                    {/* Movie Card */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
                        }}
                        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mb-16'
                    >
                        {
                            filterMovies.length === 0
                                ? <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center col-span-3 text-lg py-10">No movies found.</motion.div>
                                : filterMovies.map((movie, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Card movie={movie} />
                                    </motion.div>
                                ))
                        }
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Movies
