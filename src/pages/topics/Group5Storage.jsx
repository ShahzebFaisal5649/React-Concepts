import React, { useState, useEffect } from "react";
import { setCookie, getCookie, deleteCookie } from "../../utils/cookies";

// ==========================================
// 1. LocalStorage Demo
// ==========================================
export function LocalStorageDemo() {
  const [inputText, setInputText] = useState("");
  const [savedText, setSavedText] = useState("");

  useEffect(() => {
    // Load from storage on mount
    const saved = localStorage.getItem("demo_local_text");
    if (saved) {
      setSavedText(saved);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("demo_local_text", inputText);
    setSavedText(inputText);
    alert("Saved to localStorage!");
  };

  return (
    <div className="demo-box">
      <p>Type something and save it. Then reload the page (F5) - the saved text will still be here!</p>
      <div className="flex-row">
        <input 
          id="local-storage-input"
          name="local-storage-input"
          type="text" 
          className="demo-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type persistent text..."
          style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid var(--border-color)" }}
        />
        <button className="demo-btn" onClick={handleSave}>💾 Save</button>
      </div>
      <div style={{ marginTop: "12px", fontSize: "13px" }}>
        Current LocalStorage Value: <strong style={{ color: "#4caf50" }}>"{savedText || "empty"}"</strong>
      </div>
    </div>
  );
}

// ==========================================
// 2. SessionStorage Demo
// ==========================================
export function SessionStorageDemo() {
  const [inputText, setInputText] = useState("");
  const [savedText, setSavedText] = useState("");

  useEffect(() => {
    // Load from storage on mount
    const saved = sessionStorage.getItem("demo_session_text");
    if (saved) {
      setSavedText(saved);
    }
  }, []);

  const handleSave = () => {
    sessionStorage.setItem("demo_session_text", inputText);
    setSavedText(inputText);
    alert("Saved to sessionStorage!");
  };

  return (
    <div className="demo-box">
      <p>Save text in sessionStorage. Refresh page: it remains. Close tab and reopen: it is wiped out!</p>
      <div className="flex-row">
        <input 
          id="session-storage-input"
          name="session-storage-input"
          type="text" 
          className="demo-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type session text..."
          style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid var(--border-color)" }}
        />
        <button className="demo-btn" onClick={handleSave}>💾 Save</button>
      </div>
      <div style={{ marginTop: "12px", fontSize: "13px" }}>
        Current SessionStorage Value: <strong style={{ color: "#ff9800" }}>"{savedText || "empty"}"</strong>
      </div>
    </div>
  );
}

// ==========================================
// 3. Cookie Storage Demo
// ==========================================
export function CookieStorageDemo() {
  const [inputValue, setInputValue] = useState("");
  const [cookieValue, setCookieValue] = useState("");

  const refreshCookieValue = () => {
    const saved = getCookie("demo_cookie_val");
    setCookieValue(saved || "");
  };

  useEffect(() => {
    refreshCookieValue();
  }, []);

  const handleSaveCookie = () => {
    // Set cookie to expire in 1 day
    setCookie("demo_cookie_val", inputValue, 1);
    refreshCookieValue();
    alert("Cookie set!");
  };

  const handleClearCookie = () => {
    deleteCookie("demo_cookie_val");
    refreshCookieValue();
  };

  return (
    <div className="demo-box">
      <p>Save a cookie with 1-day expiration. Check browser DevTools Application cookies to verify:</p>
      <div className="flex-row">
        <input 
          id="cookie-storage-input"
          name="cookie-storage-input"
          type="text" 
          className="demo-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type cookie value..."
          style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid var(--border-color)" }}
        />
        <button className="demo-btn" onClick={handleSaveCookie}>💾 Set Cookie</button>
        <button className="demo-btn" style={{ backgroundColor: "#ef5350" }} onClick={handleClearCookie}>🗑️ Delete</button>
      </div>
      <div style={{ marginTop: "12px", fontSize: "13px" }}>
        Parsed Cookie Value (demo_cookie_val): <strong style={{ color: "#2196f3" }}>"{cookieValue || "empty"}"</strong>
      </div>
    </div>
  );
}

// ==========================================
// 4. Storage Differences Comparison Panel
// ==========================================
export function StorageDifferencesDemo() {
  const [localVal, setLocalVal] = useState("");
  const [sessionVal, setSessionVal] = useState("");
  const [cookieVal, setCookieVal] = useState("");

  const [storedLocal, setStoredLocal] = useState("");
  const [storedSession, setStoredSession] = useState("");
  const [storedCookie, setStoredCookie] = useState("");

  const loadAll = () => {
    setStoredLocal(localStorage.getItem("cmp_local") || "");
    setStoredSession(sessionStorage.getItem("cmp_session") || "");
    setStoredCookie(getCookie("cmp_cookie") || "");
  };

  useEffect(() => {
    loadAll();
  }, []);

  const saveLocal = () => {
    localStorage.setItem("cmp_local", localVal);
    loadAll();
  };
  const saveSession = () => {
    sessionStorage.setItem("cmp_session", sessionVal);
    loadAll();
  };
  const saveCookie = () => {
    setCookie("cmp_cookie", cookieVal, 1);
    loadAll();
  };

  return (
    <div className="demo-box">
      <p>Set values in each storage type below, then test page behaviors:</p>
      
      <div className="flex-row" style={{ gap: "12px" }}>
        
        {/* Local Storage Box */}
        <div style={{ flex: 1, border: "1px solid var(--border-color)", padding: "12px", borderRadius: "8px", backgroundColor: "rgba(76, 175, 80, 0.02)" }}>
          <h5 style={{ color: "#4caf50", margin: "0 0 8px 0" }}>LocalStorage</h5>
          <input 
            id="cmp-local-input"
            name="cmp-local-input"
            type="text" 
            placeholder="Type value..." 
            value={localVal}
            onChange={(e) => setLocalVal(e.target.value)}
            style={{ width: "100%", padding: "6px", marginBottom: "8px" }}
          />
          <button className="demo-btn" style={{ width: "100%", padding: "6px" }} onClick={saveLocal}>Save</button>
          <div style={{ marginTop: "10px", fontSize: "11px" }}>
            Saved: <strong>"{storedLocal || "empty"}"</strong>
          </div>
        </div>

        {/* Session Storage Box */}
        <div style={{ flex: 1, border: "1px solid var(--border-color)", padding: "12px", borderRadius: "8px", backgroundColor: "rgba(255, 152, 0, 0.02)" }}>
          <h5 style={{ color: "#ff9800", margin: "0 0 8px 0" }}>SessionStorage</h5>
          <input 
            id="cmp-session-input"
            name="cmp-session-input"
            type="text" 
            placeholder="Type value..." 
            value={sessionVal}
            onChange={(e) => setSessionVal(e.target.value)}
            style={{ width: "100%", padding: "6px", marginBottom: "8px" }}
          />
          <button className="demo-btn" style={{ width: "100%", padding: "6px", backgroundColor: "#ff9800" }} onClick={saveSession}>Save</button>
          <div style={{ marginTop: "10px", fontSize: "11px" }}>
            Saved: <strong>"{storedSession || "empty"}"</strong>
          </div>
        </div>

        {/* Cookie Box */}
        <div style={{ flex: 1, border: "1px solid var(--border-color)", padding: "12px", borderRadius: "8px", backgroundColor: "rgba(33, 150, 243, 0.02)" }}>
          <h5 style={{ color: "#2196f3", margin: "0 0 8px 0" }}>Cookie Storage</h5>
          <input 
            id="cmp-cookie-input"
            name="cmp-cookie-input"
            type="text" 
            placeholder="Type value..." 
            value={cookieVal}
            onChange={(e) => setCookieVal(e.target.value)}
            style={{ width: "100%", padding: "6px", marginBottom: "8px" }}
          />
          <button className="demo-btn" style={{ width: "100%", padding: "6px", backgroundColor: "#2196f3" }} onClick={saveCookie}>Save</button>
          <div style={{ marginTop: "10px", fontSize: "11px" }}>
            Saved: <strong>"{storedCookie || "empty"}"</strong>
          </div>
        </div>

      </div>

      <p className="demo-instruction" style={{ marginTop: "15px" }}>
        <strong>Test Lifespans:</strong> Fill all three boxes and click Save. 
        1. Hit Refresh (F5) - all three values remain. 
        2. Close this tab, open a new one, paste the URL - LocalStorage and Cookies remain, but SessionStorage is gone. 
        3. Clear cookies in DevTools - Cookie is gone, but LocalStorage remains.
      </p>
    </div>
  );
}
