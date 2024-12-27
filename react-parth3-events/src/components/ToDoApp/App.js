import {Component} from 'react'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'

export default class App extends Component {

	state = {
		todosData: [
			{
				id: 1,
				description: 'Completed task',
				created: 'created 17 seconds ago',
			},
			{
				id: 2,
				description: 'Editing task',
				created: 'created 5 minutes ago',
			},
			{
				id: 3,
				description: 'Active task',
				created: 'created 5 minutes ago',
			},
		],
	}

  deleteTask = (id) => {
    this.setState(({todosData}) => {
      const idx = todosData.findIndex(task => id === task.id )
      const newTodoData = todosData.toSpliced(idx, 1);
      return {
        todosData: newTodoData
      }
    })
  }

	render() {
		return (
			<>
				<NewTaskForm />
				<section className='main'>
					<TaskList todos={this.state.todosData} onDeleted={this.deleteTask} />
					<Footer />
				</section>
			</>
		)
	}
}
