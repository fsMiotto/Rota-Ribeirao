import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PlaceDetail from './pages/PlaceDetail'
import Favorites from './pages/Favorites'
import Admin from './pages/Admin'

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/place/:id" element={<PlaceDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </AuthProvider>
  )
}