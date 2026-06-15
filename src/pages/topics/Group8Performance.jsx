import React, { useState, useRef, useEffect } from "react";

// ==========================================
// 1. Preload Demo
// ==========================================
export function PreloadDemo() {
  const [preloadActive, setPreloadActive] = useState(false);

  const handlePreload = () => {
    // Dynamically insert a preload tag for a sample image asset to show in Network tab
    const url = "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300";
    
    // Check if link already exists
    let existingLink = document.querySelector('link[data-demo="preload-demo"]');
    if (!existingLink) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = url;
      link.setAttribute("data-demo", "preload-demo");
      document.head.appendChild(link);
      setPreloadActive(true);
    } else {
      alert("Preload link was already injected!");
    }
  };

  return (
    <div className="demo-box">
      <p>Click the button below to inject a high-priority <code>preload</code> link tag into the document head:</p>
      
      <button 
        className="demo-btn" 
        onClick={handlePreload}
        disabled={preloadActive}
        style={{ backgroundColor: preloadActive ? "#4caf50" : "" }}
      >
        {preloadActive ? "✓ Preload Link Injected" : "⚡ Inject Preload Link"}
      </button>

      {preloadActive && (
        <div style={{ marginTop: "10px", backgroundColor: "#e8f5e9", border: "1px solid #4caf50", padding: "10px", borderRadius: "6px", fontSize: "12px" }}>
          <strong>✅ Preload injected!</strong> Open DevTools → Network tab → filter by "Img" and look for the unsplash.com request.
          It loaded at <strong>high priority</strong> before you even rendered the image tag!
          <br />
          <code style={{ fontSize: "11px" }}>{"<link rel=\"preload\" as=\"image\" href=\"unsplash.com/...\"/>"}</code>
        </div>
      )}

      <p className="demo-instruction">
        <strong>Check:</strong> Open the Network tab. Click the button. You will see a request fire immediately for the image asset with a high priority status, downloaded before you actually render it!
      </p>
    </div>
  );
}

