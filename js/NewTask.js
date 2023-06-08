import React, { useState } from "react";
import { fetchAddTask } from "./Tasks";

const NewTask = ({ refreshData }) => {
  const [taskValues, setTaskValues] = useState({
    title: "",
    description: "",
    status: "open",
  });

  const updateTask = ({ target }) => {
    setTaskValues((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const submitNewTask = () => {
    fetchAddTask(taskValues, refreshData);
    setTaskValues({
      title: "",
      description: "",
      status: "open",
    });
  };

  return (
    <>
      <div className="card shadow">
        <div className="card-body">
          <h1 className="card-title">New task</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="Title"
                value={taskValues.title}
                onChange={(e) => {
                  updateTask(e);
                }}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="description"
                placeholder="Description"
                value={taskValues.description}
                onChange={(e) => {
                  updateTask(e);
                }}
              />
            </div>
            <button
              className="btn btn-info"
              onClick={(e) => {
                e.preventDefault();
                submitNewTask();
              }}
            >
              Add task
              <i className="fas fa-plus-circle ml-1"></i>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewTask;
