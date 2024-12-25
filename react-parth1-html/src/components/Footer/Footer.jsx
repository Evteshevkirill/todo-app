import TaskFilter from './TasksFilter/TasksFilter'

export default function Footer () {
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