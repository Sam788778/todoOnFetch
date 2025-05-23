import styles from './input.module.css';
import { useState } from 'react';

const Input = ({ setTodos }) => {
    const [inputValue, setInputValue] = useState('');

    const handleAddTodo = () => {
        if (!inputValue.trim()) return;

        fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: inputValue,
                completed: false,
            }),
        })
            .then((res) => res.json())
            .then((newTodo) => {
                setTodos((prevTodos) => [...prevTodos, newTodo]);
                setInputValue('');
            })
            .catch((error) => console.error('Error', error));
    };

    return (
        <div className={styles.inputContainer}>
            <input
                type="text"
                className={styles.input}
                placeholder="Type here..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
            />
            <button className={styles.button} onClick={handleAddTodo}>
                Add
            </button>
        </div>
    );
};

export default Input;