import {Component} from 'react'

export default class Task extends Component {
	state = {
		done: false,
	}

	completedTask = () => {
		this.setState(({ done }) => {
			return {
				done: !done,
			}
		})
	}


	render() {
		const { description, created, onDeleted, id } = this.props
		const { done } = this.state

		let classNames = ''
		if (done) classNames = 'completed'

		return (
			<li className={classNames} onClick={this.completedTask}>
				<div className='view'>
					<input className='toggle' type='checkbox' />
					<label>
						<span className='description'>{description}</span>
						<span className='created'>{created}</span>
					</label>
					<button className='icon icon-edit'></button>
					<button
						className='icon icon-destroy'
						onClick={() => onDeleted(id)}
					></button>
				</div>
				<input type='text' className='edit' value='Editing task'></input>
			</li>
		)
	}
}

