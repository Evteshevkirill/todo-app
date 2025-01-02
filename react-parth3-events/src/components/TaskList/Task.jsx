import { Component } from 'react'

export default class Task extends Component {
	state = {
		value: this.props.description,
	}

	onTaskEditing = event => {
		this.setState({
			value: event.target.value,
		})
	}
	render() {
		const {
			description,
			created,
			onDeleted,
			onToggleDone,
			done,
			edit,
			changeTask,
			onEditTask,
		} = this.props

		let classNames = ''
		if (done) {
			classNames = 'completed'
		} else if (edit) {
			classNames = 'editing'
		}

		return (
			<li className={classNames} onClick={onToggleDone}>
				<div className='view'>
					<input className='toggle' type='checkbox' />
					<label>
						<span className='description'>{description}</span>
						<span className='created'>{created}</span>
					</label>
					<button className='icon icon-edit' onClick={onEditTask}></button>
					<button className='icon icon-destroy' onClick={onDeleted}></button>
				</div>
				<input
					type='text'
					className='edit'
					value={this.state.value}
					onChange={this.onTaskEditing}
					onKeyDown={changeTask}
				></input>
			</li>
		)
	}
}
