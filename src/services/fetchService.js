// This file demonstrates how to make standard web requests using the browser's built-in Fetch API.
// We make requests to the JSONPlaceholder API (a free site that simulates a real backend database).

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

// Helper function to check if the response was successful
// Because Fetch does NOT throw errors on 404 or 500 codes, we must check manually!
function handleFetchResponse(response) {
  if (!response.ok) {
    throw new Error(`Fetch Request Failed! Status: ${response.status} (${response.statusText})`);
  }
  return response.json(); // Fetch requires us to parse the response text into a JSON object manually
}

export const fetchService = {
  // GET: Read data
  get: (id = "") => {
    const url = id ? `${BASE_URL}/${id}` : BASE_URL;
    return fetch(url).then(handleFetchResponse);
  },

  // POST: Create new data
  post: (data) => {
    return fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json" // Tell the server we are sending JSON text
      },
      body: JSON.stringify(data) // Convert our JS object into a JSON text string
    }).then(handleFetchResponse);
  },

  // PUT: Update a resource by replacing it completely
  put: (id, data) => {
    return fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(handleFetchResponse);
  },

  // PATCH: Update only specific fields of a resource
  patch: (id, data) => {
    return fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(handleFetchResponse);
  },

  // DELETE: Remove a resource
  delete: (id) => {
    return fetch(`${BASE_URL}/${id}`, {
      method: "DELETE"
    }).then((response) => {
      // DELETE request response might be empty or OK, so we inspect manually
      if (!response.ok) {
        throw new Error(`Fetch Delete Failed! Status: ${response.status}`);
      }
      return { success: true, status: response.status };
    });
  }
};
