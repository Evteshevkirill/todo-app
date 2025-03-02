import React, { useState } from 'react'

interface NewTaskFormProps {
  newTask: (value: string, min: string, sec: string) => void
}

type stateForm = { value: string; min: string; sec: string }

const NewTaskForm: React.FC<NewTaskFormProps> = ({ newTask }) => {
  const [state, setState] = useState<stateForm>({
    value: '',
    min: '',
    sec: '',
  })

  const { value, min, sec } = state

  const onTaskMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => {
      return {
        ...prev,
        min: event.target.value,
      }
    })
  }

  const onTaskSec = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => {
      return {
        ...prev,
        sec: event.target.value,
      }
    })
  }

  const onTaskValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => {
      return {
        ...prev,
        value: event.target.value,
      }
    })
  }

  const onSubmit = (event: React.FormEvent) => {
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

export default NewTaskForm
