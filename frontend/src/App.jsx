import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='bg-[#101828]' >

      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>

      <Footer />

    </div>
  )
}

export default App
