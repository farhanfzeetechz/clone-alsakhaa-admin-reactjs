import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './views/page/login/login'
import DefaultLayout from './layout/DefaultLayout'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<DefaultLayout />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
