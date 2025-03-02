import React, { useState } from 'react'
import { formatDistanceToNowStrict } from 'date-fns'

import Timer from '../Timer/Timer'

const Task = (props) => {
  const { todo, deletedTask, onToggleDone, changeTask, onEditTask } = props
  const { id, created, description, checked, done, edit, timeMin, timeSec } = todo
  const [editValue, setEditValue] = useState(description)
  let classNames = ''
  if (done) {
    classNames = 'completed'
  } else if (edit) {
    classNames = 'editing'
  }
  return React.createElement(
    'li',
    { className: classNames },
    React.createElement(
      'div',
      { className: 'view' },
      React.createElement('input', {
        id: `${id}`,
        className: 'toggle',
        type: 'checkbox',
        value: description,
        checked,
        onChange: (e) => setEditValue(e.target.value),
        onClick: (event) => onToggleDone(id, event),
        onKeyDown: (event) => onToggleDone(id, event),
      }),
      React.createElement(
        'label',
        { htmlFor: `${id}` },
        React.createElement('span', { className: 'title' }, description),
        React.createElement(
          'span',
          { className: 'description' },
          React.createElement(Timer, { timeMin, timeSec, done, id })
        ),
        React.createElement(
          'span',
          { className: 'description' },
          `created ${formatDistanceToNowStrict(created, {
            unit: 'second',
            addSuffix: true,
          })}`
        )
      ),
      React.createElement('button', {
        'aria-label': 'Edit Task',
        type: 'button',
        className: 'icon icon-edit',
        onClick: (event) => onEditTask(id, event),
      }),
      React.createElement('button', {
        'aria-label': 'delete Task',
        type: 'button',
        className: 'icon icon-destroy',
        onClick: (event) => deletedTask(id, event),
      })
    ),
    React.createElement('input', {
      type: 'text',
      className: 'edit',
      value: editValue,
      onChange: (e) => setEditValue(e.target.value),
      onKeyDown: (event) => changeTask(id, event),
    })
  )
}
export default Task
