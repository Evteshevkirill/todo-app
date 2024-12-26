import Task from './Task'

export default function TaskList ({todos}) {

  const elements = todos.map(item => {
  const {id, status, ...itemProps} = item

    return (
			<li key={id} className={status}>
				<Task {...itemProps} />
			</li>
		)
  })
  return (
			<ul className='todo-list'>{elements}</ul>
	)
}