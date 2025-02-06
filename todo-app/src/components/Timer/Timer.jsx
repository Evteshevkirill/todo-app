import { Component } from 'react'
import PropTypes from 'prop-types'

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

export default class Timer extends Component {
  constructor(props) {
    super(props)
    const { timeMin, timeSec } = props

    const savedTime = localStorage.getItem('timerTime')

    const initialTime = savedTime ? parseInt(savedTime, 10) : timeMin * 60 + timeSec

    this.state = {
      timeLeft: initialTime,
      isRunning: false,
    }

    this.intervalRef = null
    this.formatTime = formatTime.bind(this)
  }

  componentDidUpdate(prevProps) {
    const { done } = this.props

    if (done !== prevProps.done) {
      this.pauseTimer()
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalRef)
    localStorage.removeItem('timerTime')
  }

  startTimer = () => {
    this.setState({ isRunning: true })

    this.intervalRef = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.timeLeft <= 0) {
          clearInterval(this.intervalRef)
          return { timeLeft: 0 }
        }
        localStorage.setItem('timerTime', prevState.timeLeft - 1)
        return { timeLeft: prevState.timeLeft - 1 }
      })
    }, 1000)
  }

  pauseTimer = () => {
    clearInterval(this.intervalRef)

    this.setState({ isRunning: false })
  }

  render() {
    const { timeLeft, isRunning } = this.state
    const { done } = this.props
    return (
      <>
        <button
          type="button"
          className="icon icon-play"
          aria-label="play timer"
          onClick={this.startTimer}
          disabled={isRunning || done || timeLeft === 0}
        />
        <button
          type="button"
          className="icon icon-pause"
          aria-label="pause timer"
          onClick={this.pauseTimer}
          disabled={!isRunning || timeLeft === 0}
        />
        {this.formatTime(timeLeft)}
      </>
    )
  }
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
