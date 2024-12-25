export default function Header () {
const placeholder = 'What needs to be done?'
	return (
		<header className='header'>
			<h1>todos</h1>
			<input type='text' className='new-todo' placeholder={placeholder} autoFocus/>
		</header>
	)
}
