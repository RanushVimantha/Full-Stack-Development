import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from '../components/Navbar'

import NowShowing from '../components/NowShowing'
import TheaterListsByMovie from '../components/TheaterListsByMovie'
import { AuthContext } from '../context/AuthContext'

const Home = () => {
	const { auth } = useContext(AuthContext)
	const [selectedMovieIndex, setSelectedMovieIndex] = useState(parseInt(sessionStorage.getItem('selectedMovieIndex')))
	const [movies, setMovies] = useState([])
	const [isFetchingMoviesDone, setIsFetchingMoviesDone] = useState(false)

	const fetchMovies = async (data) => {
		try {
			setIsFetchingMoviesDone(false)
			let response
			if (auth.role === 'admin') {
				response = await axios.get('/movie/unreleased/showing', {
					headers: {
						Authorization: `Bearer ${auth.token}`
					}
				})
			} else {
				response = await axios.get('/movie/showing')
			}
			setMovies(response.data.data)
		} catch (error) {
			console.error(error)
		} finally {
			setIsFetchingMoviesDone(true)
		}
	}

	useEffect(() => {
		fetchMovies()
	}, [])

	const props = {
		movies,
		selectedMovieIndex,
		setSelectedMovieIndex,
		auth,
		isFetchingMoviesDone
	}

	return (
		<div className="flex min-h-screen flex-col gap-4 pb-8 sm:gap-8" style={{ backgroundColor: '#181818' }}>

			<Navbar />

			{/* Hero Section with Image and Text */}
			<div className="relative">
				<img src="../src/assest/home.jpeg" alt="Cynema Banner" className="w-full h-[400px] object-cover" />
				<div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
					<h1 className="text-4xl font-bold">Welcome to Ceynema</h1>
					<p className="mt-2 text-lg">The best way to watch movies...</p>
				</div>
			</div>

			{/* Other Components */}
			<NowShowing {...props} />
			{movies[selectedMovieIndex]?.name && <TheaterListsByMovie {...props} />}
		</div>
	)
}

export default Home
