import React, { useEffect, useState } from "react";
import { fetchUpdateTask, fetchDeleteTask } from "./Tasks";
import { fetchOperations } from "./Operations";
import OperationsComponent from "./OperationsComponent";

const TaskComponent = ({ task, refreshOnAction }) => {
  const [taskStatus, setTaskStatus] = useState(task.status);
  const [smallTask, setSmallTask] = useState(false);
  const [operationsData, setOperationsData] = useState([]);

  useEffect(() => {
    updateOperationsData();
  }, []);

  const updateOperationsData = () => {
    fetchOperations(task.id, setOperationsData);
  };

  const updateThisTaskStatus = () => {
    setTaskStatus("closed");
    const updatedTask = { ...task, status: "closed" };
    fetchUpdateTask(task.id, updatedTask, refreshOnAction);
  };

  const toggleAddOperationLabel = () => {
    setSmallTask((prev) => !prev);
  };

  return (
    <section className="card mt-5 shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <div>
          <h5>{task.title}</h5>
          <h6 className="card-subtitle text-muted">{task.description}</h6>
        </div>

        <div>
          {taskStatus === "open" && (
            <>
              <button
                className="btn btn-info btn-sm mr-2"
                onClick={toggleAddOperationLabel}
              >
                Add operation
                <i className="fas fa-plus-circle ml-1"></i>
              </button>

              <button
                className="btn btn-dark btn-sm"
                onClick={updateThisTaskStatus}
              >
                Finish
                <i className="fas fa-archive ml-1"></i>
              </button>
            </>
          )}

          {operationsData.length == 0 && (
            <button
              className="btn btn-outline-danger btn-sm ml-2"
              onClick={() => {
                fetchDeleteTask(task.id, refreshOnAction);
              }}
            >
              <i className="fas fa-trash false"></i>
            </button>
          )}
        </div>
      </div>

      <OperationsComponent
        taskID={task.id}
        operationsFormOpened={smallTask}
        toggleTaskView={toggleAddOperationLabel}
        operationsData={operationsData}
        refreshOperationsCallback={updateOperationsData}
        taskStatus={taskStatus}
      />
    </section>
  );
};

export default TaskComponent;
