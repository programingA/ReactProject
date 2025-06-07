import './App.css'
import React, {useState} from 'react'
import Header from './component/Header'
import EnterUser from './component/EnterUser'
import FindPassword from './component/FindPassword'
import LoginPage from './component/LoginPage'
import WordsLearning from './component/WordsLearning'
import Community from './component/Community'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Header />} />
        <Route path='/EnterUser' element={<EnterUser />} />
        <Route path='/FindPassword' element={<FindPassword />} />
        <Route path='/LoginPage' element={<LoginPage />} />
        <Route path='/LoginPage/Community' element={<Community />}/>
        <Route path='/LoginPage/WordsLearning' element={<WordsLearning />} />
      </Routes>
    </>
  )
}

export default App
