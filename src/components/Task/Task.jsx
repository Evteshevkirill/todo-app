import './Task.css'

export default function Task() {
	return (
		<div className='view'>
			<input id='1' type='checkbox' className='toggle' />
			<label className='task-form'>
				<span className='task-text'>Completed task</span>
				<span className='task-time'>Created 17 seconds ago</span>
			</label>
		</div>
	)
}
