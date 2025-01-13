import axios from 'axios'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoggingOut, SetLoggingOut] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const navigate = useNavigate()

  const onLogout = async () => {
    try {
      SetLoggingOut(true)
      await axios.get('/auth/logout')
      setAuth({ username: null, email: null, role: null, token: null })
      sessionStorage.clear()
      navigate('/')
      toast.success('Logout successful!', {
        position: 'top-center',
        autoClose: 2000,
        pauseOnHover: false,
      })
    } catch (error) {
      console.error(error)
      toast.error('Error', {
        position: 'top-center',
        autoClose: 2000,
        pauseOnHover: false,
      })
    } finally {
      SetLoggingOut(false)
    }
  }

  const menuLists = () => {
    return (
      <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-center">
        <Link
          to={'/cinema'}
          className={`px-4 py-2 font-bold text-white hover:text-[#FFCC00] transition-all ${
            window.location.pathname === '/cinema' ? 'text-[#FFCC00]' : ''
          }`}
        >
          Cinema
        </Link>
        <Link
          to={'/schedule'}
          className={`px-4 py-2 font-bold text-white hover:text-[#FFCC00] transition-all ${
            window.location.pathname === '/schedule' ? 'text-[#FFCC00]' : ''
          }`}
        >
          Schedule
        </Link>
        {auth.role && (
          <Link
            to={'/ticket'}
            className={`px-4 py-2 font-bold text-white hover:text-[#FFCC00] transition-all ${
              window.location.pathname === '/ticket' ? 'text-[#FFCC00]' : ''
            }`}
          >
            Ticket
          </Link>
        )}
        {auth.role === 'admin' && (
          <>
            <Link
              to={'/movie'}
              className={`px-4 py-2 font-bold text-white hover:text-[#FFCC00] transition-all ${
                window.location.pathname === '/movie' ? 'text-[#FFCC00]' : ''
              }`}
            >
              Movie
            </Link>
            <Link
              to={'/user'}
              className={`px-4 py-2 font-bold text-white hover:text-[#FFCC00] transition-all ${
                window.location.pathname === '/user' ? 'text-[#FFCC00]' : ''
              }`}
            >
              User
            </Link>
          </>
        )}
      </div>
    )
  }

  return (
    <nav className="w-full z-50 flex flex-col items-center justify-center gap-4 bg-black px-4 py-3 drop-shadow-lg lg:flex-row lg:justify-between sm:px-8">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <h1
          className="font-bold text-[#FFCC00]"
          style={{
            fontFamily: 'Arial',
            fontSize: '26px',
          }}
        >
          Ceynema
        </h1>
      </div>
      <div className="flex flex-1 justify-center">{menuLists()}</div>
      <div className="hidden lg:flex items-center gap-4">
        {auth.username && (
          <p
            className="text-md leading-none font-bold text-white"
            style={{ fontFamily: 'Arial' }}
          >
            Welcome {auth.username}!
          </p>
        )}
        {auth.token ? (
          <button
            className="rounded-lg px-4 py-2 font-bold transition-all hover:bg-[#E6B800] disabled:bg-gray-500"
            style={{
              fontFamily: 'Arial',
              backgroundColor: '#FFCC00',
              color: 'black',
            }}
            onClick={() => onLogout()}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? 'Processing...' : 'Logout'}
          </button>
        ) : (
          <Link
            to={'/login'}
            className="rounded-lg px-4 py-2 font-bold transition-all hover:bg-[#E6B800]"
            style={{
              fontFamily: 'Arial',
              backgroundColor: '#FFCC00',
              color: 'black',
            }}
          >
            Login
          </Link>
        )}
      </div>
      {menuOpen && <div className="flex w-full flex-col gap-2 lg:hidden">{menuLists()}</div>}
      <button
        className="lg:hidden text-white"
        onClick={() => toggleMenu()}
      >
        Menu
      </button>
    </nav>
  )
}

export default Navbar
