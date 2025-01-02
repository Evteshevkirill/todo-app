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
			this.props.newTask(event.target.value, event)
			this.setState({
				value: '',
			})
		}
	}
	render() {
		const placeholder = 'What needs to be done?'
		return (
			<header className='header'>
				<h1>todos</h1>
				<input
					type='text'
					className='new-todo'
					placeholder={placeholder}
					autoFocus
					onChange={this.onTaskChange}
					value={this.state.value}
					onKeyDown={event => this.onSubmit(event)}
				/>
			</header>
		)
	}
}
