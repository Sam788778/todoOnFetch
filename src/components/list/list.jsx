import styles from './list.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const List = ({ todos, setTodos }) => {
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');

        useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }else{
            axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
            .then((res) => setTodos(res.data))
            .catch((error) => console.error('Error:', error));
        }
    }, [setTodos]);

    const handleDelete = (id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
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
        const completed = todos.find((todo) => todo.id === id)?.completed;

        axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            title: editText,
            completed,
        })
            .then((res) => {
                setTodos((prevTodos) =>
                    prevTodos.map((todo) =>
                        todo.id === id ? { ...todo, title: res.data.title } : todo
                    )
                );
                setEditingId(null);
            })
            .catch((error) => console.error('Error', error));
    };

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);


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