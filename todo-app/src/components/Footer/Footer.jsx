import PropTypes from 'prop-types'

import TaskFilter from '../TaskFilter/TaskFilter'

export default function Footer(props) {
  const { todoCount, filter, onFilterChange, ClearCompletedTasks } = props
  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <ul className="filters">
        <TaskFilter filter={filter} onFilterChange={onFilterChange} />
      </ul>
      <button type="button" className="clear-completed" onClick={() => ClearCompletedTasks()}>
        Clear completed tasks
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  todoCount: 0,
}

Footer.propTypes = {
  todoCount: PropTypes.number,
  ClearCompletedTasks: PropTypes.func.isRequired,
}
