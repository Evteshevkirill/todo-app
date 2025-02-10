import { useState, useMemo, useCallback } from 'react'

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
  const filterTasks = useCallback(
    (items) => {
      return items.filter((item) => {
        if (filter === 'Active') {
          return !item.done
        }
        if (filter === 'Completed') {
          return item.done
        }
        return items
      })
    },
    [filter]
  )

  const onToggleDone = (id, event) => {
    const el = event.target.closest('.edit')
    if (el) {
      event.stopPropagation()
      return
    }

    const newTodoData = todosData.map((item) => {
      if (item.id === id) {
        return { ...item, done: !item.done, checked: !item.checked }
      }
      return item
    })
    setTodosData(newTodoData)
  }

  const onEditTask = (id, event) => {
    event.stopPropagation()

    const newTodoData = todosData.map((item) => {
      if (item.id === id) {
        return { ...item, edit: !item.edit }
      }
      return item
    })
    setTodosData(newTodoData)
  }

  const onFilterChange = (newFilter) => {
    setFilter(newFilter)
  }

  const clearCompletedTasks = () => {
    const newData = todosData.filter((el) => !el.done)
    setTodosData(newData)
  }

  const changeTask = (id, event) => {
    if (event.key === 'Escape' || event.target.value.length === 0) {
      onEditTask(id, event)
    }
    if (event.key === 'Enter') {
      const newData = todosData.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            description: event.target.value,
            edit: false,
          }
        }
        return el
      })
      setTodosData(newData)
    }
  }

  const newTask = (value, min, sec) => {
    const newCreateTask = createToDoTask(value, min, sec)
    setTodosData([newCreateTask, ...todosData])
  }

  const deletedTask = (id, event) => {
    event.stopPropagation()

    const newData = todosData.filter((task) => id !== task.id)
    setTodosData(newData)
  }

  const doneCount = todosData.filter((el) => el.done).length
  const todoCount = todosData.length - doneCount

  return (
    <section className="todoapp">
      <NewTaskForm newTask={newTask} />
      <section className="main">
        <TaskList
          todos={useMemo(() => filterTasks(todosData), [todosData, filterTasks])}
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
