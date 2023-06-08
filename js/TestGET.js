import React, { useEffect, useState } from "react";
import {
  fetchTasks,
  fetchAddTask,
  fetchUpdateTask,
  fetchDeleteTask,
} from "./Tasks";
import {
  fetchOperations,
  fetchAddOperation,
  fetchSingleOperation,
  fetchUpdateOperation,
  fetchDeleteSingleOperation,
} from "./Operations";

// Conclusions:
// Functions work fine but it only works with predefined
// indexes of states (as arguments) -> once proper DOM generated,
// it should be given proper keys and IDs to props so
// each task/operation can read its own ID and be able
// to use this ID during fetch <-- paper notes, steps 1-4

function TestGET() {
  const [tasksData, setTasksData] = useState(null);
  const [operationsData, setOperationsData] = useState(null);
  const [singleOperation, setSingleOperation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading == true) {
    return <p>Data is loading...</p>;
  }

  return (
    <>
      <h1>Functions testing (demo)</h1>

      <button
        onClick={() => {
          fetchAddTask("test 1", "test2", setTasksData);
        }}
      >
        ADD TEST TASK TO THE SERVER
      </button>

      <button
        onClick={() => {
          fetchUpdateTask(
            tasksData[0].id,
            "This is example title3",
            "This is description",
            "closed",
            setTasksData
          );
        }}
      >
        UPDATE STATUS OF A TASK
      </button>

      <button
        onClick={() => {
          fetchDeleteTask(tasksData[tasksData.length - 1].id, setTasksData);
        }}
      >
        DELETE TASK 3
      </button>

      <button onClick={() => fetchTasks(setTasksData)}>GET TASKS</button>

      {tasksData &&
        tasksData.map((task) => {
          return (
            <div key={task.id}>
              <b>{task.title}</b> <p>{task.status}</p>
            </div>
          );
        })}

      {/* OPERATIONS TESTING SECTION */}
      <div style={{ paddingTop: "50px" }}>
        <button
          onClick={() => fetchOperations(tasksData[0].id, setOperationsData)}
        >
          GET OPERATIONS FOR TASK 1
        </button>

        <button
          onClick={() => {
            fetchSingleOperation(operationsData[0].id, setSingleOperation);
          }}
        >
          GET SINGLE OPERATION
        </button>

        {singleOperation && console.log(singleOperation)}

        <button
          onClick={() => {
            fetchUpdateOperation(
              singleOperation,
              10,
              tasksData[0].id,
              setOperationsData,
              setSingleOperation
            );
          }}
        >
          UPDATE SINGLE OPERATION (1) from TASK 1
        </button>

        <button
          onClick={() =>
            fetchAddOperation(
              tasksData[0].id,
              "Test description 1",
              setOperationsData
            )
          }
        >
          ADD OPERATION TO TASK 1
        </button>

        <button
          onClick={() => {
            fetchDeleteSingleOperation(singleOperation, setOperationsData);
          }}
        >
          DELETE OPERATION
        </button>
      </div>
    </>
  );
}

export default TestGET;
