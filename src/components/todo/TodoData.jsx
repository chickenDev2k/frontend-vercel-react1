const TodoData = (p) => {
    const { todos, deleteTodo } = p;
    return (
        <div className="todo-data">
            {todos.map((item, index) => {
                item, index;
                return (
                    <div className={`todo-item ${index}`} key={item.id}>
                        <div>{item.name}</div>
                        <button
                            onClick={() => {
                                deleteTodo(item.id);
                            }}>
                            Delete
                        </button>
                    </div>
                );
            })}
        </div>
    );
};
export default TodoData;
