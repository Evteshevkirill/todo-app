import React, { useState } from 'react'

const NewTaskForm = ({ newTask }) => {
  const [state, setState] = useState({
    value: '',
    min: '',
    sec: '',
  })
  const { value, min, sec } = state
  const onTaskMin = (event) => {
    setState((prev) => {
      return {
        ...prev,
        min: event.target.value,
      }
    })
  }
  const onTaskSec = (event) => {
    setState((prev) => {
      return {
        ...prev,
        sec: event.target.value,
      }
    })
  }
  const onTaskValue = (event) => {
    setState((prev) => {
      return {
        ...prev,
        value: event.target.value,
      }
    })
  }
  const onSubmit = (event) => {
    event.preventDefault()
    if (value === '' || sec === '' || min === '') return
    if (value.match(/^\s*$/)) return
    if (Number.isNaN(+sec) || Number.isNaN(+min)) return
    newTask(value, min, sec)
    setState({
      value: '',
      min: '',
      sec: '',
    })
  }
  return React.createElement(
    'header',
    { className: 'header' },
    React.createElement('h1', null, 'todos'),
    React.createElement(
      'form',
      { className: 'new-todo-form', onSubmit },
      React.createElement('input', {
        type: 'text',
        className: 'new-todo',
        placeholder: 'Task',
        onChange: onTaskValue,
        value,
      }),
      React.createElement('input', {
        type: 'text',
        className: 'new-todo-form__timer',
        placeholder: 'Min',
        onChange: onTaskMin,
        value: min,
      }),
      React.createElement('input', {
        type: 'text',
        className: 'new-todo-form__timer',
        placeholder: 'Sec',
        onChange: onTaskSec,
        value: sec,
      }),
      React.createElement('button', { disabled: !value || !min || !sec, type: 'submit', 'aria-label': 'submit form' })
    )
  )
}
export default NewTaskForm
