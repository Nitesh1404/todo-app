import React, { useState } from 'react'

const TaskForm = (props) => {
	const { addTodo } = props;
	const [tasks, setTasks] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (tasks.length !== 0) {
			addTodo(tasks);
		}

		setTasks("");
	}

	const handleOnChange = (e) => {
		setTasks(e.target.value);
	}



	return (
		<div className='container'>
			<h1 className='text-center my-3'>To-do App</h1>
			<form className="form-part d-flex my-5" onSubmit={handleSubmit}>
				{/* <input className="form-control mr-sm-2" placeholder="add your task here" onChange={handleOnChange} value={tasks} />
				<button className="btn btn-outline my-2 my-sm-0" type="submit" style={{ backgroundColor: "#ffcbf3" }}>Add</button> */}
				<div class="input-group">
					<input placeholder="add your task here" type="text" id="input-field" onChange={handleOnChange} value={tasks} />
					<button class="submit-button"><span>ADD</span></button>
				</div>
			</form>


		</div>
	)

}

export default TaskForm