import { Component } from 'react'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'

export default class App extends Component {
	createToDoTask = value => {
		return {
			id: this.state.todosData.length + 1,
			description: value,
			created: 'created 5 minutes ago',
			done: false,
			edit: false,
			checked: false,
		}
	}

	state = {
		todosData: [],
		filter: 'All',
	}

	onToggleData = (id, arr, propName, ...rest) => {
		const idx = arr.findIndex(el => el.id === id)
		const oldItem = arr[idx]
		const newItem = {
			...oldItem,
			[propName]: !oldItem[propName],
			[rest]: !oldItem[rest],
		}
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
				todosData: this.onToggleData(id, todosData, 'done', 'checked'),
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
			if (filter === 'Active') {
				return !item.done
			} else if (filter === 'Completed') {
				return item.done
			} else {
				return items
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

	changeTask = (id, event) => {
		if (event.key === 'Enter') {
			this.setState(({ todosData }) => {
				const idx = todosData.findIndex(el => el.id === id)
				const oldItem = todosData[idx]
				const newItem = { ...oldItem, description: event.target.value }
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

		const doneCount = todosData.filter(el => el.done).length
		const todoCount = todosData.length - doneCount
		return (
			<>
				<NewTaskForm newTask={this.newTask} />
				<section className='main'>
					<TaskList
						todos={this.onFilterTasks(todosData, filter)}
						onDeleted={this.deleteTask}
						onToggleDone={this.onToggleDone}
						onEditTask={this.onEditTask}
						changeTask={this.changeTask}
					/>
					<Footer
						todoCount={todoCount}
						filter={filter}
						onFilterChange={this.onFilterChange}
						onClearTasks={this.onClearTasks}
					/>
				</section>
			</>
		)
	}
}
