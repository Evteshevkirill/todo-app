import Task from './Task/Task'

export default function TaskList ({todos}) {


  const elements = todos.map(item => {
  const {id, ...itemProps} = item

    return (
			<li key={id}>
				<Task {...itemProps} />
			</li>
		)
  })
  return (
			<ul className='todo-list'>
        {elements}
      </ul>
	)
}