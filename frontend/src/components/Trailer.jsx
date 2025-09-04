import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';

const Trailer = () => {
    const { movieAllTrailers, selectedMovieTrailer, setSelectedMovieTrailer } = useContext(AppContext);

    

    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }} // start hidden below
            whileInView={{ y: 0, opacity: 1 }} // animate when in view
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            <div className='w-full bg-[#101828] text-white my-20 flex flex-col items-center justify-center px-2'>
                {/* Trailer Section Heading */}
                <h2 className='text-2xl sm:text-3xl font-bold mb-16'>Watch the Trailer</h2>

                {/* Main Trailer Video */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className='w-full max-w-5xl aspect-video mb-8'
                >
                    <iframe
                        className="w-full h-full rounded-lg shadow-lg"
                        src={selectedMovieTrailer}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                </motion.div>

                {/* All trailer Thumbnails */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                    className='w-full max-w-6xl flex flex-wrap md:flex-nowrap gap-4 justify-center items-center overflow-x-auto pb-4'
                >
                    {movieAllTrailers.map((trailer, index) => {
                        const video_id = trailer.split('embed/')[1].split('?')[0];
                        return (
                            <motion.div
                                onClick={() => setSelectedMovieTrailer(trailer)}
                                key={index}
                                className='cursor-pointer flex-shrink-0'
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <img
                                    className='w-[120px] sm:w-[180px] md:w-[220px] rounded-lg'
                                    src={`https://img.youtube.com/vi/${video_id}/mqdefault.jpg`}
                                    alt=""
                                />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Trailer
