import { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNowStrict } from 'date-fns'

export default class Task extends Component {
  constructor(props) {
    super(props)
    const { todo } = props
    const { description } = todo
    this.state = {
      editValue: description,
    }
  }

  onTaskEditing = (event) => {
    this.setState({
      editValue: event.target.value,
    })
  }

  render() {
    const { todo, deletedTask, onToggleDone, changeTask, onEditTask } = this.props
    const { id, created, description, checked, done, edit, timeMin, timeSec } = todo
    const { editValue } = this.state

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
            onChange={this.onTaskEditing}
            value={editValue}
            checked={checked}
            onClick={(event) => onToggleDone(id, event)}
            onKeyDown={(event) => onToggleDone(id, event)}
          />
          <label htmlFor={id}>
            <span className="title">{description}</span>
            <span className="description">
              <button type="button" className="icon icon-play" aria-label="play timer" />
              <button type="button" className="icon icon-pause" aria-label="pause timer" />
              {timeMin}:{timeSec}
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
