// This file demonstrates how to make standard web requests using the Axios library.
// We use our custom configured 'axiosInstance' which adds our logging interceptors and auth headers automatically.

import { axiosInstance } from "./axiosInstance";

// Note: Axios automatically returns a promise and:
// 1. Parses JSON for us (accessible via response.data)
// 2. Throws an error automatically if the server responds with a status code outside the 2xx range (like 404 or 500)

export const axiosService = {
  // GET: Read data
  get: (id = "") => {
    const path = id ? `/posts/${id}` : "/posts";
    return axiosInstance.get(path).then((response) => response.data);
  },

  // POST: Create new data
  post: (data) => {
    // Axios automatically handles stringifying and header setting for objects!
    return axiosInstance.post("/posts", data).then((response) => response.data);
  },

  // PUT: Update resource by replacing it
  put: (id, data) => {
    return axiosInstance.put(`/posts/${id}`, data).then((response) => response.data);
  },

  // PATCH: Update specific fields
  patch: (id, data) => {
    return axiosInstance.patch(`/posts/${id}`, data).then((response) => response.data);
  },

  // DELETE: Remove resource
  delete: (id) => {
    return axiosInstance.delete(`/posts/${id}`).then((response) => {
      return { success: true, data: response.data };
    });
  }
};
