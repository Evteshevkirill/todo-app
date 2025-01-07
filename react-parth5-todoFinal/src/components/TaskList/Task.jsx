import { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNowStrict } from 'date-fns'
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
		const { todo, deletedTask, onToggleDone, changeTask, onEditTask } =
			this.props
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
						<span className='created'>{`created ${formatDistanceToNowStrict(
							created,
							{
								includeSeconds: true,
								addSuffix: true,
							}
						)}`}</span>
					</label>
					<button
						className='icon icon-edit'
						onClick={event => onEditTask(id, event)}
					></button>
					<button
						className='icon icon-destroy'
						onClick={event => deletedTask(id, event)}
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
	todo: PropTypes.shape({
		id: PropTypes.number,
		description: PropTypes.string,
		checked: PropTypes.bool,
		done: PropTypes.bool,
		edit: PropTypes.bool,
		created: PropTypes.instanceOf(Date),
	}),
	onToggleDone: PropTypes.func.isRequired,
	onEditTask: PropTypes.func.isRequired,
	changeTask: PropTypes.func.isRequired,
	deletedTask: PropTypes.func.isRequired,
}
