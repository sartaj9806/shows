import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SelectSeat from './pages/SelectSeat'
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react'
import ProtectedPage from './auth/PrivateRoute'
import PrivateRoute from './auth/PrivateRoute'

const App = () => {
  return (
    <div className='bg-[#101828] ' >

      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/movie/:id' element={<MovieDetails />} />
        <Route path='/select-seat/:id' element={
          <PrivateRoute>
            <SelectSeat />
          </PrivateRoute>
        } />
      </Routes>

      <Footer />

    </div>
  )
}

export default App
