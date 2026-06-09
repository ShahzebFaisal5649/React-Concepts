import axios from "axios";

// Create an instance of Axios with a baseline configuration.
// This means we don't have to type the full URL every time we make a request.
export const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000 // If request takes longer than 10 seconds, cancel it
});

// A request interceptor runs BEFORE the request is sent to the server.
axiosInstance.interceptors.request.use(
  (config) => {
    // We log that the request is going out
    console.log(`[Axios Request Interceptor] Sending ${config.method.toUpperCase()} request to: ${config.url}`);
    
    // We attach a fake authorization token header.
    // Adding this custom header triggers the browser to perform a CORS preflight (OPTIONS) request
    // when we make requests to other domains!
    config.headers.Authorization = "Bearer student-fake-jwt-token";
    
    return config;
  },
  (error) => {
    // If something goes wrong before the request is even sent
    return Promise.reject(error);
  }
);

// A response interceptor runs AFTER a response comes back from the server, but before it reaches our then/catch block.
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`[Axios Response Interceptor] Received response from: ${response.config.url} with status: ${response.status}`);
    return response;
  },
  (error) => {
    console.log(`[Axios Response Interceptor] Request failed! Error message: ${error.message}`);
    
    // We can handle specific error codes globally here, like redirects:
    if (error.response && error.response.status === 401) {
      console.log("Global handler: Unauthorized! Maybe redirect to login page?");
    }
    
    // Pass the error along so the component's catch block can read it too
    return Promise.reject(error);
  }
);
