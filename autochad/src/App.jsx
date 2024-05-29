import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GetStarted from './components/GetStarted'
import Search from './components/Search'
import Details from './components/Details'
import RegistrationForm from './components/RegistrationForm'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<GetStarted />} />
      <Route path="/search" element={<Search />} />
      <Route path="/details" element={<Details />} />
      <Route path="/" element={<Search />} />
      <Route path="/register" element={<RegistrationForm />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App