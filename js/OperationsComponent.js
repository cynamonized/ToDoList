import React, { useState } from "react";
import { fetchAddOperation } from "./Operations";
import SingleOperationComponent from "./SingleOperationComponent";

const OperationsComponent = ({
  operationsFormOpened,
  taskID,
  toggleTaskView,
  operationsData,
  refreshOperationsCallback,
  taskStatus,
}) => {
  const [newOperationsForm, setNewOperationsForm] = useState("");

  const updateNewOperationsForm = ({ target }) => {
    setNewOperationsForm(target.value);
  };

  const submitNewOperation = () => {
    if (newOperationsForm === "") return;
    fetchAddOperation(taskID, newOperationsForm, refreshOperationsCallback);
    setNewOperationsForm("");
    toggleTaskView();
  };

  return (
    <>
      {operationsFormOpened && (
        <div className="card-body">
          <form>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Operation description"
                value={newOperationsForm}
                onChange={(e) => {
                  updateNewOperationsForm(e);
                }}
              />

              <div className="input-group-append">
                <button
                  className="btn btn-info"
                  onClick={(e) => {
                    e.preventDefault();
                    submitNewOperation();
                  }}
                >
                  Add
                  <i className="fas fa-plus-circle ml-1"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      <ul className="list-group list-group-flush">
        {operationsData &&
          operationsData.map((operation) => {
            return (
              <SingleOperationComponent
                singleOperation={operation}
                key={operation.id}
                refreshOperationsCallback={refreshOperationsCallback}
                taskStatus={taskStatus}
              />
            );
          })}
      </ul>
    </>
  );
};

export default OperationsComponent;
