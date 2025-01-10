import { Component } from 'react'
import PropTypes from 'prop-types'

export default class NewTaskForm extends Component {
  constructor() {
    super()
    this.state = {
      value: '',
    }
  }

  onTaskChange = (event) => {
    this.setState({
      value: event.target.value,
    })
  }

  onSubmit = (event) => {
    const { newTask } = this.props
    if (event.key === 'Enter') {
      event.preventDefault()
      newTask(event.target.value)
      this.setState({
        value: '',
      })
    }
  }

  render() {
    const placeholder = 'What needs to be done?'
    const { value } = this.state
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          type="text"
          className="new-todo"
          placeholder={placeholder}
          onChange={this.onTaskChange}
          onKeyDown={this.onSubmit}
          value={value}
        />
      </header>
    )
  }
}

NewTaskForm.propTypes = {
  newTask: PropTypes.func.isRequired,
}
