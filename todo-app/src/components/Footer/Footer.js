import React from 'react'

import TaskFilter from '../TaskFilter/TaskFilter'

const Footer = (props) => {
  const { todoCount, filter, onFilterChange, ClearCompletedTasks } = props
  return React.createElement(
    'footer',
    { className: 'footer' },
    React.createElement('span', { className: 'todo-count' }, todoCount, ' items left'),
    React.createElement('ul', { className: 'filters' }, React.createElement(TaskFilter, { filter, onFilterChange })),
    React.createElement(
      'button',
      { type: 'button', className: 'clear-completed', onClick: () => ClearCompletedTasks() },
      'Clear completed'
    )
  )
}
export default Footer
