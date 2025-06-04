import styles from './input.module.css';
import { useState } from 'react';
import axios from 'axios';

const Input = ({ setTodos }) => {
    const [inputValue, setInputValue] = useState('');

    const handleAddTodo = () => {
        if (!inputValue.trim()) return;

        axios.post('https://jsonplaceholder.typicode.com/todos', {
            title: inputValue,
            completed: false,
        })
            .then((res) => {
                setTodos((prevTodos) => [...prevTodos, res.data]);
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