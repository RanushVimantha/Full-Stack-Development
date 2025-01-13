import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'
import MovieLists from '../components/MovieLists'
import Navbar from '../components/Navbar'
import { AuthContext } from '../context/AuthContext'

const Movie = () => {
  const { auth } = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm()

  const [movies, setMovies] = useState([])
  const [isFetchingMoviesDone, setIsFetchingMoviesDone] = useState(false)
  const [isAddingMovie, SetIsAddingMovie] = useState(false)

  const fetchMovies = async (data) => {
    try {
      setIsFetchingMoviesDone(false)
      const response = await axios.get('/movie')
      reset()
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

  const onAddMovie = async (data) => {
    try {
      data.length = (parseInt(data.lengthHr) || 0) * 60 + (parseInt(data.lengthMin) || 0)
      SetIsAddingMovie(true)
      const response = await axios.post('/movie', data, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })
      fetchMovies()
      toast.success('Add movie successful!', {
        position: 'top-center',
        autoClose: 2000,
        pauseOnHover: false
      })
    } catch (error) {
      console.error(error)
      toast.error('Error', {
        position: 'top-center',
        autoClose: 2000,
        pauseOnHover: false
      })
    } finally {
      SetIsAddingMovie(false)
    }
  }

  const handleDelete = (movie) => {
    const confirmed = window.confirm(
      `Do you want to delete movie ${movie.name}, including its showtimes and tickets?`
    )
    if (confirmed) {
      onDeleteMovie(movie._id)
    }
  }

  const onDeleteMovie = async (id) => {
    try {
      const response = await axios.delete(`/movie/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })
      fetchMovies()
      toast.success('Delete movie successful!', {
        position: 'top-center',
        autoClose: 2000,
        pauseOnHover: false
      })
    } catch (error) {
      console.error(error)
      toast.error('Error', {
        position: 'top-center',
        autoClose: 2000,
        pauseOnHover: false
      })
    }
  }

  const inputHr = parseInt(watch('lengthHr')) || 0
  const inputMin = parseInt(watch('lengthMin')) || 0
  const sumMin = inputHr * 60 + inputMin
  const hr = Math.floor(sumMin / 60)
  const min = sumMin % 60

  return (
    <div className="flex min-h-screen flex-col gap-4 bg-[#181818] pb-8 text-gray-900 sm:gap-8">
      <Navbar />
      <div className="mx-4 flex h-fit flex-col gap-4 rounded-md bg-[#181818] p-4 drop-shadow-xl sm:mx-8 sm:p-6">
        <h2 className="text-3xl font-bold text-white">Movie Lists</h2>
        <form
          onSubmit={handleSubmit(onAddMovie)}
          className="flex flex-col items-center justify-center gap-4 rounded-xl bg-[#5E5E5E] p-4 drop-shadow-lg lg:flex-row lg:gap-8"
        >
          {/* Left Column: Movie Information */}
          <div className="flex flex-col gap-3 w-full lg:w-1/2">
            <h3 className="text-2xl font-bold text-white">Add Movie</h3>

            {/* Movie Name Input */}
            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-white">Movie Name</label>
              <input
                type="text"
                required
                className="w-full rounded-lg p-2 bg-[#3A3A3A] text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:border-transparent"
                {...register('name', { required: true })}
              />
            </div>

            {/* Movie Poster URL Input */}
            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-white">Poster URL</label>
              <input
                type="text"
                required
                className="w-full rounded-lg p-2 bg-[#3A3A3A] text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:border-transparent"
                {...register('img', { required: true })}
              />
            </div>

            {/* Movie Length Inputs */}
            <div className="flex gap-4 w-full">
              {/* Length Hours */}
              <div className="flex flex-col w-1/2 gap-2">
                <label className="text-lg font-semibold text-white">Length (hrs.)</label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  className="w-full rounded-lg p-2 bg-[#3A3A3A] text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:border-transparent"
                  {...register('lengthHr')}
                />
              </div>

              {/* Length Minutes */}
              <div className="flex flex-col w-1/2 gap-2">
                <label className="text-lg font-semibold text-white">Length (min.)</label>
                <input
                  type="number"
                  min="0"
                  max="2000"
                  required
                  className="w-full rounded-lg p-2 bg-[#3A3A3A] text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:border-transparent"
                  {...register('lengthMin', { required: true })}
                />
              </div>
            </div>
            <div className="text-right text-sm text-gray-300">{`${hr}h ${min}m / ${sumMin}m`}</div>
          </div>

          {/* Right Column: Movie Poster Preview and Submit */}
          <div className="flex flex-col items-center justify-center w-full lg:w-1/2 gap-4">
            {/* Movie Poster Preview */}
            {watch('img') && (
              <img
                src={watch('img')}
                className="h-40 w-auto rounded-lg object-contain shadow-lg"
              />
            )}

            {/* Submit Button */}
            <button
              className="w-full min-w-[150px] rounded-md bg-[#FFCC00] py-2 text-lg font-medium text-black hover:bg-[#FFB100] disabled:bg-slate-500"
              type="submit"
              disabled={isAddingMovie}
            >
              {isAddingMovie ? 'Processing...' : 'Add Movie'}
            </button>
          </div>
        </form>

        {/* Search Movie */}
        <div className="relative drop-shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 stroke-2 text-gray-500" />
          </div>
          <input
            type="search"
            className="block w-full rounded-lg border border-gray-300 p-2 pl-10 text-gray-900"
            placeholder="Search movie"
            {...register('search')}
          />
        </div>

        {/* Movie List Display */}
        {isFetchingMoviesDone ? (
          <MovieLists movies={movies} search={watch('search')} handleDelete={handleDelete} />
        ) : (
          <Loading />
        )}
      </div>
    </div>
  )
}

export default Movie