// ==========================================
// 2. Prefetch Demo — works visually + triggers network requests
// ==========================================
export function PrefetchDemo() {
  const [prefetchLog, setPrefetchLog] = useState([]);
  const [hovered, setHovered] = useState(false);
  const prefetchedUrls = useRef(new Set());

  // The sidebar hover prefetch simulation:
  // In a real app, sidebar links trigger prefetch on mouseenter.
  // We replicate this with a hover zone that fires prefetch requests.
  const TOPICS_TO_PREFETCH = [
    { label: "Posts API (post 3)", url: "https://jsonplaceholder.typicode.com/posts/3" },
    { label: "Posts API (post 4)", url: "https://jsonplaceholder.typicode.com/posts/4" },
  ];

  const handleHoverZoneEnter = () => {
    setHovered(true);
    TOPICS_TO_PREFETCH.forEach(({ label, url }) => {
      if (!prefetchedUrls.current.has(url)) {
        prefetchedUrls.current.add(url);

        // Method 1: inject a <link rel="prefetch"> tag — low priority, browser decides when
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.href = url;
        link.setAttribute("data-demo", "prefetch-demo");
        document.head.appendChild(link);

        // Method 2: also manually fetch so we can confirm in the log + Network tab
        fetch(url, { cache: "force-cache" })
          .then(res => res.json())
          .then(data => {
            setPrefetchLog(prev => [
              `✅ Prefetched "${label}" → got "${data.title?.slice(0, 40)}..."`,
              ...prev
            ]);
          })
          .catch(() => {
            setPrefetchLog(prev => [`❌ Prefetch failed for: ${label}`, ...prev]);
          });

        setPrefetchLog(prev => [`🔄 Prefetching: ${label} (${url})`, ...prev]);
      }
    });
  };

  return (
    <div className="demo-box">
      <p>
        Open your Network tab. <strong>Gently hover your mouse</strong> over the zone below (simulating hovering sidebar topics). 
        You will see <em>low-priority</em> prefetch network requests trigger in the log.
      </p>
      
      <div 
        onMouseEnter={handleHoverZoneEnter}
        onMouseLeave={() => setHovered(false)}
        style={{ 
          border: `2px dashed ${hovered ? "#4caf50" : "#ff9800"}`, 
          padding: "30px", 
          borderRadius: "8px", 
          textAlign: "center",
          backgroundColor: hovered ? "rgba(76, 175, 80, 0.06)" : "rgba(255, 152, 0, 0.03)",
          cursor: "pointer",
          transition: "all 0.25s ease"
        }}
      >
        <strong style={{ fontSize: "14px" }}>
          {hovered ? "🔥 Hover detected! Prefetching sidebar topics in background..." : "👆 Hover here to simulate sidebar topic prefetch"}
        </strong>
        <br />
        <small style={{ color: "var(--text-muted)" }}>
          In our real sidebar, hovering over topic links would prefetch their JSON data
        </small>
      </div>

      {/* Prefetch Activity Log */}
      {prefetchLog.length > 0 && (
        <div style={{ 
          marginTop: "10px", 
          backgroundColor: "rgba(0,0,0,0.05)", 
          borderRadius: "6px", 
          padding: "8px 12px", 
          fontSize: "11px", 
          fontFamily: "monospace",
          maxHeight: "120px",
          overflowY: "auto"
        }}>
          <strong>📡 Prefetch Network Log:</strong>
          {prefetchLog.map((entry, i) => (
            <div key={i} style={{ marginTop: "4px", color: entry.startsWith("✅") ? "#2e7d32" : "inherit" }}>{entry}</div>
          ))}
        </div>
      )}

      <p className="demo-instruction">
        <strong>Check your Network tab:</strong> When you hover over the box, the browser requests the JSON data in the background 
        using an Idle-priority prefetch (the <code>&lt;link rel="prefetch"&gt;</code> tag is also injected into the DOM). 
        Look for the requests in the Network panel filtered by "Fetch/XHR".
      </p>
    </div>
  );
}

// ==========================================
// 3. Preflight CORS Request Demo
// ==========================================
export function PreflightRequestDemo() {
  const [logMessages, setLogMessages] = useState([]);

  const addLog = (msg) => {
    setLogMessages((prev) => [msg, ...prev]);
  };

  // Button A: Simple GET (No preflight)
  const handleSimpleRequest = () => {
    addLog("Sending Simple GET request to jsonplaceholder...");
    fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "GET"
    })
      .then((res) => res.json())
      .then(() => {
        addLog("✓ Simple GET Request completed. (Check Network tab: no OPTIONS check occurred)");
      })
      .catch((err) => addLog(`❌ Error: ${err.message}`));
  };

  // Button B: Complex request with custom header (triggers Preflight!)
  const handleComplexRequest = () => {
    addLog("Sending Complex DELETE request with custom 'X-Custom-Auth' header...");
    fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "DELETE",
      headers: {
        "X-Custom-Auth": "student-preflight-demo-value",
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        addLog(`✓ DELETE Request returned status: ${res.status}`);
      })
      .catch((err) => addLog(`❌ Error: ${err.message}`));
  };

  return (
    <div className="demo-box">
      <p>Compare how the browser handles requests. Open the Network tab and click these buttons:</p>
      
      <div className="flex-row">
        <button className="demo-btn" onClick={handleSimpleRequest}>
          🔓 Trigger Simple GET (No preflight)
        </button>
        
        <button className="demo-btn" style={{ backgroundColor: "#ef5350" }} onClick={handleComplexRequest}>
          🔒 Trigger Complex DELETE (CORS Preflight)
        </button>
      </div>

      <div className="sim-log-box" style={{ marginTop: "12px", height: "120px", overflowY: "auto", padding: "8px", backgroundColor: "rgba(0,0,0,0.05)", borderRadius: "4px", fontSize: "11px", fontFamily: "monospace" }}>
        <strong>Activity Logs:</strong>
        {logMessages.map((log, index) => <div key={index} style={{ margin: "4px 0" }}>{log}</div>)}
        {logMessages.length === 0 && <div style={{ color: "var(--text-muted)" }}>Waiting for button clicks...</div>}
      </div>

      <p className="demo-instruction">
        <strong>Look at Network logs:</strong> The Simple GET request runs instantly. The Complex DELETE request will list TWO logs: first, an <strong>OPTIONS</strong> request (the preflight check) returning status 200/204, and then the actual <strong>DELETE</strong> request.
      </p>
    </div>
  );
}

