import { Component } from 'react'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'
import './App.css'

function onToggleData(id, arr, propName, ...rest) {
  const idx = arr.findIndex((el) => el.id === id)
  const oldItem = arr[idx]
  const newItem = {
    ...oldItem,
    [propName]: !oldItem[propName],
    [rest]: !oldItem[rest],
  }
  const newTodoData = arr.toSpliced(idx, 1, newItem)
  return newTodoData
}

function filterTasks(items, filter) {
  return items.filter((item) => {
    if (filter === 'Active') {
      return !item.done
    }
    if (filter === 'Completed') {
      return item.done
    }
    return items
  })
}

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      todosData: [],
      filter: 'All',
    }
    this.onToggleData = onToggleData.bind(this)
    this.filterTasks = filterTasks.bind(this)
  }

  createToDoTask = (value, min, sec) => {
    const { todosData } = this.state
    return {
      id: todosData.length + 1,
      description: value,
      timeMin: min,
      timeSec: sec,
      created: new Date().toString(),
      done: false,
      edit: false,
      checked: false,
    }
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

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  clearCompletedTasks = () => {
    this.setState(({ todosData }) => {
      const newData = todosData.filter((el) => !el.done)
      return {
        todosData: newData,
      }
    })
  }

  changeTask = (id, event) => {
    if (event.key === 'Enter') {
      this.setState(({ todosData }) => {
        const idx = todosData.findIndex((el) => el.id === id)
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

  newTask = (value, min, sec) => {
    this.setState(({ todosData }) => {
      const newTodoData = [...todosData]
      const newTask = this.createToDoTask(value, min, sec)
      newTodoData.unshift(newTask)
      return {
        todosData: newTodoData,
      }
    })
  }

  deletedTask = (id, event) => {
    event.stopPropagation()
    this.setState(({ todosData }) => {
      const idx = todosData.findIndex((task) => id === task.id)
      const newTodoData = todosData.toSpliced(idx, 1)
      return {
        todosData: newTodoData,
      }
    })
  }

  render() {
    const { todosData, filter } = this.state

    const doneCount = todosData.filter((el) => el.done).length
    const todoCount = todosData.length - doneCount
    return (
      <section className="todoapp">
        <NewTaskForm newTask={this.newTask} />
        <section className="main">
          <TaskList
            todos={this.filterTasks(todosData, filter)}
            deletedTask={this.deletedTask}
            onToggleDone={this.onToggleDone}
            onEditTask={this.onEditTask}
            changeTask={this.changeTask}
          />
          <Footer
            todoCount={todoCount}
            filter={filter}
            onFilterChange={this.onFilterChange}
            ClearCompletedTasks={this.clearCompletedTasks}
          />
        </section>
      </section>
    )
  }
}
