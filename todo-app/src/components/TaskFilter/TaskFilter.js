import React from 'react'

export default class TaskFilter extends React.Component {
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
      return React.createElement(
        'li',
        { key: name },
        React.createElement(
          'button',
          { type: 'button', className: className ?? '', onClick: () => onFilterChange(name) },
          label
        )
      )
    })
    return buttons
  }
}
