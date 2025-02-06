import { useState } from 'react'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'
import './App.css'

export default function App() {
  const [todosData, setTodosData] = useState([])
  const [filter, setFilter] = useState('All')

  const createToDoTask = (value, min, sec) => {
    return {
      id: todosData.length + 1,
      description: value,
      timeMin: +min,
      timeSec: +sec,
      created: new Date().toString(),
      done: false,
      edit: false,
      checked: false,
    }
  }

  const onToggleData = (id, propName, ...rest) => {
    const newData = todosData.map((todo) =>
      todo.id === id ? { ...todo, [propName]: !todo[propName], [rest]: ![rest] } : todo
    )
    setTodosData(newData)
  }

  const filterTasks = (items) => {
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

  const onToggleDone = (id, event) => {
    const el = event.target.closest('.edit')
    if (el) {
      event.stopPropagation()
      return
    }

    onToggleData(id, 'done', 'checked')
  }

  const onEditTask = (id, event) => {
    event.stopPropagation()

    onToggleData(id, 'edit')
  }

  const onFilterChange = (newFilter) => {
    setFilter(newFilter)
  }

  const clearCompletedTasks = () => {
    const newData = todosData.filter((el) => !el.done)
    setTodosData(newData)
  }

  const changeTask = (id, event) => {
    if (event.keyCode === 27) {
      onEditTask(id, event)
    }
    if (event.key === 'Enter') {
      const newTodoData = todosData.map((todo) =>
        todo.id === id ? { ...todo, description: event.target.value } : todo
      )

      setTodosData(newTodoData)
    }
    onEditTask(id, event)
  }

  const newTask = (value, min, sec) => {
    const newItem = createToDoTask(value, min, sec)

    setTodosData([newItem, ...todosData])
  }

  const deletedTask = (id, event) => {
    event.stopPropagation()
    setTodosData(todosData.filter((el) => el.id !== id))
  }

  const doneCount = todosData.filter((el) => el.done).length
  const todoCount = todosData.length - doneCount

  return (
    <section className="todoapp">
      <NewTaskForm newTask={newTask} />
      <section className="main">
        <TaskList
          todos={filterTasks(todosData, filter)}
          deletedTask={deletedTask}
          onToggleDone={onToggleDone}
          onEditTask={onEditTask}
          changeTask={changeTask}
        />
        <Footer
          todoCount={todoCount}
          filter={filter}
          onFilterChange={onFilterChange}
          ClearCompletedTasks={clearCompletedTasks}
        />
      </section>
    </section>
  )
}
