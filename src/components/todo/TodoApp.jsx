import { useState } from "react";
import logo from "../../assets/react.svg";
import TodoNew from "./TodoNew";
import TodoData from "./TodoData";

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
    const addNewTodo = (name) => {
        const newTodo = {
            id: getRandomArbitrary(1, 1000000000),
            name: name,
        };
        setTodos([...todos, newTodo]);
    };

    const deleteTodo = (id) => {
        const filterTodos = todos.filter((todo) => todo.id !== id);
        setTodos(filterTodos);
    };

    return (
        <div className="todo-container">
            <div className="todo-title">Todo list</div>
            <TodoNew addNewTodo={addNewTodo} />
            {todos.length > 0 ? (
                <TodoData todos={todos} deleteTodo={deleteTodo} />
            ) : (
                <div className="todo-image">
                    <img src={logo} alt="" className="logo" />
                </div>
            )}
        </div>
    );
};

export default TodoApp;
