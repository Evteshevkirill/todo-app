import { Component } from 'react'

export default class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 0,
      isTimerRunning: true,
    }
    this.timer = null
  }

  componentDidMount() {
    const { isTimerRunning } = this.state
    if (isTimerRunning) {
      this.startTimer()
    }
  }

  startTimer = () => {
    const { timeMin, timeSec } = this.props

    let totalSeconds = timeMin * 60 + timeSec

    this.timer = setInterval(() => {
      if (totalSeconds > 0) {
        this.setState((prevState) => ({ time: prevState.time + 1 }))
        totalSeconds -= 1
      } else {
        clearInterval(this.timer)
        this.timer = null
      }
    }, 1000)
  }

  pauseTimer = () => {
    clearInterval(this.timer)
    this.setState({ isTimerRunning: false })
  }

  resumeTimer = () => {
    if (!this.timer) {
      this.startTimer()
      this.setState({ isTimerRunning: true })
    }
  }

  render() {
    const { timeMin, timeSec } = this.props
    const { time } = this.state
    return (
      <>
        <button type="button" className="icon icon-play" aria-label="play timer" onClick={this.resumeTimer} />
        <button type="button" className="icon icon-pause" aria-label="pause timer" onClick={this.pauseTimer} />
        {`${timeMin}:${timeSec} ${time} ${this.timer}`}
      </>
    )
  }
}
