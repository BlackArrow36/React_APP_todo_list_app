import React, { useState, useEffect } from 'react';
import './App.css';
import Logo from './components/Logo';
import TaskInfo from './components/TaskInfo';

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
  const [dateFormat, setDateFormat] = useState('eu');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, {
        text: input,
        completed: false,
        dueDate
      }]);
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

  const getTaskStyle = (dueDate,darkMode) => {
    //no due date
    if (!dueDate) return darkMode
      ? { backgroundColor: 'darkgray', color: 'white' }
      : { backgroundColor: 'gray', color: 'black' }
    
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) {
      return darkMode
        ? { backgroundColor: 'goldenrod', color: 'black' }
        : { backgroundColor: 'yellow', color: 'black' };
    }
    if (diffDays === 0) {
      return darkMode
        ? { backgroundColor: 'darkred', color: 'white' }
        : { backgroundColor: 'red', color: 'black' };
    }
    if (diffDays <= 3) {
      return darkMode
        ? { backgroundColor: 'SaddleBrown', color: 'white' }
        : { backgroundColor: 'orange', color: 'black' };
    }
    if (diffDays <= 7) {
      return darkMode
        ? { backgroundColor: 'mediumpurple', color: 'white' }
        : { backgroundColor: 'purple', color: 'black' };
    }
    //default
    return darkMode
      ? { backgroundColor: 'gray', color: 'white' }
      : { backgroundColor: 'lightgray', color: 'black' };
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
        <select onChange={(e) => setDateFormat(e.target.value)} value={dateFormat}>
          <option value="eu">European (DD/MM/YYYY)</option>
          <option value="us">American (MM/DD/YYYY)</option>
        </select>
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
          <li key={i} className={task.completed ? 'completed' : ''} style={getTaskStyle(task.dueDate,darkMode)}>
            <Logo/>
            <div onClick={() => toggleTask(i)} style={{ flex: 1 }}>
              <TaskInfo task={task} dateFormat={dateFormat} />
            </div>
            <button onClick={() => deleteTask(i)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
