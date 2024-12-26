import { Component } from 'react'
import TaskFilter from './TasksFilter'

export default class Footer extends Component {
  render() {
    return (
			<footer className='footer'>
				<span className='todo-count'>1 items left</span>
				<ul className='filters'>
					<TaskFilter />
				</ul>
				<button className='clear-completed'>Clear completed</button>
			</footer>
		)
  }
}
