import { useState } from "react";

const TodoNew = (props) => {
    const [text, setText] = useState("");
    const { addNewTodo } = props;
    const handleClick = () => {
        text;
        if (text.length > 0) {
            addNewTodo(text);
            setText("");
        }
    };
    const handleOnChange = (e) => {
        setText(e);
    };
    return (
        <div>
            <div className="add-block">
                <input
                    type="text"
                    placeholder="Enter your task"
                    onChange={(e) => handleOnChange(e.target.value)}
                    value={text}
                />
                <button style={{ cursor: "pointer" }} onClick={handleClick}>
                    Add
                </button>
            </div>
        </div>
    );
};
export default TodoNew;
