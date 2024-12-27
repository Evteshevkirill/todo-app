import {Component} from 'react'
import Task from './Task'

export default class TaskList extends Component  {
  render() {

    const { todos, onDeleted } = this.props
    const elements = todos.map(item => {
      const {id} = item
      return (
          <Task key={id} {...item} 
          onDeleted={()=> onDeleted(id)}/>
      )
    })
    return (
        <ul className='todo-list'>{elements}</ul>
    )
  } 
}

  