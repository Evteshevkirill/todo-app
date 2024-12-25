import Header from '../NewTaskForm/Header'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'

export default function App() {
  const todosData = [
		{
			id: 1,
			description: 'Completed task',
			created: 'created 17 seconds ago',
			status: 'completed',
		},
		{
			id: 2,
			description: 'Editing task',
			created: 'created 5 minutes ago',
			status: 'editing',
		},
		{
			id: 3,
			description: 'Active task',
			created: 'created 5 minutes ago',
			status: null,
		},
	]

	return (
		<>
			<Header />
			<section className='main'>
				<TaskList todos={todosData} />
				<Footer />
			</section>
		</>
	)
}
