import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Contato from './pages/contato/contato'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <div className='min-h-[80vh]' >
        <Routes>
          <Route path="/" element={<Contato />} />
          <Route path="/contato" element={<Contato />} />
        </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
