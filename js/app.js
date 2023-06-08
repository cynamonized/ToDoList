import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { fetchTasks } from "./Tasks";
import NewTask from "./NewTask";
import TaskComponent from "./TaskComponent";

function App() {
  const [tasksData, setTasksData] = useState(null);

  useEffect(() => {
    fetchTasks(setTasksData);
  }, []);

  const refreshTasksData = () => {
    fetchTasks(setTasksData);
  };

  return (
    <>
      <NewTask refreshData={refreshTasksData} />

      {tasksData &&
        tasksData.map((task) => {
          return (
            <TaskComponent
              key={task.id}
              task={task}
              refreshOnAction={refreshTasksData}
            />
          );
        })}
    </>
  );
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
