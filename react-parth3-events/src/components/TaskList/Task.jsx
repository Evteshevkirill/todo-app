import { Component } from 'react'

export default class Task extends Component {
	render() {
		const { description, created, onDeleted, onToggleDone, done } = this.props

		let classNames = ''
		if (done) {
			classNames = 'completed'
		}

		return (
			<li className={classNames} onClick={onToggleDone}>
				<div className='view'>
					<input className='toggle' type='checkbox' />
					<label>
						<span className='description'>{description}</span>
						<span className='created'>{created}</span>
					</label>
					<button className='icon icon-edit'></button>
					<button className='icon icon-destroy' onClick={onDeleted}></button>
				</div>
				<input type='text' className='edit'></input>
			</li>
		)
	}
}
