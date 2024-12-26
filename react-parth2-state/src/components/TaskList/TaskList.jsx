import {Component} from 'react'
import Task from './Task'

export default class TaskList extends Component  {
  render() {

    const {todos} = this.props
    const elements = todos.map(item => {
      return (
          <Task {...item} />
      )
    })
    return (
        <ul className='todo-list'>{elements}</ul>
    )
  } 
}

  