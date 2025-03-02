import React, { useState, JSX } from 'react'
import { formatDistanceToNowStrict } from 'date-fns'

import Timer from '../Timer/Timer'
import { Todo } from '../types/types'

interface TaskProps {
  todo: Todo
  deletedTask: (id: number, event: React.MouseEvent<HTMLButtonElement>) => void
  onToggleDone: (id: number, event: React.SyntheticEvent) => void
  changeTask: (id: number, event: React.KeyboardEvent<HTMLInputElement>) => void
  onEditTask: (id: number, event: React.MouseEvent<HTMLButtonElement>) => void
}

const Task: React.FC<TaskProps> = (props): JSX.Element => {
  const { todo, deletedTask, onToggleDone, changeTask, onEditTask } = props

  const { id, created, description, checked, done, edit, timeMin, timeSec } = todo

  const [editValue, setEditValue] = useState<string>(description)

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
          id={`${id}`}
          className="toggle"
          type="checkbox"
          value={description}
          checked={checked}
          onChange={(e) => setEditValue(e.target.value)}
          onClick={(event) => onToggleDone(id, event)}
          onKeyDown={(event) => onToggleDone(id, event)}
        />
        <label htmlFor={`${id}`}>
          <span className="title">{description}</span>
          <span className="description">
            <Timer timeMin={timeMin} timeSec={timeSec} done={done} id={id} />
          </span>
          <span className="description">{`created ${formatDistanceToNowStrict(created, {
            unit: 'second',
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

export default Task
