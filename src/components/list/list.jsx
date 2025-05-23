import styles from './list.module.css';
import { useEffect, useState } from 'react';

const List = ({ todos, setTodos }) => {
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
            .then((res) => res.json())
            .then((data) => setTodos(data))
            .catch((error) => console.error('Error:', error));
    }, [setTodos]);

    const handleDelete = (id) => {
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
            })
            .catch((error) => console.error('Error', error));
    };

    const handleToggleComplete = (id) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
    };

    const startEditing = (todo) => {
        setEditingId(todo.id);
        setEditText(todo.title);
    };

    const saveEdit = (id) => {
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: editText,
                completed: todos.find((todo) => todo.id === id)?.completed,
            }),
        })
            .then((res) => res.json())
            .then((updatedTodo) => {
                setTodos((prevTodos) =>
                    prevTodos.map((todo) =>
                        todo.id === id ? { ...todo, title: updatedTodo.title } : todo
                    )
                );
                setEditingId(null);
            })
            .catch((error) => console.error('Error', error));
    };

    return (
        <div className={styles.list}>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleToggleComplete(todo.id)}
                        />
                        {editingId === todo.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                />
                                <button onClick={() => saveEdit(todo.id)}>Save</button>
                            </>
                        ) : (
                            <>
                                <span
                                    style={{
                                        textDecoration: todo.completed ? 'line-through' : 'none',
                                    }}
                                >
                                    {todo.title}
                                </span>
                                <button onClick={() => startEditing(todo)}>Edit</button>
                            </>
                        )}
                        <button onClick={() => handleDelete(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default List;