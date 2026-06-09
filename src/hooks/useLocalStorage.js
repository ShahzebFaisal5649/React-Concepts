import { useState, useCallback } from "react";

// This custom hook acts like useState, but it also saves the data to the browser's localStorage
// so that the value survives page refreshes and tab closures.
export function useLocalStorage(key, initialValue) {
  // We use a function inside useState to set the initial value.
  // This function only runs ONCE when the component first loads, which is good for performance.
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Look up the item in browser's localStorage
      const item = window.localStorage.getItem(key);
      // If the item exists, parse the JSON string and return it.
      // If it doesn't exist, use the initialValue we passed in.
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log("Error reading localStorage key:", key, error);
      return initialValue;
    }
  });

  // This function replaces the standard state setter and syncs the new value to localStorage.
  const setValue = useCallback((value) => {
    try {
      // Allow value to be a function (same way standard useState does: setState(prev => prev + 1))
      setStoredValue((currentStoredValue) => {
        const valueToStore = value instanceof Function ? value(currentStoredValue) : value;
        // Save the value to the browser's localStorage (convert to string first!)
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        return valueToStore;
      });
    } catch (error) {
      console.log("Error writing to localStorage key:", key, error);
    }
  }, [key]);

  return [storedValue, setValue];
}
