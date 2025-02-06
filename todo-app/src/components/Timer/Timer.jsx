import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

export default function Timer(props) {
  const { timeMin, timeSec, done } = props

  const savedTime = localStorage.getItem('timerTime')

  const initialTime = savedTime ? parseInt(savedTime, 10) : timeMin * 60 + timeSec

  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)

  let intervalRef = useRef()

  const startTimer = () => {
    setIsRunning(true)
    intervalRef = setInterval(() => {
      setTimeLeft((prevState) => {
        if (prevState.timeLeft <= 0) {
          clearInterval(intervalRef)
          return { timeLeft: 0 }
        }
        localStorage.setItem('timerTime', prevState.timeLeft - 1)
        return { timeLeft: prevState.timeLeft - 1 }
      })
    }, 1000)
  }

  const pauseTimer = () => {
    setIsRunning(false)
    clearInterval(intervalRef)
  }

  useEffect(() => {
    if (done) {
      pauseTimer()
      localStorage.setItem('timerTime', timeLeft)
    }

    if (isRunning) {
      startTimer()
    }

    return () => {
      clearInterval(intervalRef)
    }
  }, [done, timeLeft, isRunning])

  useEffect(() => {
    localStorage.clear()
  }, [])

  return (
    <>
      <button
        type="button"
        className="icon icon-play"
        aria-label="play timer"
        onClick={startTimer}
        disabled={isRunning || timeLeft <= 0}
      />
      <button
        type="button"
        className="icon icon-pause"
        aria-label="pause timer"
        onClick={pauseTimer}
        disabled={!isRunning || timeLeft <= 0}
      />
      {formatTime(timeLeft)}
    </>
  )
}

Timer.defaultProps = {
  timeMin: 0,
  timeSec: 0,
  done: false,
}

Timer.propTypes = {
  done: PropTypes.bool,
  timeMin: PropTypes.number,
  timeSec: PropTypes.number,
}
