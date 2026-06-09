import React, { useState, useEffect, useRef, useCallback, useMemo, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { UserContext } from "../../context/UserContext";

// ==========================================
// 1. What is Hook Demo (Rules of Hooks)
// ==========================================
export function WhatIsHookDemo() {
  const [showErrorSimulation, setShowErrorSimulation] = useState(false);

  return (
    <div className="demo-box">
      <p>React hooks cannot be called inside if-statements. Let's see what happens if we violate this rule:</p>
      
      <button 
        className="demo-btn" 
        onClick={() => setShowErrorSimulation(!showErrorSimulation)}
        style={{ backgroundColor: showErrorSimulation ? "var(--accent-color)" : "" }}
      >
        {showErrorSimulation ? "Hide Error Simulation" : "Simulate Hook Rule Violation"}
      </button>

      {showErrorSimulation && (
        <div className="error-sim-screen" style={{ marginTop: "15px", backgroundColor: "#ffebee", border: "1px solid #ef5350", padding: "12px", borderRadius: "8px", color: "#c62828" }}>
          <h4>❌ React Developer Error: Rendered more hooks than during the previous render.</h4>
          <p style={{ fontSize: "12px", margin: "8px 0 0 0" }}>
            <strong>Why did this happen?</strong> React relies on the order in which Hooks are called. 
            If a Hook is placed inside an <code>if</code> statement, it might not run on every render. 
            This breaks the internal index tracker, and React crashes.
          </p>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. Types of Hooks Demo
// ==========================================
export function TypesOfHooksDemo() {
  return (
    <div className="demo-box">
      <p>Here is a map of the Hooks used in this React Learning Application:</p>
      <table className="demo-table" style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid var(--border-color)", textAlign: "left" }}>
            <th style={{ padding: "8px" }}>Hook Name</th>
            <th style={{ padding: "8px" }}>Usage in this App</th>
            <th style={{ padding: "8px" }}>File Path</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
            <td style={{ padding: "8px" }}><strong>useState</strong></td>
            <td style={{ padding: "8px" }}>Tracks active topic, search filter inputs, note creations</td>
            <td style={{ padding: "8px" }}><code>src/App.jsx</code>, <code>src/components/Header.jsx</code></td>
          </tr>
          <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
            <td style={{ padding: "8px" }}><strong>useEffect</strong></td>
            <td style={{ padding: "8px" }}>Fetches user profiles, hooks page titles, handles keyboard listeners</td>
            <td style={{ padding: "8px" }}><code>src/context/UserContext.jsx</code>, <code>src/components/TopicPage.jsx</code></td>
          </tr>
          <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
            <td style={{ padding: "8px" }}><strong>useRef</strong></td>
            <td style={{ padding: "8px" }}>Tracks header render counters, holds previous topic name, focuses search</td>
            <td style={{ padding: "8px" }}><code>src/components/Header.jsx</code>, <code>src/components/TopicPage.jsx</code></td>
          </tr>
          <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
            <td style={{ padding: "8px" }}><strong>useCallback</strong></td>
            <td style={{ padding: "8px" }}>Memoizes topic selection handler to prevent sidebar from re-rendering</td>
            <td style={{ padding: "8px" }}><code>src/App.jsx</code></td>
          </tr>
          <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
            <td style={{ padding: "8px" }}><strong>useMemo</strong></td>
            <td style={{ padding: "8px" }}>Caches the filtered topics array calculation based on search query</td>
            <td style={{ padding: "8px" }}><code>src/App.jsx</code></td>
          </tr>
          <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
            <td style={{ padding: "8px" }}><strong>useContext</strong></td>
            <td style={{ padding: "8px" }}>Provides global styling theme and mock logged-in user details</td>
            <td style={{ padding: "8px" }}><code>src/context/ThemeContext.jsx</code>, <code>src/context/UserContext.jsx</code></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// ==========================================
// 3. useState Demo
// ==========================================
export function UseStateDemo() {
  const [count, setCount] = useState(0);

  return (
    <div className="demo-box" style={{ textAlign: "center" }}>
      <h3 style={{ fontSize: "28px", margin: "10px 0" }}>{count}</h3>
      <div className="flex-row" style={{ justifyContent: "center" }}>
        <button className="demo-btn" onClick={() => setCount(count - 1)}>➖ Decrease</button>
        <button className="demo-btn" onClick={() => setCount(0)}>🔄 Reset</button>
        <button className="demo-btn" onClick={() => setCount(count + 1)}>➕ Increase</button>
      </div>
    </div>
  );
}

// ==========================================
// 4. useEffect Demo
// ==========================================
export function UseEffectDemo() {
  const [activeTab, setActiveTab] = useState("Home");
  const [titleLog, setTitleLog] = useState("");

  // Side Effect 1: interval timer
  const [timerOn, setTimerOn] = useState(false);
  const [seconds, setSeconds] = useState(0);

  // Side Effect 2: window resize listener
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [listeningResize, setListeningResize] = useState(false);

  // Side Effect 3: stale closure demo
  const [frozenCount, setFrozenCount] = useState(0);
  const [staleMsg, setStaleMsg] = useState("No check done yet.");
  const [liveCount, setLiveCount] = useState(0);

  // ---- Effect 1: Update browser tab title based on local tab state changes ----
  useEffect(() => {
    document.title = `React Concepts - Tab: ${activeTab}`;
    setTitleLog(`Updated browser title to: "React Concepts - Tab: ${activeTab}"`);
  }, [activeTab]); // Runs every time activeTab changes

  // ---- Effect 2: Start/stop an interval timer — shows cleanup ----
  useEffect(() => {
    // Only run the interval when timerOn is true
    if (!timerOn) return;

    // setInterval is a side effect — it lives OUTSIDE React
    const intervalId = setInterval(() => {
      // Use functional update so we always get the latest seconds value
      setSeconds(prev => prev + 1);
    }, 1000);

    // Cleanup: when timerOn becomes false or component unmounts,
    // we MUST clear the interval or it keeps running forever in the background!
    return () => {
      clearInterval(intervalId);
    };
  }, [timerOn]); // Re-run this effect only when timerOn changes

  // ---- Effect 3: Listen to window resize — shows event listener cleanup ----
  useEffect(() => {
    if (!listeningResize) return;

    // Define the handler function
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Attach to window
    window.addEventListener("resize", handleResize);

    // Cleanup: remove listener when we stop listening or unmount
    // Without this, every time this effect runs you add ANOTHER listener!
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [listeningResize]); // Re-run when listeningResize toggles

  // ---- Effect 4: Stale closure — missing dependency pitfall ----
  // This useEffect intentionally has an empty dependency array [],
  // so it captures frozenCount at its INITIAL value (0).
  // Even if frozenCount changes, the closure inside sees the old value.
  useEffect(() => {
    const intervalId = setInterval(() => {
      // frozenCount here is STALE — it will always be 0!
      // because we captured it at mount time and never re-subscribed.
      setStaleMsg(`Stale effect sees frozenCount = ${frozenCount} (always shows initial value!)`);
    }, 1500);

    return () => clearInterval(intervalId);
  }, []); // ← Missing frozenCount in deps — this is the bug!

  return (
    <div className="demo-box">

      {/* ---------- Demo A: Browser Tab Title ---------- */}
      <h5 style={{ marginBottom: "8px", borderBottom: "1px solid var(--border-color)", paddingBottom: "6px" }}>
        🅰 Side Effect: Updating the Browser Tab Title
      </h5>
      <p>Switching tabs below triggers a <code>useEffect</code> that updates your browser's page title:</p>
      
      <div className="flex-row" style={{ marginBottom: "12px" }}>
        {["Home", "Dashboard", "Settings"].map(tab => (
          <button
            key={tab}
            className="demo-btn"
            style={{ backgroundColor: activeTab === tab ? "var(--primary-color)" : "" }}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="sim-log-box" style={{ padding: "8px", backgroundColor: "rgba(0,0,0,0.05)", borderRadius: "4px", fontSize: "12px", fontFamily: "monospace", marginBottom: "20px" }}>
        ⚙️ Effect Log: {titleLog}
      </div>

      <p className="demo-instruction">
        <strong>Observe:</strong> Look at your actual browser tab at the top of the window — the title changes live!
      </p>

      {/* ---------- Demo B: Interval Timer with Cleanup ---------- */}
      <h5 style={{ margin: "20px 0 8px", borderBottom: "1px solid var(--border-color)", paddingBottom: "6px" }}>
        🅱 Side Effect: setInterval Timer — with Cleanup
      </h5>
      <p>
        Starting a timer is a side effect. If we forget to clean it up, it <strong>keeps ticking in the background</strong> even
        after the component is gone. The <code>return () =&gt; clearInterval(id)</code> inside <code>useEffect</code> is the cleanup.
      </p>

      <div className="flex-row" style={{ alignItems: "center", gap: "15px", marginBottom: "10px" }}>
        <button
          className="demo-btn"
          style={{ backgroundColor: timerOn ? "#ef5350" : "#4caf50" }}
          onClick={() => setTimerOn(prev => !prev)}
        >
          {timerOn ? "⏹ Stop Timer (runs cleanup)" : "▶ Start Timer (registers interval)"}
        </button>
        <button className="demo-btn" style={{ backgroundColor: "#9e9e9e" }} onClick={() => setSeconds(0)}>
          Reset
        </button>
        <div className="sim-log-box" style={{ padding: "8px 14px", fontFamily: "monospace", fontSize: "14px", fontWeight: "bold", minWidth: "90px", textAlign: "center" }}>
          ⏱ {seconds}s
        </div>
      </div>

      <div style={{ backgroundColor: "rgba(0,0,0,0.04)", borderRadius: "6px", padding: "10px", fontSize: "12px", fontFamily: "monospace", marginBottom: "20px" }}>
        <div>Status: <strong style={{ color: timerOn ? "#4caf50" : "#ef5350" }}>{timerOn ? "🟢 Interval RUNNING" : "🔴 Interval CLEARED (cleanup ran)"}</strong></div>
      </div>

      {/* ---------- Demo C: Window Resize Listener with Cleanup ---------- */}
      <h5 style={{ margin: "20px 0 8px", borderBottom: "1px solid var(--border-color)", paddingBottom: "6px" }}>
        🅲 Side Effect: Window Resize Listener — with Cleanup
      </h5>
      <p>
        Adding a global event listener (<code>window.addEventListener</code>) is another classic side effect.
        Without cleanup, every render adds <em>another</em> duplicate listener, leaking memory.
      </p>

      <div className="flex-row" style={{ alignItems: "center", gap: "15px", marginBottom: "10px" }}>
        <button
          className="demo-btn"
          style={{ backgroundColor: listeningResize ? "#ef5350" : "#2196f3" }}
          onClick={() => setListeningResize(prev => !prev)}
        >
          {listeningResize ? "🛑 Remove Listener (cleanup)" : "👂 Add Resize Listener"}
        </button>
        <div className="sim-log-box" style={{ padding: "8px 14px", fontFamily: "monospace", fontSize: "13px", minWidth: "160px", textAlign: "center" }}>
          Window Width: <strong>{windowWidth}px</strong>
        </div>
      </div>

      <div style={{ backgroundColor: "rgba(0,0,0,0.04)", borderRadius: "6px", padding: "10px", fontSize: "12px", fontFamily: "monospace", marginBottom: "20px" }}>
        Listener: <strong style={{ color: listeningResize ? "#4caf50" : "#ef5350" }}>
          {listeningResize ? "🟢 ACTIVE — resize your window!" : "🔴 REMOVED — resize does nothing"}
        </strong>
      </div>

      <p className="demo-instruction">
        <strong>Try it:</strong> Click "Add Resize Listener", then drag your browser window edge. Width updates live. Click "Remove Listener" — dragging no longer updates the number.
      </p>

      {/* ---------- Demo D: Stale Closure / Missing Dependency Bug ---------- */}
      <h5 style={{ margin: "20px 0 8px", borderBottom: "1px solid var(--border-color)", paddingBottom: "6px" }}>
        🅳 Side Effect Pitfall: Stale Closure (Missing Dependency)
      </h5>
      <p>
        When you write <code>useEffect(() =&gt; {`{ ... }`}, [])</code> but the function inside reads a state variable,
        that variable is <strong>frozen</strong> at the value it had when the component first mounted. This is called a <em>stale closure</em>.
      </p>

      <div className="flex-row" style={{ gap: "15px", alignItems: "flex-start", marginBottom: "12px" }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: "12px", margin: "0 0 8px" }}>
            <strong>Stale counter</strong> — increment it, but the effect won't see the new value:
          </p>
          <div className="flex-row" style={{ gap: "8px" }}>
            <button className="demo-btn" onClick={() => setFrozenCount(prev => prev + 1)}>
              Increment ({frozenCount})
            </button>
          </div>
          <div className="sim-log-box" style={{ marginTop: "10px", padding: "8px", fontSize: "12px", fontFamily: "monospace", backgroundColor: "#fff8e1" }}>
            {staleMsg}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <p style={{ fontSize: "12px", margin: "0 0 8px" }}>
            <strong>Live counter</strong> (correct — uses functional update, not captured variable):
          </p>
          <div className="flex-row" style={{ gap: "8px" }}>
            <button className="demo-btn" style={{ backgroundColor: "#4caf50" }} onClick={() => setLiveCount(prev => prev + 1)}>
              Increment ({liveCount})
            </button>
          </div>
          <div className="sim-log-box" style={{ marginTop: "10px", padding: "8px", fontSize: "12px", fontFamily: "monospace", backgroundColor: "#e8f5e9" }}>
            Live count is always current: <strong>{liveCount}</strong>
          </div>
        </div>
      </div>

      <p className="demo-instruction">
        <strong>The lesson:</strong> The yellow box always shows <code>frozenCount = 0</code> no matter how many times you click, because the effect closed over the initial value. Fix: add <code>frozenCount</code> to the dependency array, OR use a <code>useRef</code> to always read the latest value.
      </p>

    </div>
  );
}


// ==========================================
// 5. useRef Demo
// ==========================================
export function UseRefDemo() {
  // Ref focusing demo:
  const focusInput = () => {
    // We access the search input located inside the Header directly from here!
    // Since the search input ref is registered in our App or Header, we tell the document
    // to focus the search box. Alternatively, we focus a local test input:
    localInputRef.current.focus();
  };

  const localInputRef = useRef(null);

  return (
    <div className="demo-box">
      <p>1. Ref to access raw DOM element (Focus Input):</p>
      <div className="flex-row">
        <input 
          id="focus-demo-input"
          name="focus-demo-input"
          ref={localInputRef}
          type="text" 
          placeholder="I will be focused..." 
          className="demo-input"
          style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid var(--border-color)" }}
        />
        <button className="demo-btn" onClick={focusInput}>Focus Field</button>
      </div>
      
      <p className="demo-instruction" style={{ marginTop: "12px" }}>
        <strong>Also check:</strong> Look at the very bottom of this screen! There is a message showing the topic you were reading <em>before</em> clicking this page. That value was stored inside a <code>useRef</code> box so it didn't reset on render.
      </p>
    </div>
  );
}

// ==========================================
// 6. useCallback Demo
// ==========================================
// Memoized Child Component to prevent re-renders
const MemoizedChild = React.memo(function MemoizedChild({ onClick, buttonName }) {
  const renderCount = useRef(0);
  renderCount.current = renderCount.current + 1;

  return (
    <div style={{ padding: "12px", border: "1px dashed #4caf50", borderRadius: "8px", backgroundColor: "rgba(76, 175, 80, 0.05)", flex: 1 }}>
      <h5>🌿 Memoized Child Button Component</h5>
      <p>Times Rendered: <strong style={{ color: "#4caf50" }}>{renderCount.current}</strong></p>
      <button className="demo-btn" onClick={onClick}>{buttonName}</button>
    </div>
  );
});

export function UseCallbackDemo() {
  const [parentCount, setParentCount] = useState(0);
  const [useCallbackEnabled, setUseCallbackEnabled] = useState(true);

  // Memoized callback: returns the SAME function reference on every render
  const memoizedClick = useCallback(() => {
    console.log("Memoized click executed");
  }, []);

  // Normal callback: returns a NEW function reference on every render
  const normalClick = () => {
    console.log("Normal click executed");
  };

  return (
    <div className="demo-box">
      <div className="flex-row" style={{ gap: "20px" }}>
        <div style={{ flex: 1 }}>
          <h4>Parent Area</h4>
          <p>Changing this counter forces the Parent component to re-render:</p>
          <button className="demo-btn" onClick={() => setParentCount(parentCount + 1)}>
            Increment Parent Count: {parentCount}
          </button>
          
          <div style={{ marginTop: "12px" }}>
            <label htmlFor="enable-usecallback-cb" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }}>
              <input 
                id="enable-usecallback-cb"
                name="enable-usecallback-cb"
                type="checkbox" 
                checked={useCallbackEnabled}
                onChange={(e) => setUseCallbackEnabled(e.target.checked)}
              />
              Enable useCallback hook
            </label>
          </div>
        </div>

        {/* Passing the callback to the memoized child */}
        <MemoizedChild 
          onClick={useCallbackEnabled ? memoizedClick : normalClick} 
          buttonName={useCallbackEnabled ? "Callback Memoized" : "Callback Recalculated"}
        />
      </div>

      <p className="demo-instruction">
        <strong>What to do:</strong> Toggle the checkbox to disable <code>useCallback</code>, then click the parent increment button. 
        Notice that the child's render counter goes up! Now check the box, and click increment - the child renders stop increasing because the callback function reference is cached.
      </p>
    </div>
  );
}

// ==========================================
// 7. useMemo Demo
// ==========================================
export function UseMemoDemo() {
  const [searchVal, setSearchVal] = useState("");
  const [unrelatedCounter, setUnrelatedCounter] = useState(0);
  const calculationCountRef = useRef(0);

  // A sample array of items
  const items = ["Apple", "Apricot", "Banana", "Blueberry", "Cherry", "Cranberry", "Date", "Fig", "Grape", "Lemon"];

  // Filter list. We wrap this calculation in useMemo!
  const filteredFruits = useMemo(() => {
    // Increment calculation count tracker
    calculationCountRef.current = calculationCountRef.current + 1;
    
    // Filter list
    return items.filter(fruit => 
      fruit.toLowerCase().includes(searchVal.toLowerCase())
    );
  }, [searchVal]); // Only run this computation if searchVal changes!

  return (
    <div className="demo-box">
      <div className="flex-row" style={{ gap: "20px" }}>
        {/* Left Control Column */}
        <div style={{ flex: 1 }}>
          <div className="form-group">
            <label htmlFor="search-fruit-input">Search Fruit (Triggers calculation):</label>
            <input 
              id="search-fruit-input"
              name="search-fruit-input"
              type="text" 
              className="demo-input"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Type to filter list..."
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border-color)" }}
            />
          </div>

          <div className="form-group" style={{ marginTop: "15px" }}>
            <label>Unrelated State (Re-renders page, should NOT trigger calc):</label>
            <button className="demo-btn" onClick={() => setUnrelatedCounter(unrelatedCounter + 1)}>
              Click Count: {unrelatedCounter}
            </button>
          </div>
        </div>

        {/* Right Calculation Display */}
        <div style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.03)", padding: "12px", borderRadius: "8px" }}>
          <h4>Filtered Results</h4>
          <p style={{ fontSize: "12px" }}>Calculations Run: <strong style={{ color: "var(--accent-color)" }}>{calculationCountRef.current}</strong></p>
          <ul style={{ paddingLeft: "20px", fontSize: "13px" }}>
            {filteredFruits.map(fruit => <li key={fruit}>{fruit}</li>)}
            {filteredFruits.length === 0 && <li>No matches found</li>}
          </ul>
        </div>
      </div>
      
      <p className="demo-instruction">
        <strong>Observation:</strong> Changing the Search input increases both the calculations count and updates the list. 
        However, clicking the Unrelated Counter re-renders the component, but the calculations count does <strong>NOT</strong> go up because the search query remained unchanged!
      </p>
    </div>
  );
}

// ==========================================
// 8. useContext Demo
// ==========================================
export function UseContextDemo() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, loading } = useContext(UserContext);

  return (
    <div className="demo-box">
      <p>We read shared settings from ThemeContext and UserContext without receiving them through props:</p>
      
      <div className="flex-row" style={{ gap: "10px", margin: "10px 0" }}>
        {/* Theme display card */}
        <div style={{ 
          flex: 1, 
          padding: "12px", 
          borderRadius: "8px", 
          border: "1px solid var(--border-color)",
          backgroundColor: theme === "dark" ? "#1e1e1e" : "#f5f5f5",
          color: theme === "dark" ? "#ffffff" : "#000000"
        }}>
          <h5>🎨 Theme Context</h5>
          <p>Current Active Theme: <strong>{theme.toUpperCase()}</strong></p>
          <button className="demo-btn" onClick={toggleTheme}>Switch Theme</button>
        </div>

        {/* User display card */}
        <div style={{ 
          flex: 1, 
          padding: "12px", 
          borderRadius: "8px", 
          border: "1px solid var(--border-color)",
          backgroundColor: "rgba(0,0,0,0.02)"
        }}>
          <h5>👤 User Context</h5>
          {loading ? (
            <p>Loading user profile...</p>
          ) : user ? (
            <div>
              <p>Username: <strong>{user.username}</strong></p>
              <p>Full Name: <strong>{user.name}</strong></p>
              <p>City: {user.address.city}</p>
            </div>
          ) : (
            <p>No user context available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
