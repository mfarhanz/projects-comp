import React from "react"
import TodoItem from "./TodoItem"
import todosData from "./todosData"

class App extends React.Component {
    next_index = 6;
    constructor() {
        super()
        this.state = {
            todos: todosData
        }
        this.handleChange = this.handleChange.bind(this)
        this.addItem = this.addItem.bind(this)
        this.removeTask = this.removeTask.bind(this)
    }
    
    handleChange(id) {
        this.setState(prevState => {
            const updatedTodos = prevState.todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed
                }
                return todo
            })
            return {
                todos: updatedTodos
            }
        })
    }
    
    // saveTask(e) {
    //   if (this._inputElement.value !== "") {
    //     const todos = [...this.state.todos];
    //     todos.push(<TodoItem key={todos.length+1} item={
    //         {
    //             id: todos.length+1,
    //             text: this.newText.value,
    //             completed: false,
    //             date: this._inputElement1.value
    //           }
    //       } 
    //       handleChange={this.handleChange}
    //       removeTask={this.removeTask}/>)
    //     this.setState({todos});
    //     this._inputElement.value = "";
    //   }
    //   e.preventDefault();
    // }

    removeTask(index){
         const todos = [...this.state.todos];
         todos.splice(index, 1)
         this.setState({todos})
    }

    addItem(e) {
        if (this._inputElement.value !== "") {
            var newItem = {
                id: this.next_index++,
                text: this._inputElement.value,
                completed: false,
                date: this._inputElement1.value
            };

            this.setState((prevState) => {
                return {
                    todos: prevState.todos.concat(newItem)
                };
            });

            this.handleChange = this.handleChange.bind(newItem.id)

            this._inputElement.value = "";
        }

        console.log(this.state.items);

        e.preventDefault();
    }
    
    render() {
        const todoItems = this.state.todos.map(item => <TodoItem key={item.id} item={item} handleChange={this.handleChange} removeTask={this.removeTask}/>)
        
        return (
            <div className="todo-list">
                {/* <input type="text" ref={(ip) => {this.newText = ip}}/>
                <button onClick={this.saveTask} className="btn btn-primary glyphicon glyphicon-floppy-saved">Save
                </button>
                {todoItems} */}
                <div className= "header">
                    <form onSubmit={this.addItem}>
                        <input ref={(a) => this._inputElement = a}
                               placeholder="Add New Task">
                        </input>
                        <input ref={(a) => this._inputElement1 = a}
                               placeholder="Enter Due Date">
                        </input>
                        <button type="Submit">Enter</button>
                        
                    </form>
                </div>
                {todoItems}
            </div>
        )    
    }
}

export default App