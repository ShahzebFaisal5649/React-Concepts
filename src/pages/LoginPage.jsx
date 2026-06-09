import React from "react";
import { useNavigate } from "react-router-dom";

// This page renders when an unauthenticated user tries to visit the private "/notes" route.
// It receives:
// - isLoggedIn: boolean state
// - onLoginToggle: function to toggle login status
export function LoginPage({ isLoggedIn, onLoginToggle }) {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // 1. Trigger the login function in our parent App.jsx
    onLoginToggle();
    // 2. Redirect the user directly to the "/notes" page!
    navigate("/notes");
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <span className="lock-icon">🔒</span>
        <h2>Access Restricted</h2>
        <p>
          The <strong>My Notes</strong> page is a protected private route. 
          You must log in to view or edit notes.
        </p>

        {isLoggedIn ? (
          <div className="already-logged">
            <p>You are already logged in!</p>
            <button className="go-notes-btn" onClick={() => navigate("/notes")}>
              Go to Notes
            </button>
          </div>
        ) : (
          <button className="primary-login-btn" onClick={handleLoginClick}>
            🔑 Click here to Mock Log In
          </button>
        )}
        
        <div className="login-notice">
          <strong>Student Notice:</strong> This login is a simulation. It changes a state variable in <code>App.jsx</code> and saves the preference to allow routing access.
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
