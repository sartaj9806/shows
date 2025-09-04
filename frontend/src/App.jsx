import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import Movies from './pages/Movies'

const App = () => {
  return (
    <div className='bg-[#101828] ' >

      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<Movies />} />
      </Routes>

      <Footer />

    </div>
  )
}

export default App
