import { Component } from 'react'

export default class TaskFilter extends Component {
	handleClick = event => {
		const filters = document.querySelector('.filters')
		let BtnsFilter = filters.querySelectorAll('button')

		for (let i = 0; i < BtnsFilter.length; i++) {
			BtnsFilter[i].classList.remove('selected')
		}
		event.currentTarget.classList.add('selected')
	}
	render() {
		return (
			<>
				<li>
					<button className='selected' onClick={this.handleClick}>
						All
					</button>
				</li>
				<li>
					<button onClick={this.handleClick}>Active</button>
				</li>
				<li>
					<button onClick={this.handleClick}>Completed</button>
				</li>
			</>
		)
	}
}
