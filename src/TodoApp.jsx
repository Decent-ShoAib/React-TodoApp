import React, { useState } from "react";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  // Add Task
  const addTask = () => {
    if (task.trim() === "") return;
    const newTask = { id: Date.now(), text: task };
    setTasks([...tasks, newTask]);
    setTask("");
  };

  // Edit Task
  const editTask = (id, text) => {
    setIsEditing(true);
    setTask(text);
    setCurrentTaskId(id);
  };

  const updateTask = () => {
    setTasks(tasks.map((t) => (t.id === currentTaskId ? { ...t, text: task } : t)));
    setTask("");
    setIsEditing(false);
    setCurrentTaskId(null);
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>TODO App</h1>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          onClick={isEditing ? updateTask : addTask}
          style={{
            padding: "10px 20px",
            backgroundColor: isEditing ? "#007bff" : "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {isEditing ? "Update" : "Add"}
        </button>
      </div>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {tasks.map(({ id, text }) => (
          <li
            key={id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
              borderBottom: "1px solid #ccc",
            }}
          >
            <span>{text}</span>
            <div>
              <button
                onClick={() => editTask(id, text)}
                style={{
                  marginRight: "10px",
                  padding: "5px 10px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(id)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
