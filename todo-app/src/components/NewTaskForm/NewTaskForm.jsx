import { Component } from 'react'
import PropTypes from 'prop-types'

export default class NewTaskForm extends Component {
  constructor() {
    super()
    this.state = {
      value: '',
      min: '',
      sec: '',
    }
  }

  onTaskMin = (event) => {
    this.setState({
      min: event.target.value,
    })
  }

  onTaskSec = (event) => {
    this.setState({
      sec: event.target.value,
    })
  }

  onTaskValue = (event) => {
    this.setState({
      value: event.target.value,
    })
  }

  onSubmit = (event) => {
    const { newTask } = this.props
    const { value, sec, min } = this.state
    event.preventDefault()

    if (value === '' || sec === '' || min === '') return
    if (Number.isNaN(+sec) || Number.isNaN(+min)) return

    newTask(value, min, sec)
    this.setState({
      value: '',
      min: '',
      sec: '',
    })
  }

  render() {
    const { value, min, sec } = this.state
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input type="text" className="new-todo" placeholder="Task" onChange={this.onTaskValue} value={value} />
          <input type="text" className="new-todo-form__timer" placeholder="Min" onChange={this.onTaskMin} value={min} />
          <input type="text" className="new-todo-form__timer" placeholder="Sec" onChange={this.onTaskSec} value={sec} />
          <button disabled={!value || !min || !sec} type="submit" aria-label="submit form" />
        </form>
      </header>
    )
  }
}

NewTaskForm.propTypes = {
  newTask: PropTypes.func.isRequired,
}
