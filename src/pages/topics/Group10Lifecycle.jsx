import React, { useState, useEffect, useRef, useCallback } from "react";

// ==========================================
// 1. Component Lifecycle Demo
// ==========================================
function ChildLifecycleComponent({ propVal, onLog }) {
  // Mount / Unmount hook:
  useEffect(() => {
    onLog("👶 Child Lifecycle Component: Mounted!");
    return () => {
      onLog("🪦 Child Lifecycle Component: Unmounted (Cleaned up)!");
    };
  }, []); // Empty array = mount/unmount only

  // Update hook:
  useEffect(() => {
    onLog(`🔄 Child Lifecycle Component: Prop updated to "${propVal}"`);
  }, [propVal]); // Runs when propVal updates

  return (
    <div style={{ padding: "12px", border: "1px dashed var(--border-color)", borderRadius: "8px", backgroundColor: "rgba(0,0,0,0.02)", marginTop: "10px" }}>
      <h5>Child Element Box</h5>
      <p>Prop Value received: <strong>"{propVal}"</strong></p>
    </div>
  );
}

export function ComponentLifecycleDemo() {
  const [showChild, setShowChild] = useState(true);
  const [propText, setPropText] = useState("Original State");
  const [logs, setLogs] = useState([]);

  // useCallback keeps addLog's reference stable so child useEffects don't re-fire every render
  const addLog = useCallback((msg) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 8)]);
  }, []); // empty array = function never changes identity

  return (
    <div className="demo-box">
      <p>Click buttons to mount/unmount the child or trigger updates, and observe the lifecycle events:</p>
      
      <div className="flex-row" style={{ gap: "10px", marginBottom: "15px" }}>
        <button className="demo-btn" onClick={() => setShowChild(!showChild)}>
          {showChild ? "🗑️ Unmount Child" : "👶 Mount Child"}
        </button>
        <button 
          className="demo-btn" 
          disabled={!showChild}
          onClick={() => setPropText(Date.now().toString())}
        >
          🔄 Send Prop Update
        </button>
        <button className="demo-btn" style={{ backgroundColor: "#ef5350" }} onClick={() => setLogs([])}>🗑️ Clear Logs</button>
      </div>

      <div style={{ display: "flex", gap: "15px" }}>
        <div style={{ flex: 1 }}>
          {showChild ? (
            <ChildLifecycleComponent propVal={propText} onLog={addLog} />
          ) : (
            <div style={{ padding: "20px", border: "1px dashed var(--border-color)", borderRadius: "8px", textAlign: "center", color: "var(--text-muted)", marginTop: "10px" }}>
              Component is not mounted.
            </div>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <h5>📋 Lifecycle Activity Logs:</h5>
          <div style={{ padding: "8px", backgroundColor: "rgba(0,0,0,0.05)", borderRadius: "6px", fontFamily: "monospace", fontSize: "11px", minHeight: "100px", maxHeight: "150px", overflowY: "auto" }}>
            {logs.length === 0 ? (
              <div style={{ color: "var(--text-muted)" }}>No logs recorded yet. Tweak controls to see events.</div>
            ) : (
              logs.map((log, i) => <div key={i}>{log}</div>)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. React.memo Demo
// ==========================================
const StandardChildComponent = ({ count }) => {
  const renderCount = useRef(0);
  renderCount.current += 1;
  return (
    <div style={{ padding: "12px", border: "1px dashed #ef5350", borderRadius: "8px", flex: 1, backgroundColor: "rgba(239, 83, 80, 0.02)" }}>
      <h5>Normal Child Component</h5>
      <p>Re-renders on every parent change!</p>
      <div style={{ fontSize: "14px", fontWeight: "bold" }}>Renders: {renderCount.current}</div>
    </div>
  );
};

const MemoizedChildComponent = React.memo(({ count }) => {
  const renderCount = useRef(0);
  renderCount.current += 1;
  return (
    <div style={{ padding: "12px", border: "1px dashed #66bb6a", borderRadius: "8px", flex: 1, backgroundColor: "rgba(102, 187, 106, 0.02)" }}>
      <h5>Memoized Child Component</h5>
      <p>Skips re-renders if props are identical!</p>
      <div style={{ fontSize: "14px", fontWeight: "bold" }}>Renders: {renderCount.current}</div>
    </div>
  );
});

export function ReactMemoDemo() {
  const [parentCount, setParentCount] = useState(0);
  const [childCount, setChildCount] = useState(0);

  return (
    <div className="demo-box">
      <p>Changing parent count causes the parent to re-render. See which child re-renders:</p>
      
      <div className="flex-row" style={{ gap: "10px", marginBottom: "15px" }}>
        <button className="demo-btn" onClick={() => setParentCount(parentCount + 1)}>
          1. Change Parent Count ({parentCount})
        </button>
        <button className="demo-btn" style={{ backgroundColor: "#66bb6a" }} onClick={() => setChildCount(childCount + 1)}>
          2. Change Child Prop Count ({childCount})
        </button>
      </div>

      <div className="flex-row" style={{ gap: "15px" }}>
        {/* Pass parentCount to Standard child (unrelated updates) */}
        <StandardChildComponent count={childCount} />

        {/* Pass childCount to Memoized child */}
        <MemoizedChildComponent count={childCount} />
      </div>
    </div>
  );
}
