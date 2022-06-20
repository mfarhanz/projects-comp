import React from "react"

function TodoItem(props) {
    const completedStyle = {
        fontStyle: "italic",
        color: "#cdcdcd",
        textDecoration: "line-through"
    }
    
    return (
        <div className="todo-item">
            <input 
                type="checkbox" 
                checked={props.item.completed} 
                onChange={() => props.handleChange(props.item.id)}
            />
            <p style={props.item.completed ? completedStyle: null}>{props.item.text}</p>
            <p>Due on: {props.item.date}</p>
            <button onClick={() => props.removeTask(props.item.id)}>x</button>
        </div>
    )
}

export default TodoItem