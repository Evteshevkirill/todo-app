import { Component } from 'react'
import Task from './Task'

export default class TaskList extends Component {
	render() {
		const { todos, onDeleted, onToggleDone, onEditTask, changeTask } =
			this.props
		const elements = todos.map(item => {
			const { id } = item
			return (
				<Task
					key={id}
					item={item}
					onDeleted={onDeleted}
					onToggleDone={onToggleDone}
					onEditTask={onEditTask}
					changeTask={changeTask}
					description={item.description}
				/>
			)
		})
		return <ul className='todo-list'>{elements}</ul>
	}
}
