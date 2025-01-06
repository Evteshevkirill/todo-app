import { Component } from 'react'
import PropTypes from 'prop-types'
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
		const { todo, onDeleted, onToggleDone, changeTask, onEditTask } = this.props
		const { id, description, created, checked, done, edit } = todo

		let classNames = ''
		if (done) {
			classNames = 'completed'
		} else if (edit) {
			classNames = 'editing'
		}

		return (
			<li className={classNames} onClick={event => onToggleDone(id, event)}>
				<div className='view'>
					<input
						className='toggle'
						type='checkbox'
						onChange={this.onTaskEditing}
						value={this.state.editValue}
						checked={checked}
					/>
					<label>
						<span className='description'>{description}</span>
						<span className='created'>{created}</span>
					</label>
					<button
						className='icon icon-edit'
						onClick={event => onEditTask(id, event)}
					></button>
					<button
						className='icon icon-destroy'
						onClick={event => onDeleted(id, event)}
					></button>
				</div>
				<input
					type='text'
					className='edit'
					value={this.state.editValue}
					onChange={this.onTaskEditing}
					onKeyDown={event => changeTask(id, event)}
				></input>
			</li>
		)
	}
}

Task.defaultProps = {
	todo: {},
}

Task.propTypes = {
	onToggleDone: PropTypes.func.isRequired,
	onEditTask: PropTypes.func.isRequired,
	changeTask: PropTypes.func.isRequired,
	onDeleted: PropTypes.func.isRequired,
}
