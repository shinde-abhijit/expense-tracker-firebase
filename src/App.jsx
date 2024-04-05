import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {Auth} from './pages/Auth'
import ExpenseTracker from './pages/Expense/ExpenseTracker';
import "bootstrap/dist/css/bootstrap.min.css"


function App() {

  return (
    <>
      <div className='bg-dark-500 px-6'>
        <Router>
          <Routes>
            <Route path="/" exact element={<Auth />} />
            <Route path="/expense-tracker" element={<ExpenseTracker />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
