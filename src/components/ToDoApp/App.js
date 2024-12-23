import NewTaskForm from '../NewTaskForm/NewTaskForm'
import Task from '../Task/Task'

import './App.css'

export default function App() {
	return (
		<div className='todo-app'>
			<NewTaskForm />
			<Task />
		</div>
	)
}
