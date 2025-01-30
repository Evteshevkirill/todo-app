import { Component } from 'react'

export default class Timer extends Component {
  constructor(props) {
    super(props)
    const { timeMin, timeSec, id } = props

    const totalTimeInSeconds = timeMin * 60 + timeSec

    this.state = {
      time: totalTimeInSeconds,
      isRunning: false,
    }

    this.intervalId = null
    this.timerKey = id
  }

  componentDidMount() {
    const savedTime = localStorage.getItem(this.timerKey)
    const savedIsRunning = localStorage.getItem(`${this.timerKey}_isRunning`) === 'true'

    if (savedTime) {
      this.setState({ time: parseInt(savedTime, 10), isRunning: savedIsRunning })
    }

    if (savedIsRunning) {
      this.startTimer()
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
    localStorage.removeItem(this.timerKey)
    localStorage.removeItem(`${this.timerKey}_isRunning`)
  }

  startTimer = () => {
    const { isRunning } = this.state
    if (isRunning) return

    this.intervalId = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.time > 0) {
          const newTime = prevState.time - 1

          localStorage.setItem(this.timerKey, newTime)
          return { time: newTime }
        }

        clearInterval(this.intervalId)
        localStorage.removeItem(this.timerKey)
        localStorage.setItem(`${this.timerKey}_isRunning`, 'false')
        return { isRunning: false }
      })
    }, 1000)

    this.setState({ isRunning: true })
    localStorage.setItem(`${this.timerKey}_isRunning`, 'true')
  }

  pauseTimer = () => {
    clearInterval(this.intervalId)
    this.setState({ isRunning: false })
    localStorage.setItem(`${this.timerKey}_isRunning`, 'false')
  }

  render() {
    const { time, isRunning } = this.state
    const min = Math.floor(time / 60)
    const sec = time % 60

    const displayTime = min > 0 ? `${min}:${sec < 10 ? '0' : ''}${sec}` : `${sec < 10 ? '0' : ''}${sec}`

    return (
      <>
        <button
          type="button"
          className="icon icon-play"
          aria-label="play timer"
          onClick={this.startTimer}
          disabled={isRunning}
        />
        <button
          type="button"
          className="icon icon-pause"
          aria-label="pause timer"
          onClick={this.pauseTimer}
          disabled={!isRunning}
        />
        {displayTime}
      </>
    )
  }
}
