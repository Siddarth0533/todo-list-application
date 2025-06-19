import React, { useState, useEffect } from 'react';
import './theme.css';

// Main TodoList component
function TodoList() {

    //API
    const API_BASE = "https://todo-list-application-production.up.railway.app";
    // State for all tasks
    const [tasks, setTasks] = useState([]);
    // State for new task input fields
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    // State for edit modal
    const [showEditModal, setShowEditModal] = useState(false);
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    // State for toast notifications
    const [notification, setNotification] = useState(null);
    // State for delete modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteTaskId, setDeleteTaskId] = useState(null);

    // Fetch all tasks from backend on component mount
    useEffect(() => {
        fetch('${API_BASE}')
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    // Show toast notification
    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 2500);
    };

    // Add a new task
    const handleAdd = (title, description) => {
        fetch('${API_BASE}/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(newTask => {
                setTasks([...tasks, newTask]);
                setTitle('');
                setDescription('');
                showNotification('Task added successfully!');
            })
            .catch(error => {
                showNotification('Error adding task', 'error');
                console.error('Error Adding task:', error);
            });
    };

    // Delete a task
    const handleDelete = (id) => {
        fetch(`${API_BASE}/todos/${id}`, {  
            method: 'DELETE',
        }).then(() => {
            setTasks(tasks.filter(task => task.id !== id));
            showNotification('Task deleted successfully!');
        }).catch(error => {
            showNotification('Error deleting task', 'error');
            console.error('Error deleting task:', error);
        });
    };

    // Open the edit modal and set current task values
    const openEditModal = (task) => {
        setEditTaskId(task.id);
        setEditTitle(task.title);
        setEditDescription(task.description);
        setShowEditModal(true);
    };

    // Close the edit modal and reset state
    const closeEditModal = () => {
        setShowEditModal(false);
        setEditTaskId(null);
        setEditTitle('');
        setEditDescription('');
    };

    // Update a task (from modal)
    const handleUpdate = (e) => {
        e.preventDefault();
        fetch(`${API_BASE}/todos/${editTaskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: editTitle, description: editDescription }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(updatedTask => {
                setTasks(tasks.map(task => task.id === editTaskId ? updatedTask : task));
                closeEditModal();
                showNotification('Task updated successfully!');
            })
            .catch(error => {
                showNotification('Error updating task', 'error');
                console.error('Error updating task:', error);
            });
    };

    // Toggle task completion status
    const handleToggleComplete = (id, currentStatus) => {
        const task = tasks.find(t => t.id === id);
        if (!task) {
            showNotification('Task not found', 'error');
            return;
        }
        if (task.title == null || task.description == null) {
            fetch('${API_BASE}')
                .then(response => response.json())
                .then(data => setTasks(data));
            showNotification('Task data was incomplete. Please try again.', 'error');
            return;
        }
        const payload = {
            title: task.title,
            description: task.description,
            completed: !currentStatus
        };
        console.log('Sending to backend:', payload);
        fetch(`${API_BASE}/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(updatedTask => {
            console.log('Updated task from backend:', updatedTask);
            setTasks(tasks.map(task => task.id === id ? updatedTask : task));
            showNotification('Task status updated!');
        })
        .catch(error => {
            showNotification('Error toggling complete', 'error');
            console.error('Error toggling complete:', error);
        });
    };

    // Open the delete modal and set current task id
    const openDeleteModal = (id) => {
        setDeleteTaskId(id);
        setShowDeleteModal(true);
    };

    // Close the delete modal and reset state
    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setDeleteTaskId(null);
    };

    // Confirm delete handler
    const confirmDelete = () => {
        if (deleteTaskId !== null) {
            handleDelete(deleteTaskId);
            closeDeleteModal();
        }
    };

    // Render the UI
    return (
        <div className="Container-sm text-center" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
            <div className="card" style={{ width: "40rem", marginTop: "5rem", marginBottom: "5rem", boxShadow: "0 4px 16px rgba(0,0,0,0.10)" }}>
                <div className="card-body">
                    <h1 className="card-title mb-3">Todo List</h1>
                    <h6 className="card-subtitle mb-4 text-body-secondary">Organize your tasks, boost your productivity</h6>
                    {/* Add Task Form */}
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        handleAdd(title, description);
                      }}
                    >
                      <div className="input-group mb-4">
                        <div className="input-group">
                          <span className="input-group-text">Task and Description</span>
                          <input
                            type="text"
                            aria-label="Task"
                            className="form-control"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder='Enter task title'
                            required
                          />
                          <input
                            type="text"
                            aria-label="Description"
                            className="form-control"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder='Enter task description'
                            required
                          />
                          <button
                            className="btn btn-primary"
                            type="submit"
                            id="button-addon2"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </form>

                    <h5 className="card-title mb-3">Your Tasks</h5>
                    <p className="card-text mb-4">Here are the tasks you have added</p>

                    {/* Task List */}
                    {/* Sort tasks: incomplete first, completed last */}
                    <ul className="list-group">
                        {tasks.slice().sort((a, b) => a.completed - b.completed).map((task, idx) => (
                            <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center" style={{ transition: 'background 0.2s', cursor: 'pointer' }}>
                                <div style={{ textAlign: 'left', width: '100%' }}>
                                    <strong style={{ fontSize: '1.1em', textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</strong>
                                    <div className={task.completed ? "text-muted text-decoration-line-through" : "text-muted"} style={{ fontSize: '0.97em', marginTop: '0.25em' }}>{task.description}</div>
                                </div>
                                <div className="flex-shrink-0">
                                    {/* Edit Button */}
                                    <button className={task.completed ? "btn btn-secondary btn-sm" :"btn btn-warning btn-sm"} style={{ marginRight: '0.5em' }} onClick={() => {!task.completed ? openEditModal(task): showNotification('Cannot edit completed tasks', 'error');}}>
                                        ✎ Edit
                                    </button>
                                    {/* Toggle Complete Button */}
                                    <button className={task.completed ? "btn btn-secondary btn-sm" : "btn btn-success btn-sm"} onClick={() => handleToggleComplete(task.id, task.completed)} style={{ marginLeft: '0.5em' }}>
                                        {task.completed ? <><span role="img" aria-label="Incomplete">↻</span> Mark Incomplete</> : <><span role="img" aria-label="Complete">✔</span> Mark Complete</>}
                                    </button>
                                    {/* Delete Button */}
                                    <button type="button" className="btn btn-danger btn-sm" style={{ marginLeft: '0.5em' }} onClick={() => openDeleteModal(task.id)}>
                                        <span role="img" aria-label="Delete">✘</span> Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Delete Confirmation Modal */}
                    {showDeleteModal && (
                        <div className="modal" style={{ display: 'block', background: 'rgba(0,0,0,0.3)' }}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-body text-center">
                                        <p>Delete this task?</p>
                                        <button type="button" className="btn btn-danger me-2" onClick={confirmDelete}>Delete</button>
                                        <button type="button" className="btn btn-secondary" onClick={closeDeleteModal}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Edit Modal */}
                    {showEditModal && (
                        <div className="modal" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Edit Task</h5>
                                        <button type="button" className="btn-close" onClick={closeEditModal}></button>
                                    </div>
                                    <form onSubmit={handleUpdate}>
                                        <div className="modal-body">
                                            <input
                                                type="text"
                                                className="form-control mb-2"
                                                value={editTitle}
                                                onChange={e => setEditTitle(e.target.value)}
                                                required
                                                placeholder="Title"
                                            />
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={editDescription}
                                                onChange={e => setEditDescription(e.target.value)}
                                                required
                                                placeholder="Description"
                                            />
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={closeEditModal}>Cancel</button>
                                            <button type="submit" className="btn btn-primary">Save Changes</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Toast Notification */}
                    {notification && (
                        <div style={{
                            position: 'fixed',
                            top: '1rem',
                            right: '1rem',
                            zIndex: 9999,
                            padding: '1em 2em',
                            background: notification.type === 'error' ? '#f44336' : '#4caf50',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            letterSpacing: '0.5px',
                            boxShadow: '0 2px 12px rgba(0,0,0,0.18)'
                        }}>
                            {notification.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default TodoList;
