import React, { createContext, useState, useEffect, useMemo } from "react";

// 1. Create the User Context box.
export const UserContext = createContext();

// A fallback mock user — shown if the API is unreachable (e.g. offline, CORS blocked).
// This means the app always works even without a network connection.
const FALLBACK_USER = {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  address: { city: "Gwenborough" },
  company: { name: "Romaguera-Crona" }
};

// 2. Create the Provider component.
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // AbortController lets us cancel the fetch if the component unmounts before
    // the request finishes. Without this, React StrictMode's double-mount in
    // development throws "Can't perform state update on unmounted component".
    const controller = new AbortController();

    fetch("https://jsonplaceholder.typicode.com/users/1", {
      signal: controller.signal
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Server returned status: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        // "AbortError" just means the component unmounted cleanly — not a real error.
        // We ignore it so we don't log false alarms in the console.
        if (err.name === "AbortError") return;

        // For any other error (network down, CORS blocked, etc.) we fall back
        // to our mock user so the app still works and the UI shows data.
        console.warn(
          "UserContext: Could not reach jsonplaceholder API. Using fallback mock user.",
          err.message
        );
        setUser(FALLBACK_USER);
        setError(err.message);
        setLoading(false);
      });

    // Cleanup: cancel the in-flight request when the component unmounts.
    // This is especially important in React StrictMode which mounts components twice.
    return () => {
      controller.abort();
    };
  }, []); // Empty array = run only once on mount

  // useMemo: only create a new object when user, loading, or error actually change.
  // This prevents all useContext(UserContext) consumers from re-rendering on every
  // render of UserProvider — only a real data change triggers their update.
  const contextValue = useMemo(() => ({
    user: user,
    loading: loading,
    error: error
  }), [user, loading, error]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}
