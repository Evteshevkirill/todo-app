import React from 'react'

interface TaskFilterProps {
  filter: string
  onFilterChange: (name: string) => void
}

export default class TaskFilter extends React.Component<TaskFilterProps> {
  buttons: { name: string; label: string }[] = [
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
          <button type="button" className={className ?? ''} onClick={() => onFilterChange(name)}>
            {label}
          </button>
        </li>
      )
    })
    return buttons
  }
}
