import './App.css'
import React, {useState} from 'react'
import Header from './conentes/Header'
import EnterUser from './conentes/EnterUser'
import FindPassword from './uncomplete/FindPassword'
import LoginPage from './conentes/LoginPage'
import WordsLearning from './conentes/WordsLearning'
import Footer from './uncomplete/Footer'
import Main from './uncomplete/Main'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Header />} />
        <Route path='/EnterUser' element={<EnterUser />} />
        <Route path='/FindPassword' element={<FindPassword />} />
        <Route path='/LoginPage' element={<LoginPage />} />
        <Route path='/LoginPage/WordsLearning' element={<WordsLearning />} />
      </Routes>
    </>
  )
}

export default App
