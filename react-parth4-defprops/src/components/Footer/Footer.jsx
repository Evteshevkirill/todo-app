import { Component } from 'react'
import PropTypes from 'prop-types'
import TaskFilter from './TasksFilter'

export default class Footer extends Component {
	render() {
		const { todoCount, filter, onFilterChange, ClearCompletedTasks } =
			this.props
		return (
			<footer className='footer'>
				<span className='todo-count'>{todoCount} items left</span>
				<ul className='filters'>
					<TaskFilter filter={filter} onFilterChange={onFilterChange} />
				</ul>
				<button
					className='clear-completed'
					onClick={() => ClearCompletedTasks()}
				>
					Clear completed
				</button>
			</footer>
		)
	}
}

Footer.defaultProps = {
	todoCount: 0,
}

Footer.propTypes = {
	todoCount: PropTypes.number,
	ClearCompletedTasks: PropTypes.func.isRequired,
}
