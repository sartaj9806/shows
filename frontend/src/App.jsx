import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

const App = () => {
  return (
    <div className='' >

      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>

    </div>
  )
}

export default App
