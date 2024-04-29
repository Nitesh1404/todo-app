import React, { useState, useRef } from 'react';
import TaskForm from './TaskForm';
import TaskContent from './TaskContent';

const TodoContainer = () => {
	const [todos, setTodos] = useState([]);
	const [updateIndex, setUpdateIndex] = useState(-1); // Index of the task being updated
	const [updateTask, setUpdateTask] = useState(''); // New task value

	// Ref for the modal
	const modalRef = useRef(null);
	const refClose = useRef(null);

	const addTodo = (todo) => {
		setTodos([...todos, { task: todo, completed: false }]);
	}

	const deleteTodo = (index) => {
		let newTodos = todos.filter((todo, idx) => idx !== index);
		setTodos(newTodos);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		refClose.current.click();
		if (updateIndex !== -1 && updateTask !== '') {
			// Update the task at the specified index
			const updatedTodos = todos.map((todo, idx) => {
				if (idx === updateIndex) {
					return { task: updateTask };
				}
				return todo;
			});
			setTodos(updatedTodos);
			// Reset updateIndex and updateTask
			setUpdateIndex(-1);
			setUpdateTask('');

			// Close the modal using ref
			modalRef.current.classList.remove('show');
			modalRef.current.style.display = 'none';
			document.body.classList.remove('modal-open');
			const modalBackdrop = document.getElementsByClassName('modal-backdrop');
			document.body.removeChild(modalBackdrop[0]);

			refClose.current.click();
		}
	}

	const handleUpdate = (index, task) => {
		// Set the index of the task being updated and the new task value
		setUpdateIndex(index);
		setUpdateTask(task);
		// Open the modal using ref
		modalRef.current.classList.add('show');
		modalRef.current.style.display = 'block';
		document.body.classList.add('modal-open');
		const modalBackdrop = document.createElement('div');
		modalBackdrop.className = 'modal-backdrop fade show';
		document.body.appendChild(modalBackdrop);
	}

	const toggleComplete = (index) => {
		const updatedTodos = [...todos];
		updatedTodos[index].completed = !updatedTodos[index].completed;
		setTodos(updatedTodos);
	};



	return (
		<>
			{/* Modal for updating task */}
			<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" ref={modalRef}>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">Update your task</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<form className="form-part d-flex my-5" onSubmit={handleSubmit}>
								<div className="input-group">
									<input
										placeholder="Edit your task here"
										type="text"
										id="input-field"
										value={updateTask}
										onChange={(e) => setUpdateTask(e.target.value)}
									/>
									<button className="submit-button" type="submit"><span>UPDATE</span></button>
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button type="button" ref={refClose} className="btn btn-secondary" data-dismiss="modal">Close</button>
							<button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
						</div>
					</div>
				</div>
			</div>

			{/* Todo part */}
			<div className='todo-container container d-flex flex-column align-items-center my-5'>
				<TaskForm addTodo={addTodo} />
			</div>
			<div className="container">
				<div className="row">
					{todos.map((task, index) => (
						<TaskContent
							task={task}
							key={index}
							index={index}
							deleteTodo={deleteTodo}
							handleUpdate={handleUpdate} // Pass handleUpdate function
							toggleComplete={toggleComplete}
						/>
					))}
				</div>
			</div>
		</>
	);
}

export default TodoContainer;
