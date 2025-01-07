import { Component } from 'react'
import PropTypes from 'prop-types'
export default class TaskFilter extends Component {
	buttons = [
		{ name: 'All', label: 'All' },
		{ name: 'Active', label: 'Active' },
		{ name: 'Completed', label: 'Completed' },
	]

	render() {
		const { filter, onFilterChange } = this.props
		const buttons = this.buttons.map(({ name, label }) => {
			const isActive = filter === name
			const className = isActive ? 'selected' : null
			return (
				<li key={name}>
					<button className={className} onClick={() => onFilterChange(name)}>
						{label}
					</button>
				</li>
			)
		})
		return <>{buttons}</>
	}
}

TaskFilter.defaultProps = {
	filter: 'All',
}

TaskFilter.propTypes = {
	filter: PropTypes.string,
	onFilterChange: PropTypes.func.isRequired,
}
