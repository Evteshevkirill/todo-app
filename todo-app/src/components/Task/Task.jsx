import { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNowStrict } from 'date-fns'

function formatTime(time) {
  const min = Math.floor(time / 60)
  const sec = time % 60
  return `${min}:${sec < 10 ? '0' : ''}${sec}`
}

export default class Task extends Component {
  constructor(props) {
    super(props)
    const { todo } = props

    const { id, description, timeMin, timeSec } = todo

    const savedTime = sessionStorage.getItem(`${id}`)
    const initialTime = savedTime ? parseInt(savedTime, 10) : timeMin * 60 + timeSec

    this.state = {
      id,
      editValue: description,
      time: initialTime,
      isRunning: sessionStorage.getItem(`${id}-isRunning`) === 'true',
      intervalId: null,
    }
    this.formatTime = formatTime.bind(this)
  }

  componentDidMount() {
    const { id } = this.state

    const savedTime = sessionStorage.getItem(`${id}`)
    const isRunning = sessionStorage.getItem(`${id}-isRunning`) === 'true'

    if (savedTime) {
      this.setState({ time: parseInt(savedTime, 10), isRunning })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { time, id, isRunning } = this.state
    if (prevState.time !== time) {
      sessionStorage.setItem(`${id}`, time)
    }
    if (prevState.isRunning !== isRunning) {
      sessionStorage.setItem(`${id}-isRunning`, isRunning)
    }
  }

  componentWillUnmount() {
    const { isRunning, id, time, intervalId } = this.state

    sessionStorage.setItem(`${id}`, time)
    sessionStorage.setItem(`${id}-isRunning`, isRunning)

    if (isRunning) {
      clearInterval(intervalId)
    }
  }

  startTimer = () => {
    const { isRunning, id } = this.state
    if (isRunning) return

    const intervalId = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.time <= 0) {
          clearInterval(intervalId)
          return { time: 0, isRunning: false }
        }

        sessionStorage.setItem(`${id}`, prevState.time - 1)

        return { time: prevState.time - 1 }
      })
    }, 1000)

    this.setState({ isRunning: true, intervalId })
    sessionStorage.setItem(`${id}-isRunning`, 'true')
  }

  pauseTimer = () => {
    const { intervalId, id } = this.state
    clearInterval(intervalId)
    this.setState({ isRunning: false })
    sessionStorage.setItem(`${id}-isRunning`, 'false')
  }

  onTaskEditing = (event) => {
    this.setState({
      editValue: event.target.value,
    })
  }

  render() {
    const { todo, deletedTask, onToggleDone, changeTask, onEditTask } = this.props

    const { id, created, description, checked, done, edit } = todo

    const { editValue, time, isRunning } = this.state

    let classNames = ''
    if (done) {
      classNames = 'completed'
    } else if (edit) {
      classNames = 'editing'
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input
            id={id}
            className="toggle"
            type="checkbox"
            value={editValue}
            checked={checked}
            onChange={this.onTaskEditing}
            onClick={(event) => onToggleDone(id, event)}
            onKeyDown={(event) => onToggleDone(id, event)}
          />
          <label htmlFor={id}>
            <span className="title">{description}</span>
            <span className="description">
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
              {this.formatTime(time)}
            </span>
            <span className="description">{`created ${formatDistanceToNowStrict(created, {
              includeSeconds: true,
              addSuffix: true,
            })}`}</span>
          </label>
          <button
            aria-label="Edit Task"
            type="button"
            className="icon icon-edit"
            onClick={(event) => onEditTask(id, event)}
          />
          <button
            aria-label="delete Task"
            type="button"
            className="icon icon-destroy"
            onClick={(event) => deletedTask(id, event)}
          />
        </div>
        <input
          type="text"
          className="edit"
          value={editValue}
          onChange={this.onTaskEditing}
          onKeyDown={(event) => changeTask(id, event)}
        />
      </li>
    )
  }
}

Task.defaultProps = {
  todo: {},
}

Task.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    min: PropTypes.string,
    sec: PropTypes.string,
    checked: PropTypes.bool,
    done: PropTypes.bool,
    edit: PropTypes.bool,
    created: PropTypes.instanceOf(Date),
  }),
  onToggleDone: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  changeTask: PropTypes.func.isRequired,
  deletedTask: PropTypes.func.isRequired,
}
