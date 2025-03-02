import React from 'react'

import Task from '../Task/Task'

const TaskList = (props) => {
  const { todos, deletedTask, onToggleDone, onEditTask, changeTask } = props
  const elements = todos.map((todo) => {
    const { id } = todo
    return React.createElement(Task, {
      key: id,
      todo,
      deletedTask,
      onToggleDone,
      onEditTask,
      changeTask,
    })
  })
  return React.createElement('ul', { className: 'todo-list' }, elements)
}
export default TaskList
