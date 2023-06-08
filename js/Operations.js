import { APIKey, APIUrl } from "./API";

// Getting Operations
export const fetchOperations = (id, saveDataCallback) => {
  fetch(`${APIUrl}/tasks/${id}/operations`, {
    headers: {
      Authorization: APIKey,
    },
  })
    .then((res) => {
      if (!res.ok) throw Error();
      return res.json();
    })
    .then((responseData) => {
      if (
        responseData.error === false &&
        typeof saveDataCallback === "function"
      ) {
        saveDataCallback(responseData.data);
        // console.log(responseData.data);
      }
    })
    .catch((err) => console.log(err, "catch error"))
    .finally(() => {
      console.log("Udało się pobrać operacje do jednego taska");
    });
};

// Adding Operations
export const fetchAddOperation = (id, description, refreshOperations) => {
  const newOperation = {
    description,
    timeSpent: 0,
  };

  fetch(`${APIUrl}/tasks/${id}/operations`, {
    headers: {
      Authorization: APIKey,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(newOperation),
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
      refreshOperations();
    });
};

// Getting single operatione
// LEGACY - it's notused anywhere, to delete
export const fetchSingleOperation = (id, saveDataCallback) => {
  fetch(`${APIUrl}/operations/${id}`, {
    headers: {
      Authorization: APIKey,
    },
  })
    .then((res) => {
      if (!res.ok) throw Error();
      return res.json();
    })
    .then((responseData) => {
      if (
        responseData.error === false &&
        typeof saveDataCallback === "function"
      ) {
        saveDataCallback(responseData.data);
      }
    })
    .catch((err) => console.log(err, "catch error"))
    .finally(() => {
      console.log("Udało się pobrać pojedyńczą operacje");
    });
};

// Updating Single Operation => TimeSpent
export const fetchUpdateOperation = (
  singleOperation,
  timeIncrease,
  refreshOperations
) => {
  const updatedOperation = {
    description: singleOperation.description,
    timeSpent: singleOperation.timeSpent + timeIncrease,
  };

  fetch(`${APIUrl}/operations/${singleOperation.id}`, {
    headers: {
      Authorization: APIKey,
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(updatedOperation),
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
      refreshOperations();
    });
};

// Deleting Operation
export const fetchDeleteSingleOperation = (
  singleOperation,
  refreshOperations
) => {
  fetch(`${APIUrl}/operations/${singleOperation.id}`, {
    method: "DELETE",
    headers: {
      Authorization: APIKey,
    },
  })
    .then((res) => {
      if (!res.ok) throw Error();
      return res.json();
    })
    .then((responseData) => {
      if (
        responseData.error === false &&
        typeof saveDataCallback === "function"
      ) {
        return null;
      }
    })
    .catch((err) => console.log(err, "catch error"))
    .finally(() => {
      refreshOperations();
    });
};
