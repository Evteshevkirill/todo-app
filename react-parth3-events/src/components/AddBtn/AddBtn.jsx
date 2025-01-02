import { Component } from 'react'

export default class AddBtn extends Component {
	render() {
		return <form onClick={() => this.props.newTask('Hello')}>Add Task</form>
	}
}
