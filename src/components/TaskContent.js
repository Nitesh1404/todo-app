import React from 'react';
import "./cssComponents/TaskContent.css"

const TaskContent = (props) => {
	const { task, deleteTodo, index, handleUpdate } = props;

	const handleDelete = () => {
		deleteTodo(index);
	};
	const handleUpdateTask = () => {
		handleUpdate(index, task.task);
	};

	const toggleClick = () => {
		// Call the toggleComplete function passed from the parent component with the index
		props.toggleComplete(index);
	};

	return (
		<div className='col-md-4'>
			<div className="like-dislike-container my-4">
				<div className="tool-box">
					<button className="btn-close">×</button>
				</div>
				{/* Apply CSS styles to limit size and enable text wrapping */}
				<p className="text-content" style={{ maxWidth: "100%", wordWrap: "break-word", textDecoration: task.completed ? "line-through" : 'none', color: task.completed ? 'green' : '' }} onClick={toggleClick}>{task.task}</p>
				<div className="icons-box">
					<div className="icons">
						<input className="input-box" id="delete-checkbox" type="checkbox" />
						<label className="btn-label" htmlFor="delete-checkbox">
							<div className="fireworks">
								<div className="checked-dislike-fx"></div>
							</div>
							<i className="fa-solid fa-trash mx-2 svgs" id="icon-delete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" onClick={handleDelete}></i>
						</label>
					</div>
					<div className="icons">
						<input className="input-box" id="edit-checkbox" type="checkbox" />
						<label className="btn-label" htmlFor="edit-checkbox">
							<div className="fireworks">
								<div className="checked-dislike-fx"></div>
							</div>
							<i className="fa-solid fa-pen-to-square mx-2 svgs" id="icon-edit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" onClick={handleUpdateTask}></i>
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TaskContent;
