import { Component } from 'react'
import TaskFilter from './TasksFilter'

export default class Footer extends Component {
	render() {
		const { todoCount } = this.props
		return (
			<footer className='footer'>
				<span className='todo-count'>{todoCount} items left</span>
				<ul className='filters'>
					<TaskFilter />
				</ul>
				<button className='clear-completed'>Clear completed</button>
			</footer>
		)
	}
}
