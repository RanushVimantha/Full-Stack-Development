import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import ShowtimeDetails from '../components/ShowtimeDetails'
import { AuthContext } from '../context/AuthContext'

const Tickets = () => {
  const { auth } = useContext(AuthContext)
  const [tickets, setTickets] = useState([])
  const [isFetchingticketsDone, setIsFetchingticketsDone] = useState(false)

  const fetchTickets = async () => {
    try {
      setIsFetchingticketsDone(false)
      const response = await axios.get('/auth/tickets', {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })
      setTickets(
        response.data.data.tickets?.sort((a, b) => {
          return a.showtime.showtime > b.showtime.showtime ? 1 : -1
        })
      )
    } catch (error) {
      console.error(error)
    } finally {
      setIsFetchingticketsDone(true)
    }
  }

  useEffect(() => {
    fetchTickets()
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-[#181818] pb-8 text-white">
      <Navbar />
      <div className="mx-4 flex flex-col gap-4 p-4 bg-[#1f1f1f] rounded-md drop-shadow-md sm:mx-8 sm:p-6">
        <h2 className="text-2xl font-bold text-gray-100">My Tickets</h2>
        {isFetchingticketsDone ? (
          tickets.length === 0 ? (
            <p className="text-center text-gray-400">You have not purchased any tickets yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tickets.map((ticket, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-[#262626] text-gray-100 p-4 shadow-md"
                >
                  <ShowtimeDetails showtime={ticket.showtime} />
                  <div className="mt-2 flex flex-col">
                    <p className="text-sm font-medium">
                      <span className="font-semibold">Seats:</span>{' '}
                      {ticket.seats.map(seat => `${seat.row}${seat.number}`).join(', ')}
                    </p>
                    <p className="text-sm text-gray-400">({ticket.seats.length} seats)</p>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <Loading />
        )}
      </div>
    </div>
  )
}

export default Tickets
