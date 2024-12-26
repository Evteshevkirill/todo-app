import {Component} from 'react'

export default class Task extends Component  {

  onClickTask = () => {
    console.log(`Del: ${this.props.label}`);
  }

  render(){
    const { description, created, id, status } = this.props

    return (
			<li 
      key={id} 
      className={status}
      onClick={this.onClickTask}>
				<div className='view'>
					<input className='toggle' type='checkbox' />
					<label>
						<span className='description'>{description}</span>
						<span className='created'>{created}</span>
					</label>
					<button className='icon icon-edit'></button>
					<button 
          className='icon icon-destroy'
          >
          </button>
				</div>
				<input type='text' className='edit' value='Editing task'></input>
			</li>
		)
  }
}

