import { Routes, Route } from 'react-router-dom'
import Welcome from './pages/Welcome'
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
    </Routes>
  )
}

export default App
