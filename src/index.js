import React, {Component} from "react";

import { createRoot } from "react-dom/client"
import NewTaskForm from "./components/new-task-form/new-task-form";
import TaskList from "./components/task-list/task-list";
import Footer from "./components/footer/footer";


export default class App extends Component {
    state = {
      status: "all",
      todoData: [],
    };
  
    addItem = (text) => {
      this.setState(({ todoData }) => {
        const newArray = [...todoData, this.createTodoItem(text)];
        return {
          todoData: newArray,
        };
      });
    };
  
    onToggleDone = (id) => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const oldItem = todoData[idx];
        const newItem = { ...oldItem, done: !oldItem.done };
        const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
        return {
          todoData: newArray,
        };
      });
    };
  
    deletedItem = (id) => {
      this.setState(({ todoData }) => {
        const newArray = todoData.filter((el) => el.id !== id);
        return {
          todoData: newArray,
        };
      });
    };
  
    clearCompleted = () => {
      this.setState(({ todoData }) => {
        const newArray = todoData.filter((el) => !el.done);
        return {
          todoData: newArray,
        };
      });
    };
  
    todoFilter = (value) => {
      this.setState({
        status: value,
      });
    };
  
    createTodoItem(label) {
      return {
        label,
        done: false,
        id: Math.floor(Math.random() * 10000),
        status: "all",
        time: Date.now(),
       
      };
    }
  
    render() {
      const { todoData, status } = this.state;
      return (
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <NewTaskForm onItemAdded={this.addItem} />
          </header>
          <section className="main">
            <TaskList
              todos={todoData}
              onDeleted={this.deletedItem}
              onToggleDone={this.onToggleDone}
              status={status}
              saveCgange={this.saveCgange}
              startTimer={this.startTimer}
            />
            <Footer
              todoCount={todoData.length - todoData.filter((el) => el.done).length}
              todoFilter={this.todoFilter}
              clearCompleted={this.clearCompleted}
              status={status}
            />
          </section>
        </section>
      );
    }
  }
 

  createRoot(document.querySelector(".todoapp")).render(<App />)



