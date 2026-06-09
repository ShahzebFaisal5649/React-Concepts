import React, { useRef, useEffect, useContext, useState, useCallback } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { UserContext } from "../context/UserContext";

// This header sits at the very top of our dashboard.
// It receives:
// - onSearchChange: a callback function to notify the parent (App) when search text changes
// - isLoggedIn: boolean state representing if the user is authenticated
// - onLoginToggle: function to log in / log out
// React.memo prevents Header from re-rendering when its parent re-renders
// but the props haven't actually changed. Since onSearchChange, isLoggedIn,
// and onLoginToggle are all stable references (via useState setters / useCallback),
// the Header will ONLY re-render when theme, user data, or those props truly change.
export const Header = React.memo(function Header({ onSearchChange, isLoggedIn, onLoginToggle }) {
  // 1. Get the theme and toggle function from our global ThemeContext
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  // 2. Get the mock user data from our global UserContext
  const { user, loading } = useContext(UserContext);

  // 3. Render Counter: We want to show how many times the header renders.
  // We use a ref to store the count. Since updating a ref does NOT trigger a re-render,
  // we can increment it during the render cycle without causing an infinite rendering loop!
  const renderCount = useRef(0);
  renderCount.current = renderCount.current + 1;

  // 4. Local state for the search input, loaded initially from sessionStorage
  const [searchVal, setSearchVal] = useState(() => {
    const saved = sessionStorage.getItem("search_query");
    return saved ? saved : "";
  });

  // 5. Ref to focus the input box when the "/" key is pressed
  const searchInputRef = useRef(null);

  // Run this effect when the component mounts to register a keypress listener
  useEffect(() => {
    const handleKeyDown = (event) => {
      // If the user presses "/" and they are not already typing in an input field
      if (event.key === "/" && document.activeElement !== searchInputRef.current) {
        event.preventDefault(); // Don't type the "/" into the box
        searchInputRef.current.focus(); // Focus the search box!
      }
    };

    // Add keydown listener to the whole document
    window.addEventListener("keydown", handleKeyDown);

    // CLEANUP: We return a function that runs when the component unmounts.
    // This is crucial to prevent memory leaks and duplicate event listeners!
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // Empty array = run only once on mount

  // Handle changes in the input field
  // useCallback keeps a stable reference so the <input> element doesn't get a new
  // onChange prop object on every render (minor optimization for controlled inputs).
  const handleInputChange = useCallback((event) => {
    const newVal = event.target.value;
    setSearchVal(newVal); // Update local input state
    sessionStorage.setItem("search_query", newVal); // Save to sessionStorage
    onSearchChange(newVal); // Tell the parent (App.jsx) to filter the sidebar
  }, [onSearchChange]);

  return (
    <header className="app-header">
      <div className="header-left">
        <span className="logo-icon">⚛️</span>
        <h1>React Concepts</h1>
        <div className="render-badge">
          Header Renders: <span>{renderCount.current}</span>
        </div>
      </div>

      <div className="header-center">
        <div className="search-wrapper">
          <input
            id="search-topics"
            name="search-topics"
            ref={searchInputRef}
            type="text"
            placeholder="Search topics... (Press '/' to focus)"
            value={searchVal}
            onChange={handleInputChange}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <div className="header-right">
        {/* User Profile display reading from UserContext */}
        {loading ? (
          <span className="user-loading">Loading user...</span>
        ) : user ? (
          <span className="user-name">👤 {user.name}</span>
        ) : (
          <span className="user-error">No User</span>
        )}

        {/* Theme Toggle Button */}
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>

        {/* Fake Auth Login Toggle */}
        <button 
          className={`login-btn ${isLoggedIn ? "logged-in" : "logged-out"}`}
          onClick={onLoginToggle}
        >
          {isLoggedIn ? "🔓 Logout" : "🔒 Fake Login"}
        </button>
      </div>
    </header>
  );
}); // end React.memo

export default Header;
