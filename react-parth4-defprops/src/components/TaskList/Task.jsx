import { Component } from 'react'

export default class Task extends Component {
	state = {
		inputValue: '',
		editValue: this.props.description,
	}

	onTaskEditing = event => {
		this.setState({
			editValue: event.target.value,
		})
	}
	render() {
		const { item, onDeleted, onToggleDone, changeTask, onEditTask } = this.props

		let classNames = ''
		if (item.done) {
			classNames = 'completed'
		} else if (item.edit) {
			classNames = 'editing'
		}

		return (
			<li
				className={classNames}
				onClick={event => onToggleDone(item.id, event)}
			>
				<div className='view'>
					<input
						className='toggle'
						type='checkbox'
						onChange={this.onTaskEditing}
						value={this.state.editValue}
						checked={item.checked}
					/>
					<label>
						<span className='description'>{item.description}</span>
						<span className='created'>{item.created}</span>
					</label>
					<button
						className='icon icon-edit'
						onClick={event => onEditTask(item.id, event)}
					></button>
					<button
						className='icon icon-destroy'
						onClick={event => onDeleted(item.id, event)}
					></button>
				</div>
				<input
					type='text'
					className='edit'
					value={this.state.editValue}
					onChange={this.onTaskEditing}
					onKeyDown={event => changeTask(item.id, event, event.target.value)}
				></input>
			</li>
		)
	}
}
