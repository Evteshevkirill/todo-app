import { useState } from 'react'
import PropTypes from 'prop-types'

export default function NewTaskForm({ newTask }) {
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

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input type="text" className="new-todo" placeholder="Task" onChange={onTaskValue} value={value} />
        <input type="text" className="new-todo-form__timer" placeholder="Min" onChange={onTaskMin} value={min} />
        <input type="text" className="new-todo-form__timer" placeholder="Sec" onChange={onTaskSec} value={sec} />
        <button disabled={!value || !min || !sec} type="submit" aria-label="submit form" />
      </form>
    </header>
  )
}

NewTaskForm.propTypes = {
  newTask: PropTypes.func.isRequired,
}
