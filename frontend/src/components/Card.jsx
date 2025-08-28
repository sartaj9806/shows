import React from 'react'
import { minuteToHours } from '../lib/minuteToHours'
import { useNavigate } from 'react-router-dom'

const Card = ({ movie }) => {
    const navigate = useNavigate();

    return (
        <div className='border rounded-lg p-3 flex flex-col justify-between max-h-[450px]'>

            {/* Top Section: Image + Info */}
            <div>
                {/* Movie Thumbnail */}
                <div className='overflow-hidden rounded-lg'>
                    <img
                        onClick={() => {
                            navigate(`/movie/${movie._id}`);
                            scroll(0, 0);
                        }}
                        className='w-full aspect-square object-cover object-center rounded-lg cursor-pointer transition-all duration-300 ease-in hover:scale-110'
                        src={movie.thumbnail}
                        alt={movie.title}
                    />
                </div>

                {/* Movie Title */}
                <h3 className='text-xl font-bold text-white mt-3 line-clamp-2'>{movie.title}</h3>

                {/* Movie Info */}
                <p className='text-sm text-gray-400 mt-2'>
                    {new Date(movie.release_date).getFullYear()} • {movie.genres.slice(0, 2).join(' | ')} • {minuteToHours(movie.duration)}
                </p>
            </div>

            {/* Bottom Section: Book Now Button */}
            <button
                onClick={() => {
                    navigate(`/movie/${movie._id}`);
                    scroll(0, 0);
                }}
                className="mt-4 bg-[#FF0000] text-white px-5 sm:px-6 py-2 rounded-lg font-semibold hover:bg-red-900 transition-all duration-200 ease-in cursor-pointer hover:translate-x-1"
            >
                Book Now
            </button>
        </div>
    )
}

export default Card
