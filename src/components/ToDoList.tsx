import { useState } from 'react';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="bg-gray-700 rounded-lg text-blue-50">
      <h2 className="text-2xl font-semibold m-4">Todo List</h2>
      <div className="flex space-x-2">
        <input
          type="text"
          className="bg-gray-700 border border-gray-500 rounded px-2 py-1 flex-grow"
          placeholder="Add a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white py-1 px-3 rounded"
          onClick={addTask}
        >
          Add
        </button>
      </div>
      <ul className="mt-4">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-700 p-2 mb-2 rounded"
          >
            {task}
            <button
              className="text-red-500"
              onClick={() => deleteTask(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
