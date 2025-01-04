import { Component } from 'react'

export default class NewTaskForm extends Component {
	state = {
		value: '',
	}

	onTaskChange = event => {
		this.setState({
			value: event.target.value,
		})
	}

	onSubmit = event => {
		if (event.key === 'Enter') {
			event.preventDefault()
			this.props.newTask(event.target.value)
			this.setState({
				value: '',
			})
		}
	}
	render() {
		const placeholder = 'What needs to be done?'
		return (
			<form className='header' onKeyDown={this.onSubmit}>
				<h1>todos</h1>
				<input
					type='text'
					className='new-todo'
					placeholder={placeholder}
					autoFocus
					onChange={this.onTaskChange}
					value={this.state.value}
				/>
			</form>
		)
	}
}
