import React, { useRef, useState, useEffect } from 'react'

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}
const Timer = (props) => {
  const { timeMin, timeSec, done, id } = props
  const initialTime = timeMin * 60 + timeSec
  const [timeLeft, setTimeLeft] = useState(() => {
    return Number(localStorage.getItem(`timerTime${id}`)) || initialTime
  })
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)
  const pauseTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsRunning(false)
  }
  const startTimer = () => {
    if (isRunning || done || timeLeft <= 0) return
    setIsRunning(true)
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
          }
          intervalRef.current = null
          setIsRunning(false)
          return 0
        }
        localStorage.setItem(`timerTime${id}`, `${prev - 1}`)
        return prev - 1
      })
    }, 1000)
  }
  useEffect(() => {
    const getTime = localStorage.getItem(`timerTime${id}`)
    if (getTime) {
      setTimeLeft(Number(getTime))
    }
    return () => {
      pauseTimer()
    }
  }, [id])
  useEffect(() => {
    if (done) {
      pauseTimer()
    }
  }, [done])
  useEffect(() => {
    localStorage.clear()
  }, [])
  return React.createElement(
    React.Fragment,
    null,
    React.createElement('button', {
      type: 'button',
      className: 'icon icon-play',
      'aria-label': 'play timer',
      onClick: startTimer,
      disabled: isRunning || done || timeLeft <= 0,
    }),
    React.createElement('button', {
      type: 'button',
      className: 'icon icon-pause',
      'aria-label': 'pause timer',
      onClick: pauseTimer,
      disabled: !isRunning || timeLeft <= 0,
    }),
    formatTime(timeLeft)
  )
}
export default Timer
