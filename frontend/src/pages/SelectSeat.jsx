import React, { useContext, useState } from 'react'
import { buildTransform, motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'

const SelectSeat = () => {

    const { movieShowsTime, setMovieShowsTime } = useContext(AppContext)
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([])

    // Handle Seat Select
    const handleSeatSelect = (seat) => {
        if (selectedDate === null || selectedTime === null) {
            alert("Please select date and time first")
            return
        } else if (selectedSeats.length >= 6 && !selectedSeats.includes(seat)) {
            alert("You can select maximum 6 seats")
            return
        }
        else if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seat))
        } else {
            setSelectedSeats([...selectedSeats, seat])
        }
    }

    // Seat layout
    const groupRows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

    const seatLayout = (rows, count = 12) => {
        return (
            <div key={rows} className='flex flex-wrap gap-2' >
                {Array.from({ length: count }, (_, i) => {
                    const seatNumber = `${rows}${i + 1}`
                    const isSelected = selectedSeats.includes(seatNumber);
                    return (
                        <button key={seatNumber} onClick={() => handleSeatSelect(seatNumber)}
                            className={`border h-8 w-8 rounded-lg cursor-pointer hover:bg-[#1E293B] 
                                ${isSelected ? 'bg-red-500 text-white' : 'bg-gray-300 text-black'}
                                `}
                        >
                            {seatNumber}
                        </button>
                    )
                })}
            </div>
        )
    }

    // Handle Date Select
    const handleSelectDate = (date) => {
        setSelectedDate(date)
        setSelectedTime(null)
        setSelectedSeats([])
    }

    // Handle Time Select
    const handleSelectTime = (time) => {
        if (selectedDate === null) {
            alert("Please select a date first")
            return
        }
        setSelectedTime(time)
    }

    return (
        <div className='pt-20 min-h-screen flex w-full flex-col items-center px-3 sm:px-4 md:px-[6vw] lg:px-[9vw] text-white'>

            {/* Heading */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='text-2xl sm:text-3xl font-bold mb-8'

            >
                🎬 Select Seat
            </motion.h2>

            {/* Content */}
            <div className='flex flex-col md:flex-row  w-full items-start justify-between ' >
                {/* Left Side Data and Time */}
                <motion.aside
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className='w-full md:w-1/4  p-4 rounded-lg mb-6 md:mb-0'
                >
                    {/* Select Date */}
                    <div className='flex flex-col justify-center items-center w-full bg-[#1E293B] mb-8 py-4 rounded-lg' >
                        <h3 className='text-lg font-semibold mb-4 '>Select Date</h3>
                        <div className='flex flex-col gap-4 w-full'>
                            {
                                movieShowsTime.map((show, index) => (
                                    <button onClick={() => handleSelectDate(show.date)} className={`block cursor-pointer hover:bg-red-500 ${selectedDate === show.date && 'bg-red-500'}`} key={index}>
                                        {show.date}
                                    </button>
                                ))
                            }
                        </div>
                    </div>

                    {/*  Select Time */}
                    <div className='flex flex-col justify-center items-center w-full bg-[#1E293B] mb-8 py-4 rounded-lg'  >
                        <h3 className='text-lg font-semibold mb-4 '>Select Date</h3>

                        <div className='flex flex-col w-full rounded-lg gap-4'>
                            {
                                movieShowsTime.filter(show => show.date === selectedDate).map((show, index) => (
                                    <div key={index} className='flex flex-col gap-3' >
                                        {show.time.map((t, idx) => (
                                            <button key={idx} onClick={() => handleSelectTime(t.time)} className={`block cursor-pointer hover:bg-red-500 ${selectedTime === t.time && 'bg-red-500'}`} >
                                                {new Date(t.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </button>
                                        ))}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </motion.aside>

                {/* Right Side Seat Selection */}
                <div className='w-full flex flex-col items-center justify-center' >
                    {/* Screen Div */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className='flex items-center justify-center w-full  min-w-[300px] max-w-xl  h-6 rounded-t-full  bg-[#1E293B] mb-8'

                    >
                        Display
                    </motion.div>

                    {/* Seats Div */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className='flex items-center justify-center w-full max-w-3xl rounded-lg p-6'
                    >
                        <div className='flex flex-wrap flex-col gap-4 items-center p-6' >
                            {groupRows.map(row => seatLayout(row))}
                        </div>
                    </motion.div>
                </div>
            </div>

        </div>
    )
}

export default SelectSeat
