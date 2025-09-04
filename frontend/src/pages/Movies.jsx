import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import Card from '../components/Card'
import { IoIosRadioButtonOff, IoIosRadioButtonOn, IoIosArrowDown } from "react-icons/io";


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
            <h2 className='text-2xl sm:text-3xl font-bold mb-8'>🎬 All Movies</h2>

            {/* Content Section */}
            <div className='flex flex-col md:flex-row gap-4 w-full' >

                {/* Left Side Filter Section */}
                <aside className=' flex flex-col items-center w-full md:max-w-[220px]  rounded-lg border h-fit'>
                    {/* Genre filter */}
                    <div className='mx-10  w-full' >
                        <h3 onClick={() => setIsGenres(!isGenres)} className='border cursor-pointer flex items-center justify-between px-4 py-1 rounded-t-lg text-lg font-medium' >Genre <IoIosArrowDown /> </h3>
                        {
                            isGenres && genres.map((genre, index) => (
                                <li onClick={() => handleGenres(genre.name)} key={index} className='flex gap-4 px-4 items-center cursor-pointer hover:translate-x-1 transition-all duration-1000 ease-in my-2' > {genresFilter.find(g => g === genre.name) ? <IoIosRadioButtonOn /> : <IoIosRadioButtonOff />}  {genre.name} </li>
                            ))
                        }
                    </div>

                    {/* Language Filter */}
                    <div className='mx-10  w-full' >
                        <h3 onClick={() => setIsLanguage(!isLanguage)} className={`border flex items-center justify-between px-4 py-1 text-lg font-medium ${isLanguage ? 'rounded-b-none' : 'rounded-b-lg'} `} >Language <IoIosArrowDown /> </h3>

                        {/* Language list */}
                        {
                            isLanguage && (
                                <>
                                    <li onClick={() => handleLanguage('English')} className='flex gap-4 px-4 items-center cursor-pointer hover:translate-x-1 transition-all duration-1000 ease-in my-2 ' > {languageFilter.find(lang => lang === 'English') ? <IoIosRadioButtonOn /> : <IoIosRadioButtonOff />} English </li>
                                    <li onClick={() => handleLanguage('Hindi')} className='flex gap-4 px-4 items-center cursor-pointer hover:translate-x-1 transition-all duration-1000 ease-in my-2 ' > {languageFilter.find(lang => lang === 'Hindi') ? <IoIosRadioButtonOn /> : <IoIosRadioButtonOff />} Hindi </li>
                                    <li onClick={() => handleLanguage('Telugu')} className='flex gap-4 px-4 items-center cursor-pointer hover:translate-x-1 transition-all duration-1000 ease-in my-2 ' > {languageFilter.find(lang => lang === 'Telugu') ? <IoIosRadioButtonOn /> : <IoIosRadioButtonOff />} Telugu </li>
                                    <li onClick={() => handleLanguage('Tamil')} className='flex gap-4 px-4 items-center cursor-pointer hover:translate-x-1 transition-all duration-1000 ease-in my-2 ' > {languageFilter.find(lang => lang === 'Tamil') ? <IoIosRadioButtonOn /> : <IoIosRadioButtonOff />} Tamil </li>
                                </>
                            )
                        }

                    </div>

                </aside>

                {/* Right Side Section */}
                <div className='flex flex-col w-full  items-center justify-start' >
                    {/* Top Side Filter */}
                    <div className='w-full flex justify-end mb-4 px-4 py-2 rounded-lg' >
                        <select onClick={(e) => setPriceFilter(e.target.value)} className={`border px-4 py-1 text-white rounded-lg`} >
                            <option className='bg-black text-white' value="Relevance">Relevance</option>
                            <option className='bg-black text-white' value="Low to High">Low to High</option>
                            <option className='bg-black text-white' value="High to Low">High to Low</option>
                        </select>
                    </div>


                    {/* Movie Card */}
                    <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mb-16' >
                        {
                            filterMovies.length === 0 ? <div className="text-center col-span-3 text-lg py-10">No movies found.</div> : filterMovies.map((movie, index) => (
                                <Card key={index} movie={movie} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Movies