// ==========================================
// 4. Visual Timing Simulator + Comparison Panel
// ==========================================
export function PreloadPrefetchPreflightDiffDemo() {
  const [simRunning, setSimRunning] = useState(false);
  const [simStep, setSimStep] = useState(0);
  const [simLog, setSimLog] = useState([]);
  const timerRef = useRef(null);

  // Simulation timeline steps
  const SIM_STEPS = [
    { time: 0,    label: "🚀 Preload fires immediately (HIGH priority — blocks nothing)", color: "#6200ee", type: "preload" },
    { time: 300,  label: "📄 Preload: Resource downloaded to cache (ready before render)", color: "#6200ee", type: "preload" },
    { time: 800,  label: "🌐 Page becomes idle (main content rendered)", color: "#607d8b", type: "idle" },
    { time: 1300, label: "💤 Prefetch fires during idle time (LOW priority)", color: "#ff9800", type: "prefetch" },
    { time: 1800, label: "💤 Prefetch: Resource quietly downloaded to cache", color: "#ff9800", type: "prefetch" },
    { time: 2300, label: "🔒 User makes cross-origin request with custom header...", color: "#ef5350", type: "preflight" },
    { time: 2600, label: "🛡️ Preflight: Browser sends OPTIONS check FIRST (blocks request!)", color: "#ef5350", type: "preflight" },
    { time: 3100, label: "✓ OPTIONS approved → actual request sent → response arrives", color: "#ef5350", type: "preflight" },
    { time: 3500, label: "✅ Simulation complete! Total delay from preflight: ~800ms extra", color: "#4caf50", type: "done" },
  ];

  const startSimulation = () => {
    setSimRunning(true);
    setSimStep(0);
    setSimLog([]);
    clearAllTimers();

    SIM_STEPS.forEach((step, idx) => {
      const t = setTimeout(() => {
        setSimLog(prev => [
          ...prev,
          { ...step, idx }
        ]);
        setSimStep(idx + 1);
        if (idx === SIM_STEPS.length - 1) {
          setSimRunning(false);
        }
      }, step.time);
      timerRef.current = t; // store last timer (simplified)
    });
  };

  const clearAllTimers = () => {
    // Clear by resetting (simplified — in real apps, store all timer IDs in an array)
    for (let i = 1; i < 9999; i++) clearTimeout(i);
  };

  const resetSimulation = () => {
    clearAllTimers();
    setSimRunning(false);
    setSimStep(0);
    setSimLog([]);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  const typeColor = { preload: "#6200ee", prefetch: "#ff9800", preflight: "#ef5350", idle: "#607d8b", done: "#4caf50" };

  return (
    <div className="demo-box">
      {/* Summary cards */}
      <p>Summary diagram of preloading, prefetching, and preflights:</p>
      <div className="flex-row" style={{ gap: "10px", marginBottom: "16px" }}>
        <div style={{ flex: 1, border: "2px solid #6200ee", padding: "10px", borderRadius: "6px", backgroundColor: "rgba(98, 0, 238, 0.04)" }}>
          <h5 style={{ color: "#6200ee" }}>🚀 Preload</h5>
          <ul style={{ paddingLeft: "15px", fontSize: "11.5px", margin: 0 }}>
            <li>Runs on: Current Page</li>
            <li>Priority: <strong>High</strong></li>
            <li>Timing: Immediately on load</li>
            <li>Purpose: Fonts, critical CSS, hero images</li>
          </ul>
        </div>
        <div style={{ flex: 1, border: "2px solid #ff9800", padding: "10px", borderRadius: "6px", backgroundColor: "rgba(255, 152, 0, 0.04)" }}>
          <h5 style={{ color: "#ff9800" }}>💤 Prefetch</h5>
          <ul style={{ paddingLeft: "15px", fontSize: "11.5px", margin: 0 }}>
            <li>Runs on: Future Pages</li>
            <li>Priority: <strong>Low (Idle)</strong></li>
            <li>Timing: After page is idle</li>
            <li>Purpose: Cache assets for next navigation</li>
          </ul>
        </div>
        <div style={{ flex: 1, border: "2px solid #ef5350", padding: "10px", borderRadius: "6px", backgroundColor: "rgba(239, 83, 80, 0.04)" }}>
          <h5 style={{ color: "#ef5350" }}>🛡️ Preflight</h5>
          <ul style={{ paddingLeft: "15px", fontSize: "11.5px", margin: 0 }}>
            <li>Runs on: Cross-Origin calls</li>
            <li>Priority: <strong>Security Blocking</strong></li>
            <li>Timing: Before every CORS request</li>
            <li>Purpose: OPTIONS safety handshake</li>
          </ul>
        </div>
      </div>

      {/* Visual Timing Simulator */}
      <h5 style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "6px", marginBottom: "10px" }}>
        ⏱️ Visual Timing Simulator
      </h5>
      <p style={{ fontSize: "12px" }}>
        Click <strong>Start</strong> to watch the timeline. Compare when Preload fires vs when Prefetch fires during idle, and how Preflight adds a blocking delay before actual requests.
      </p>

      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
        <button 
          className="demo-btn" 
          onClick={startSimulation}
          disabled={simRunning}
          style={{ backgroundColor: simRunning ? "#9e9e9e" : "#4caf50" }}
        >
          {simRunning ? "⏳ Running..." : "▶ Start Simulation"}
        </button>
        <button className="demo-btn" onClick={resetSimulation} style={{ backgroundColor: "#607d8b" }}>
          🔄 Reset
        </button>
      </div>

      {/* Timeline visualization */}
      <div style={{
        backgroundColor: "rgba(0,0,0,0.04)",
        borderRadius: "8px",
        padding: "12px",
        minHeight: "180px",
        fontFamily: "monospace",
        fontSize: "12px",
        overflowY: "auto",
        maxHeight: "260px"
      }}>
        {simLog.length === 0 ? (
          <div style={{ color: "var(--text-muted)", textAlign: "center", paddingTop: "40px" }}>
            Press ▶ Start to run the timing simulation...
          </div>
        ) : (
          simLog.map((entry, i) => (
            <div key={i} style={{ 
              display: "flex", 
              alignItems: "flex-start", 
              gap: "10px", 
              marginBottom: "8px",
              animation: "fadeIn 0.3s ease"
            }}>
              <span style={{
                width: "70px",
                fontSize: "10px",
                color: "var(--text-muted)",
                flexShrink: 0,
                paddingTop: "2px"
              }}>
                +{entry.time}ms
              </span>
              <div style={{
                flex: 1,
                padding: "4px 8px",
                borderLeft: `3px solid ${typeColor[entry.type]}`,
                backgroundColor: `${typeColor[entry.type]}10`,
                borderRadius: "0 4px 4px 0"
              }}>
                {entry.label}
              </div>
            </div>
          ))
        )}
      </div>

      {simStep >= SIM_STEPS.length && (
        <div style={{ marginTop: "10px", padding: "10px", backgroundColor: "#e8f5e9", borderRadius: "6px", fontSize: "12px" }}>
          <strong>✅ Key Takeaway:</strong> Preload starts at 0ms. Prefetch waits until idle (~800ms). 
          Preflight adds ~600ms of blocking delay before your actual request is even sent!
        </div>
      )}
    </div>
  );
}
