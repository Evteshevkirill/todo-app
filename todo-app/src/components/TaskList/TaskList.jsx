import PropTypes from 'prop-types'

import Task from '../Task/Task'

export default function TaskList(props) {
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

TaskList.defaultProps = {
  todos: [],
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
}
