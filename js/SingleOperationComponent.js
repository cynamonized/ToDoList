import React, { useEffect, useState } from "react";
import { fetchUpdateOperation, fetchDeleteSingleOperation } from "./Operations";

const SingleOperationComponent = ({
  singleOperation,
  refreshOperationsCallback,
  taskStatus,
}) => {
  const [toggleButtons, setToggleButtons] = useState(false);
  const [operationTime, setOperationTime] = useState("0m");
  const [timeToAdd, setTimeToAdd] = useState("");

  useEffect(() => {
    setOperationTime(() => {
      return formatTime(singleOperation.timeSpent);
    });
  }, [singleOperation.timeSpent]);

  const updateTimeToAddFormValue = ({ target }) => {
    setTimeToAdd(Math.abs(Math.round(target.value)));
  };

  const updateButtonsVisibility = () => {
    setToggleButtons((prev) => !prev);
  };

  const formatTime = (minutes) => {
    if (minutes <= 0) return "0m";

    if (minutes < 60) {
      return `${minutes}m`;
    } else {
      const hours = Math.floor(minutes / 60);
      const minutesRest = minutes - hours * 60;
      return `${hours}h ${minutesRest}m`;
    }
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        {singleOperation.description}
        <span className="badge badge-success badge-pill ml-2">
          {operationTime}
        </span>
      </div>

      {toggleButtons && (
        <form>
          <div className="input-group input-group-sm">
            <input
              type="number"
              className="form-control"
              placeholder="Spent time in minutes"
              style={{ width: "12rem" }}
              value={timeToAdd}
              onChange={(e) => {
                updateTimeToAddFormValue(e);
              }}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-success"
                onClick={(e) => {
                  e.preventDefault();
                  fetchUpdateOperation(
                    singleOperation,
                    timeToAdd,
                    refreshOperationsCallback
                  );
                  updateButtonsVisibility();
                }}
              >
                <i className="fas fa-save"></i>
              </button>
              <button
                className="btn btn-outline-dark"
                onClick={(e) => {
                  e.preventDefault();
                  updateButtonsVisibility();
                }}
              >
                <i className="fas fa-times false"></i>
              </button>
            </div>
          </div>
        </form>
      )}

      {!toggleButtons && (
        <div>
          {taskStatus == "open" && (
            <button
              className="btn btn-outline-success btn-sm mr-2"
              onClick={(e) => {
                e.preventDefault();
                updateButtonsVisibility();
              }}
            >
              Add time
              <i className="fas fa-clock ml-1"></i>
            </button>
          )}

          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => {
              fetchDeleteSingleOperation(
                singleOperation,
                refreshOperationsCallback
              );
            }}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      )}
    </li>
  );
};

export default SingleOperationComponent;
