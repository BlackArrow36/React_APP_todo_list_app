import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [filter, setFilter] = useState('incomplete');
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? savedMode === 'true' : true;
  });
  

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { text: input, completed: false, dueDate }]);
      setInput('');
      setDueDate('');
    }
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const getTaskStyle = (dueDate) => {
    if (!dueDate) return { backgroundColor: 'lightgray',color:'black' };
  
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    if (diffDays < 0) return { backgroundColor: 'yellow',color:'black' }; // Overdue
    if (diffDays == 0) return { backgroundColor: 'red',color:'black' }; // Today
    if (diffDays <= 3) return { backgroundColor: 'orange',color:'black' }; // Urgent
    if (diffDays <= 7) return { backgroundColor: 'lavender',color:'black' }; // Upcoming
  
    return { backgroundColor: 'white',color:'black' }; // Normal
  };
  

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <h1>To-Do List</h1>
      <div className="theme-toggle">
        <button onClick={() => setDarkMode(!darkMode)}>
          Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </button>
      </div>
      <div className="input-section">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <div className="filters">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('incomplete')}>Incomplete</button>
      </div>
      <ul>
        {filteredTasks.map((task, i) => (
          <li key={i} className={task.completed ? 'completed' : ''} style={getTaskStyle(task.dueDate)}>        
            <span onClick={() => toggleTask(i)}>
              {task.text} {task.dueDate && `(Due: ${task.dueDate})`}
            </span>
            <button onClick={() => deleteTask(i)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
