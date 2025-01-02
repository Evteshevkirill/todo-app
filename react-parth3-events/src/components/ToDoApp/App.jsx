import { Component } from 'react'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'

export default class App extends Component {
	maxId = 100

	createToDoTask = value => {
		return {
			id: this.maxId++,
			description: value,
			created: 'created 5 minutes ago',
			done: false,
			edit: false,
		}
	}

	state = {
		todosData: [
			this.createToDoTask('Drink Coffee'),
			this.createToDoTask('React app'),
			this.createToDoTask('Have a lunch'),
		],
	}

	createNewTodoData = (id, propName, arr) => {
		const idx = arr.findIndex(el => el.id === id)
		const oldItem = arr[idx]
		const newItem = { ...oldItem, [propName]: !oldItem[propName] }
		const newTodoData = arr.toSpliced(idx, 1, newItem)
		return newTodoData
	}

	onToggleDone = id => {
		this.setState(({ todosData }) => {
			return {
				todosData: this.createNewTodoData(id, 'done', todosData),
			}
		})
	}

	newTask = value => {
		this.setState(({ todosData }) => {
			const newTodoData = [...todosData]
			const newTask = this.createToDoTask(value)
			newTodoData.push(newTask)
			return {
				todosData: newTodoData,
			}
		})
	}

	deleteTask = (id, event) => {
		event.stopPropagation()
		this.setState(({ todosData }) => {
			const idx = todosData.findIndex(task => id === task.id)
			const newTodoData = todosData.toSpliced(idx, 1)
			return {
				todosData: newTodoData,
			}
		})
	}

	render() {
		const { todosData } = this.state
		const doneCount = todosData.filter(el => el.done).length
		const todoCount = todosData.length - doneCount
		return (
			<>
				<NewTaskForm />
				<section className='main'>
					<TaskList
						todos={todosData}
						onDeleted={this.deleteTask}
						onToggleDone={this.onToggleDone}
					/>
					<Footer todoCount={todoCount} />
				</section>
			</>
		)
	}
}
