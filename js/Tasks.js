import { APIKey, APIUrl } from "./API";

// Getting tasks
export const fetchTasks = (saveDataCallback) => {
  fetch(`${APIUrl}/tasks`, {
    headers: {
      Authorization: APIKey,
    },
  })
    .then((res) => {
      if (!res.ok) throw Error();
      return res.json();
    })
    .then((responseData) => {
      saveDataCallback(responseData.data.reverse());
    })
    .catch((err) => console.log(err))
    .finally(() => {
      return null;
    });
};

// Creating tasks
export const fetchAddTask = (newTask, refreshTasks) => {
  fetch(`${APIUrl}/tasks`, {
    headers: {
      Authorization: APIKey,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(newTask),
  })
    .then((res) => {
      if (!res.ok) throw Error();
      return res.json();
    })
    .then((responseData) => {
      return null;
    })
    .catch((err) => console.log(err))
    .finally(() => {
      refreshTasks();
    });
};

//Updating tasks
export const fetchUpdateTask = (id, updatedTask, refreshTasks) => {
  fetch(`${APIUrl}/tasks/${id}`, {
    headers: {
      Authorization: APIKey,
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(updatedTask),
  })
    .then((res) => {
      if (!res.ok) throw Error();
      return res.json();
    })
    .then((responseData) => {
      return null;
    })
    .catch((err) => console.log(err))
    .finally(() => {
      refreshTasks();
    });
};

//Deleting tasks
export const fetchDeleteTask = (id, refreshTasks) => {
  fetch(`${APIUrl}/tasks/${id}`, {
    headers: {
      Authorization: APIKey,
      "Content-Type": "application/json",
    },
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) throw Error();
      return res.json();
    })
    .then((responseData) => {
      return null;
    })
    .catch((err) => console.log(err))
    .finally(() => {
      refreshTasks();
    });
};
