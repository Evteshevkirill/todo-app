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
		todosData: [],
		filter: 'all',
	}

	onToggleData = (id, arr, propName) => {
		const idx = arr.findIndex(el => el.id === id)
		const oldItem = arr[idx]
		const newItem = { ...oldItem, [propName]: !oldItem[propName] }
		const newTodoData = arr.toSpliced(idx, 1, newItem)
		return newTodoData
	}

	onToggleDone = (id, event) => {
		const el = event.target.closest('.edit')
		if (el) {
			event.stopPropagation()
			return
		}
		this.setState(({ todosData }) => {
			return {
				todosData: this.onToggleData(id, todosData, 'done'),
			}
		})
	}

	onEditTask = (id, event) => {
		event.stopPropagation()
		this.setState(({ todosData }) => {
			return {
				todosData: this.onToggleData(id, todosData, 'edit'),
			}
		})
	}

	onFilterTasks(items, filter) {
		return items.filter(item => {
			if (filter === 'all') {
				return items
			} else if (filter === 'active') {
				return !item.done
			} else if (filter === 'completed') {
				return item.done
			}
		})
	}

	onFilterChange = filter => {
		this.setState({ filter })
	}

	onClearTasks = () => {
		this.setState(({ todosData }) => {
			const newData = todosData.filter(el => !el.done)
			return {
				todosData: newData,
			}
		})
	}

	changeTask = (id, event, value) => {
		if (event.key === 'Enter') {
			this.setState(({ todosData }) => {
				const idx = todosData.findIndex(el => el.id === id)
				const oldItem = todosData[idx]
				const newItem = { ...oldItem, description: value }
				const newTodoData = todosData.toSpliced(idx, 1, newItem)
				return {
					todosData: newTodoData,
				}
			})
			this.onEditTask(id, event)
		}
	}

	newTask = value => {
		this.setState(({ todosData }) => {
			const newTodoData = [...todosData]
			const newTask = this.createToDoTask(value)
			newTodoData.unshift(newTask)
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
		const { todosData, filter } = this.state

		const visibleItems = this.onFilterTasks(todosData, filter)
		const doneCount = todosData.filter(el => el.done).length
		const todoCount = todosData.length - doneCount
		return (
			<>
				<NewTaskForm newTask={this.newTask} todos={todosData} />
				<section className='main'>
					<TaskList
						todos={visibleItems}
						onDeleted={this.deleteTask}
						onToggleDone={this.onToggleDone}
						onEditTask={this.onEditTask}
						changeTask={this.changeTask}
					/>
					<Footer
						todoCount={todoCount}
						todosData={todosData}
						filter={this.state.filter}
						onFilterChange={this.onFilterChange}
						onClearTasks={this.onClearTasks}
					/>
				</section>
			</>
		)
	}
}
