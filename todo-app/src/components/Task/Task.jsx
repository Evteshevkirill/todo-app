import { useState } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNowStrict } from 'date-fns'

import Timer from '../Timer/Timer'

export default function Task(props) {
  const { todo, deletedTask, onToggleDone, changeTask, onEditTask } = props
  const { id, created, description, checked, done, edit, timeMin, timeSec } = todo

  const [editValue, setEditValue] = useState(description)

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
          onChange={(e) => setEditValue(e.target.value)}
          onClick={(event) => onToggleDone(id, event)}
          onKeyDown={(event) => onToggleDone(id, event)}
        />
        <label htmlFor={id}>
          <span className="title">{description}</span>
          <span className="description">
            <Timer timeMin={timeMin} timeSec={timeSec} done={done} />
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
        onChange={(e) => setEditValue(e.target.value)}
        onKeyDown={(event) => changeTask(id, event)}
      />
    </li>
  )
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
