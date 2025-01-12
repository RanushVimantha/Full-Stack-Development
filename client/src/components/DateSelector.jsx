import { ArrowPathIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/AuthContext'

const DateSelector = ({ selectedDate, setSelectedDate }) => {
	const { auth } = useContext(AuthContext)
	const wrapperRef = useRef(null)
	const [isEditing, SetIsEditing] = useState(false)

	const handlePrevDay = () => {
		const prevDay = new Date(selectedDate)
		prevDay.setDate(prevDay.getDate() - 1)
		setSelectedDate(prevDay)
		sessionStorage.setItem('selectedDate', prevDay)
	}

	const handleNextDay = () => {
		const nextDay = new Date(selectedDate)
		nextDay.setDate(nextDay.getDate() + 1)
		setSelectedDate(nextDay)
		sessionStorage.setItem('selectedDate', nextDay)
	}

	const handleToday = () => {
		const today = new Date()
		setSelectedDate(today)
		sessionStorage.setItem('selectedDate', today)
	}

	const formatDate = (date) => {
		const weekday = date.toLocaleString('default', { weekday: 'long' })
		const day = date.getDate()
		const month = date.toLocaleString('default', { month: 'long' })
		const year = date.getFullYear()
		return `${weekday} ${day} ${month} ${year}`
	}

	const DateShort = ({ date, selectedDate }) => {
		const day = date.getDate()
		const weekday = date.toLocaleString('default', { weekday: 'short' })

		const isThisDate =
			selectedDate.getDate() === date.getDate() &&
			selectedDate.getMonth() === date.getMonth() &&
			selectedDate.getFullYear() === date.getFullYear()

		const isToday = new Date(date).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)

		return (
			<button
				title={formatDate(date)}
				className={`flex min-w-[40px] flex-col items-center justify-center rounded p-1 font-semibold text-sm ${
					isThisDate
						? 'bg-[#FFCC00] text-white'
						: isToday
						? 'bg-gradient-to-br from-indigo-100 to-white ring-2 ring-inset ring-indigo-800'
						: isPast(date)
						? 'bg-gradient-to-br from-gray-600 to-gray-500 text-white'
						: 'bg-gradient-to-br from-indigo-100 to-white'
				}`}
				onClick={() => {
					setSelectedDate(date)
					sessionStorage.setItem('selectedDate', date)
				}}
			>
				<p>{weekday}</p>
				<p className="text-xl">{day}</p>
			</button>
		)
	}

	const isPast = (date) => {
		return new Date(date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
	}

	const handleChange = (event) => {
		setSelectedDate(new Date(event.target.value))
	}

	function generateDateRange(startDate, endDate) {
		const dates = []
		const currentDate = new Date(startDate)

		while (currentDate <= endDate) {
			dates.push(new Date(currentDate.getTime()))
			currentDate.setDate(currentDate.getDate() + 1)
		}

		return dates
	}

	function getPastAndNextDateRange() {
		const today = new Date()
		const pastDays = new Date(today)
		if (auth.role === 'admin') {
			pastDays.setDate(today.getDate() - 7)
		}

		const nextDays = new Date(today)
		nextDays.setDate(today.getDate() + 14)

		return generateDateRange(pastDays, nextDays)
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, false)
		return () => {
			document.removeEventListener('click', handleClickOutside, false)
		}
	}, [])

	const handleClickOutside = (event) => {
		if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
			SetIsEditing(false)
		}
	}

	return (
		<div className="flex flex-col gap-2">
			<div className="relative flex items-stretch justify-between gap-2 rounded-md bg-[#9A9A9A] p-2 text-white">
				{auth.role === 'admin' || !isPast(new Date().setDate(selectedDate.getDate() - 1)) ? (
					<button
						title="Go to yesterday"
						className="rounded hover:bg-[#5E5E5E] p-2"
						onClick={handlePrevDay}
					>
						<ChevronLeftIcon className="h-6 w-6 text-white" />
					</button>
				) : (
					<div className="h-6 w-6"></div>
				)}

				{isEditing ? (
					<div className="w-full" ref={wrapperRef}>
						<input
							title="Select date"
							type="date"
							min={auth.role !== 'admin' && new Date().toLocaleDateString('en-CA')}
							required
							autoFocus
							className="w-full rounded text-center bg-[#5E5E5E] p-2 text-lg"
							value={selectedDate.toLocaleDateString('en-CA')}
							onChange={handleChange}
						/>
					</div>
				) : (
					<div
						className="flex w-full items-center justify-center rounded text-center text-sm cursor-pointer"
						onClick={() => SetIsEditing(true)}
					>
						{formatDate(selectedDate)}
					</div>
				)}

				<div className="flex items-center justify-between gap-2">
					<button
						title="Go to tomorrow"
						className="rounded hover:bg-[#5E5E5E] p-2"
						onClick={handleNextDay}
					>
						<ChevronRightIcon className="h-6 w-6 text-white" />
					</button>
					<button
						title="Go to today"
						className="rounded p-2 hover:bg-[#5E5E5E]"
						onClick={handleToday}
					>
						<ArrowPathIcon className="h-6 w-6 text-white" />
					</button>
				</div>
			</div>
			<div className="flex gap-2 overflow-auto">
				{getPastAndNextDateRange().map((date, index) => (
					<DateShort key={index} date={date} selectedDate={selectedDate} />
				))}
			</div>
			{/* Show Time Button */}
			
		</div>
	)
}

export default DateSelector
