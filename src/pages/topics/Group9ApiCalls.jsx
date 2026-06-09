import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchService } from "../../services/fetchService";
import { axiosService } from "../../services/axiosService";

// ==========================================
// 1. Fetch API CRUD Demo
// ==========================================
export function FetchApiDemo() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchGet = () => {
    setLoading(true);
    fetchService.get(1)
      .then(data => setResult({ method: "GET (Read Post 1)", payload: data }))
      .catch(err => setResult({ error: err.message }))
      .finally(() => setLoading(false));
  };

  const handleFetchPost = () => {
    setLoading(true);
    const newPost = { title: "Student Study Post", body: "Learning React is fun!" };
    fetchService.post(newPost)
      .then(data => setResult({ method: "POST (Create Post)", payload: data }))
      .catch(err => setResult({ error: err.message }))
      .finally(() => setLoading(false));
  };

  const handleFetchDelete = () => {
    setLoading(true);
    fetchService.delete(1)
      .then(data => setResult({ method: "DELETE (Delete Post 1)", payload: data }))
      .catch(err => setResult({ error: err.message }))
      .finally(() => setLoading(false));
  };

  return (
    <div className="demo-box">
      <p>Test standard CRUD requests using browser's built-in <strong>Fetch API</strong>:</p>
      
      <div className="flex-row">
        <button className="demo-btn" onClick={handleFetchGet}>GET Post 1</button>
        <button className="demo-btn" onClick={handleFetchPost}>POST New Post</button>
        <button className="demo-btn" style={{ backgroundColor: "#ef5350" }} onClick={handleFetchDelete}>DELETE Post 1</button>
      </div>

      <div className="sim-log-box" style={{ marginTop: "12px", padding: "8px", backgroundColor: "rgba(0,0,0,0.05)", borderRadius: "4px", fontSize: "11px", fontFamily: "monospace", minHeight: "80px" }}>
        <strong>Response Outputs:</strong>
        {loading ? (
          <div>Loading request...</div>
        ) : result ? (
          <div>
            <div><strong>Operation:</strong> {result.method || "Error"}</div>
            <div><strong>Data:</strong> {JSON.stringify(result.payload || result.error)}</div>
          </div>
        ) : (
          <div style={{ color: "var(--text-muted)" }}>Click a request button above to see response...</div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 2. Axios CRUD Demo
// ==========================================
export function AxiosApiDemo() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAxiosGet = () => {
    setLoading(true);
    axiosService.get(2)
      .then(data => setResult({ method: "GET (Read Post 2)", payload: data }))
      .catch(err => setResult({ error: err.message }))
      .finally(() => setLoading(false));
  };

  const handleAxiosPost = () => {
    setLoading(true);
    const newPost = { title: "Axios Post", body: "Sent using Axios Service" };
    axiosService.post(newPost)
      .then(data => setResult({ method: "POST (Create Post)", payload: data }))
      .catch(err => setResult({ error: err.message }))
      .finally(() => setLoading(false));
  };

  const handleAxiosDelete = () => {
    setLoading(true);
    axiosService.delete(2)
      .then(data => setResult({ method: "DELETE (Delete Post 2)", payload: data }))
      .catch(err => setResult({ error: err.message }))
      .finally(() => setLoading(false));
  };

  return (
    <div className="demo-box">
      <p>Test standard CRUD requests using the <strong>Axios Library</strong> (configured with interceptors):</p>
      
      <div className="flex-row">
        <button className="demo-btn" onClick={handleAxiosGet}>GET Post 2</button>
        <button className="demo-btn" onClick={handleAxiosPost}>POST New Post</button>
        <button className="demo-btn" style={{ backgroundColor: "#ef5350" }} onClick={handleAxiosDelete}>DELETE Post 2</button>
      </div>

      <div className="sim-log-box" style={{ marginTop: "12px", padding: "8px", backgroundColor: "rgba(0,0,0,0.05)", borderRadius: "4px", fontSize: "11px", fontFamily: "monospace", minHeight: "80px" }}>
        <strong>Response Outputs:</strong>
        {loading ? (
          <div>Loading Axios request...</div>
        ) : result ? (
          <div>
            <div><strong>Operation:</strong> {result.method || "Error"}</div>
            <div><strong>Data:</strong> {JSON.stringify(result.payload || result.error)}</div>
          </div>
        ) : (
          <div style={{ color: "var(--text-muted)" }}>Click a request button to run (inspect console for interceptor logs)...</div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 3. Difference between Axios and Fetch (404 Error checks)
// ==========================================
export function AxiosVsFetchDemo() {
  const [fetchOutput, setFetchOutput] = useState("");
  const [axiosOutput, setAxiosOutput] = useState("");

  // Trigger Fetch 404 check
  const testFetch404 = () => {
    setFetchOutput("Fetching bad URL...");
    // We request an invalid route to simulate a 404 error
    fetch("https://jsonplaceholder.typicode.com/non-existent-path-abc123")
      .then(response => {
        // Fetch runs this block successfully even though the page is 404!
        // It does not throw an error automatically.
        setFetchOutput(`Fetch resolved to .then()! status: ${response.status}, response.ok: ${response.ok}`);
      })
      .catch(err => {
        // This catch block does NOT run for 404s!
        setFetchOutput(`Fetch failed in .catch(): ${err.message}`);
      });
  };

  // Trigger Axios 404 check
  const testAxios404 = () => {
    setAxiosOutput("Requesting bad URL via Axios...");
    // We request invalid route
    axiosService.get("non-existent-path-abc123")
      .then(data => {
        // This block is skipped!
        setAxiosOutput("Axios resolved successfully (unexpected for 404)");
      })
      .catch(error => {
        // Axios automatically rejects the promise and fires the catch block!
        setAxiosOutput(`Axios threw error to .catch()! message: ${error.message}, status: ${error.response?.status}`);
      });
  };

  return (
    <div className="demo-box">
      <p>Click these buttons to fetch a broken 404 URL. See how they handle the promise resolution differently:</p>
      
      <div className="flex-row">
        <div style={{ flex: 1 }}>
          <button className="demo-btn" style={{ width: "100%" }} onClick={testFetch404}>Test Fetch 404</button>
          <div className="sim-log-box" style={{ marginTop: "8px", fontSize: "11px", minHeight: "50px", backgroundColor: "#fffde7" }}>
            <strong>Fetch Result:</strong> <br /> {fetchOutput || "Waiting..."}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <button className="demo-btn" style={{ width: "100%" }} onClick={testAxios404}>Test Axios 404</button>
          <div className="sim-log-box" style={{ marginTop: "8px", fontSize: "11px", minHeight: "50px", backgroundColor: "#ffebee" }}>
            <strong>Axios Result:</strong> <br /> {axiosOutput || "Waiting..."}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. Axios / Fetch relation to preflight
// ==========================================
export function AxiosFetchPreflightDemo() {
  return (
    <div className="demo-box">
      <p className="demo-instruction">
        <strong>How headers trigger security checks:</strong>
      </p>
      <ul className="demo-list">
        <li>
          When we configured the <code>axiosInstance</code>, we added a request interceptor that appends an 
          <code>Authorization</code> header to every outgoing call.
        </li>
        <li>
          Because of this custom header, <strong>EVERY single Axios request</strong> in our app (like GET Post 2 above) 
          triggers the browser to run a preflight <strong>OPTIONS</strong> request first.
        </li>
        <li>
          Standard Fetch calls (like GET Post 1 above) do not send custom headers, so the browser sends them directly 
          without firing any preflight checks.
        </li>
      </ul>
      <p className="demo-instruction">
        <strong>Try it:</strong> Open your Network tab. Click 'GET Post 1' in the Fetch Demo, then click 'GET Post 2' in the Axios Demo. 
        Notice that GET Post 2 has an OPTIONS request listed right before the GET request in your Network stream, whereas GET Post 1 does not!
      </p>
    </div>
  );
}

// ==========================================
// 5. Async/Await in React Demo
// ==========================================
export function AsyncAwaitDemo() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsersAsync = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users/2");
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="demo-box">
      <p>Load user profile 2 using ES8 async/await inside click handlers (can also run inside useEffect):</p>
      <button className="demo-btn" onClick={fetchUsersAsync}>
        {loading ? "Awaiting..." : "Trigger Async Fetch (await)"}
      </button>

      <div className="sim-log-box" style={{ marginTop: "12px", padding: "8px", backgroundColor: "rgba(0,0,0,0.05)", borderRadius: "4px", fontSize: "11px", fontFamily: "monospace", minHeight: "60px" }}>
        {loading && <div>⏳ Awaiting network promise...</div>}
        {error && <div style={{ color: "#ef5350" }}>❌ Error: {error}</div>}
        {data && (
          <div>
            <h5>✅ Success Fetch:</h5>
            <div>Name: <strong>{data.name}</strong></div>
            <div>Email: {data.email}</div>
            <div>Company: {data.company?.name}</div>
          </div>
        )}
        {!loading && !error && !data && <div style={{ color: "var(--text-muted)" }}>Click button to await response.</div>}
      </div>
    </div>
  );
}

// ==========================================
// 6. React Query (TanStack Query) Demo
// ==========================================
export function ReactQueryDemo() {
  const { data, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["todo-post"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    staleTime: 5000
  });

  return (
    <div className="demo-box">
      <p>This component uses <code>@tanstack/react-query</code> to fetch/cache todo items:</p>
      
      <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "12px" }}>
        <button className="demo-btn" onClick={() => refetch()}>Force Refetch</button>
        <span style={{ fontSize: "12px" }}>
          {isFetching ? "⏳ Fetching/Syncing..." : "🟢 Idle (Using cached)"}
        </span>
      </div>

      <div className="sim-log-box" style={{ padding: "8px", backgroundColor: "rgba(0,0,0,0.05)", borderRadius: "4px", fontSize: "11px", fontFamily: "monospace", minHeight: "70px" }}>
        {isLoading && <div>Loading query (no cache)...</div>}
        {error && <div style={{ color: "#ef5350" }}>Error: {error.message}</div>}
        {data && (
          <div>
            <h5>Todo item #1:</h5>
            <div>Title: <strong>{data.title}</strong></div>
            <div>Completed status: {data.completed ? "✅ True" : "❌ False"}</div>
          </div>
        )}
      </div>
      <p className="demo-instruction">
        <strong>Caching Test:</strong> Switch to another topic in the sidebar and then immediately come back here. 
        You will notice that the todo item renders instantly without any loading state, because it loads from cache, while syncing is run in the background.
      </p>
    </div>
  );
}
