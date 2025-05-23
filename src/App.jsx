import './App.css';
import Input from './components/input/input';
import List from './components/list/list';
import { useState } from 'react';

function App() {
    const [todos, setTodos] = useState([]);

    return (
        <div className="App">
            <Input setTodos={setTodos} />
            <List todos={todos} setTodos={setTodos} />
        </div>
    );
}

export default App;