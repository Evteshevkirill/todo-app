import { Component } from 'react'
import Task from './Task'

export default class TaskList extends Component {
	render() {
		const { todos, onDeleted, onToggleDone } = this.props
		const elements = todos.map(item => {
			const { id } = item
			return (
				<Task
					key={id}
					{...item}
					onDeleted={event => onDeleted(id, event)}
					onToggleDone={() => onToggleDone(id)}
				/>
			)
		})
		return <ul className='todo-list'>{elements}</ul>
	}
}
