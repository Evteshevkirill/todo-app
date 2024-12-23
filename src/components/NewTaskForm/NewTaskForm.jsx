import './NewTaskForm.css'

export default function NewTaskForm() {
	function Title() {
		const title = 'todos'
		return (
			<div>
				<h1 className='title'>{title}</h1>
			</div>
		)
	}

	const placeholder = 'What needs to be done?'

	return (
		<form className='header'>
			<Title />
			<input type='text' className='input-new-todo' placeholder={placeholder} />
		</form>
	)
}
