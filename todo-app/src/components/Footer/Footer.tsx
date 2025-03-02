import React from 'react'

import TaskFilter from '../TaskFilter/TaskFilter'

interface FooterProps {
  todoCount: number
  filter: string
  onFilterChange: (name: string) => void
  ClearCompletedTasks: () => void
}

const Footer: React.FC<FooterProps> = (props) => {
  const { todoCount, filter, onFilterChange, ClearCompletedTasks } = props
  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <ul className="filters">
        <TaskFilter filter={filter} onFilterChange={onFilterChange} />
      </ul>
      <button type="button" className="clear-completed" onClick={() => ClearCompletedTasks()}>
        Clear completed
      </button>
    </footer>
  )
}
export default Footer
