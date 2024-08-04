import React, { useState, useEffect } from 'react';
import './ToDoList.css';
import tdlImage from './img/tdl.png';
import deleteImage from './img/Delete.png';
import dragImage from './img/drag.png'; // 드래그 이미지 추가

const ToDoList = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [draggingIndex, setDraggingIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask.trim(), completed: false }]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleToggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDragStart = (index) => {
    setDraggingIndex(index);
  };

  const handleDragEnter = (index) => {
    const updatedTasks = [...tasks];
    const draggedTask = updatedTasks.splice(draggingIndex, 1)[0];
    updatedTasks.splice(index, 0, draggedTask);
    setDraggingIndex(index);
    setTasks(updatedTasks);
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
  };

  return (
    <div className="todolist">
      <h2 className="goal-title">goal</h2>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`task-item ${task.completed ? 'completed' : ''} ${draggingIndex === index ? 'dragging' : ''}`}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={handleDragEnd}
          >
            
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTask(index)}
            />
            <span>{task.text}</span>
            <img src={dragImage} alt="Drag" className="drag-handle" />
            <button onClick={() => handleDeleteTask(index)}>
              <img src={deleteImage} alt="Delete" />
            </button>
          </li>
        ))}
      </ul>
      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="할 일을 추가해보세요!"
        />
      </div>
      <button className="add-button" onClick={handleAddTask}>
        <img src={tdlImage} alt="Add Task" />
      </button>
    </div>
  );
};

export default ToDoList;
