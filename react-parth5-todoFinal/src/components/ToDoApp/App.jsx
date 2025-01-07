import { Component } from "react";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import TaskList from "../TaskList/TaskList";
import Footer from "../Footer/Footer";
import "./App.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      todosData: [],
      filter: "All",
    };
  }
  createToDoTask = (value) => {
    return {
      id: this.state.todosData.length + 1,
      description: value,
      created: new Date().toString(),
      done: false,
      edit: false,
      checked: false,
    };
  };

  onToggleData = (id, arr, propName, ...rest) => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
      [rest]: !oldItem[rest],
    };
    const newTodoData = arr.toSpliced(idx, 1, newItem);
    return newTodoData;
  };

  onToggleDone = (id, event) => {
    const el = event.target.closest(".edit");
    if (el) {
      event.stopPropagation();
      return;
    }
    this.setState(({ todosData }) => {
      return {
        todosData: this.onToggleData(id, todosData, "done", "checked"),
      };
    });
  };

  onEditTask = (id, event) => {
    event.stopPropagation();
    this.setState(({ todosData }) => {
      return {
        todosData: this.onToggleData(id, todosData, "edit"),
      };
    });
  };

  FilterTasks(items, filter) {
    return items.filter((item) => {
      if (filter === "Active") {
        return !item.done;
      } else if (filter === "Completed") {
        return item.done;
      } else {
        return items;
      }
    });
  }

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  ClearCompletedTasks = () => {
    this.setState(({ todosData }) => {
      const newData = todosData.filter((el) => !el.done);
      return {
        todosData: newData,
      };
    });
  };

  changeTask = (id, event) => {
    if (event.key === "Enter") {
      this.setState(({ todosData }) => {
        const idx = todosData.findIndex((el) => el.id === id);
        const oldItem = todosData[idx];
        const newItem = { ...oldItem, description: event.target.value };
        const newTodoData = todosData.toSpliced(idx, 1, newItem);

        return {
          todosData: newTodoData,
        };
      });
      this.onEditTask(id, event);
    }
  };

  newTask = (value) => {
    this.setState(({ todosData }) => {
      const newTodoData = [...todosData];
      const newTask = this.createToDoTask(value);
      newTodoData.unshift(newTask);
      return {
        todosData: newTodoData,
      };
    });
  };

  deletedTask = (id, event) => {
    event.stopPropagation();
    this.setState(({ todosData }) => {
      const idx = todosData.findIndex((task) => id === task.id);
      const newTodoData = todosData.toSpliced(idx, 1);
      return {
        todosData: newTodoData,
      };
    });
  };

  render() {
    const { todosData, filter } = this.state;

    const doneCount = todosData.filter((el) => el.done).length;
    const todoCount = todosData.length - doneCount;
    return (
      <section class="todoapp">
        <NewTaskForm newTask={this.newTask} />
        <section className="main">
          <TaskList
            todos={this.FilterTasks(todosData, filter)}
            deletedTask={this.deletedTask}
            onToggleDone={this.onToggleDone}
            onEditTask={this.onEditTask}
            changeTask={this.changeTask}
          />
          <Footer
            todoCount={todoCount}
            filter={filter}
            onFilterChange={this.onFilterChange}
            ClearCompletedTasks={this.ClearCompletedTasks}
          />
        </section>
      </section>
    );
  }
}
