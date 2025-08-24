import React from 'react'

const Trailer = ({ props }) => {

    const { selectedMovieTrailer, setSelectedMovieTrailer, movieAllTrailers } = props;

    console.log('Trailer props: ', props)

    return (
        <div className='w-full bg-[#101828] text-white flex flex-col items-center justify-center py-12 px-2' >
            {/* Trailer Section Heading */}
            <h2 className='text-2xl sm:text-3xl font-bold mb-4'>Watch the Trailer</h2>

            {/* Main Trailer Video */}
            <div className='w-full max-w-5xl aspect-video mb-8'>
                <iframe
                    className="w-full h-full rounded-lg shadow-lg"
                    src={selectedMovieTrailer}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>

            </div>

            {/* All trailer Thumbnail */}
            <div className='w-full max-w-6xl flex flex-wrap md:flex-nowrap gap-4  justify-center items-center overflow-x-auto pb-4 '>
                {
                    movieAllTrailers.map((trailer, index) => {

                        // console.log('Trailer: ', trailer)
                        const video_id = trailer.split('embed/')[1].split('?')[0];
                        // console.log('Video Id: ', video_id)

                        return (
                            <div onClick={() => setSelectedMovieTrailer(trailer)} key={index} className='cursor-pointer flex-shrink-0' >
                                <img className='w-[120px] sm:w-[180px] md:w-[220px] rounded-lg hover:scale-110 transition-all duration-300 ease-in' src={`https://img.youtube.com/vi/${video_id}/mqdefault.jpg`} alt="" />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Trailer
