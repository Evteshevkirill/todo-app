import { Component } from 'react'
import PropTypes from 'prop-types'
import Task from './Task'

export default class TaskList extends Component {
	render() {
		const { todos, deletedTask, onToggleDone, onEditTask, changeTask } =
			this.props
		const elements = todos.map(todo => {
			const { id, description } = todo
			return (
				<Task
					key={id}
					todo={todo}
					deletedTask={deletedTask}
					onToggleDone={onToggleDone}
					onEditTask={onEditTask}
					changeTask={changeTask}
					description={description}
				/>
			)
		})
		return <ul className='todo-list'>{elements}</ul>
	}
}

TaskList.defaultProps = {
	todos: [],
}

TaskList.propTypes = {
	todos: PropTypes.arrayOf(PropTypes.object),
}
