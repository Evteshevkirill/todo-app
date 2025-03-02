import React from 'react'

import Task from '../Task/Task'
import { Todo } from '../types/types'

interface TaskListProps {
  todos: Todo[]
  deletedTask: (id: number, event: React.MouseEvent<HTMLButtonElement>) => void
  onToggleDone: (id: number, event: React.SyntheticEvent) => void
  changeTask: (id: number, event: React.KeyboardEvent<HTMLInputElement>) => void
  onEditTask: (id: number, event: React.MouseEvent<HTMLButtonElement>) => void
}

const TaskList: React.FC<TaskListProps> = (props) => {
  const { todos, deletedTask, onToggleDone, onEditTask, changeTask } = props
  const elements = todos.map((todo) => {
    const { id } = todo
    return (
      <Task
        key={id}
        todo={todo}
        deletedTask={deletedTask}
        onToggleDone={onToggleDone}
        onEditTask={onEditTask}
        changeTask={changeTask}
      />
    )
  })
  return <ul className="todo-list">{elements}</ul>
}

export default TaskList
