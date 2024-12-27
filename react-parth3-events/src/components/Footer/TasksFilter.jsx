import { Component } from 'react'

export default class TaskFilter extends Component {
  render() {
    return (
			<>
				<li>
					<button className='selected'>All</button>
				</li>
				<li>
					<button>Active</button>
				</li>
				<li>
					<button>Completed</button>
				</li>
			</>
		)
  }
}
