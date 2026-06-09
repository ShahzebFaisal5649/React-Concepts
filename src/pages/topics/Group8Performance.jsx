import React, { useState } from "react";

// ==========================================
// 1. Preload Demo
// ==========================================
export function PreloadDemo() {
  const [preloadActive, setPreloadActive] = useState(false);

  const handlePreload = () => {
    // Dynamically insert a preload tag for a sample image asset to show in Network tab
    const url = "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300"; // React Logo unplash image
    
    // Check if link already exists
    let existingLink = document.querySelector('link[href*="unsplash.com"]');
    if (!existingLink) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = url;
      document.head.appendChild(link);
      setPreloadActive(true);
      alert("Preload link injected into document <head>! Check your Network tab.");
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

      <p className="demo-instruction">
        <strong>Check:</strong> Open the Network tab. Click the button. You will see a request fire immediately for the image asset with a high priority status, downloaded before you actually render it!
      </p>
    </div>
  );
}

// ==========================================
// 2. Prefetch Demo
// ==========================================
export function PrefetchDemo() {
  const [prefetched, setPrefetched] = useState(false);
  const [hoverText, setHoverText] = useState("Hover over this zone...");

  const handleMouseEnter = () => {
    setHoverText("🔥 Cursor Hovered! Prefetching started...");
    
    // Dynamically insert a prefetch link for a future JSON payload
    const mockJsonUrl = "https://jsonplaceholder.typicode.com/posts/2?prefetch=active";
    
    let existingPrefetch = document.querySelector('link[href*="prefetch=active"]');
    if (!existingPrefetch) {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = mockJsonUrl;
      document.head.appendChild(link);
      setPrefetched(true);
    }
  };

  return (
    <div className="demo-box">
      <p>Hover your cursor over the box below to trigger a prefetch request for future data:</p>
      
      <div 
        className="prefetch-hover-zone"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setHoverText("Hover over this zone...")}
        style={{ 
          border: "2px dashed #ff9800", 
          padding: "30px", 
          borderRadius: "8px", 
          textAlign: "center",
          backgroundColor: prefetched ? "rgba(255, 152, 0, 0.05)" : "rgba(0,0,0,0.02)",
          cursor: "pointer",
          transition: "all 0.2s"
        }}
      >
        <strong>{hoverText}</strong>
      </div>

      <p className="demo-instruction">
        <strong>Check your Network tab:</strong> When you hover over the box, the browser immediately requests the JSON data for post 2 in the background using an Idle-priority prefetch cache fetch.
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
// 4. Comparison Panel Demo
// ==========================================
export function PreloadPrefetchPreflightDiffDemo() {
  return (
    <div className="demo-box">
      <p>Summary diagram of preloading, prefetching, and preflights:</p>
      <div className="flex-row" style={{ gap: "10px" }}>
        <div style={{ flex: 1, border: "1px solid var(--border-color)", padding: "10px", borderRadius: "6px", backgroundColor: "rgba(98, 0, 238, 0.02)" }}>
          <h5>🚀 Preload</h5>
          <ul style={{ paddingLeft: "15px", fontSize: "11.5px", margin: 0 }}>
            <li>Runs on: Current Page</li>
            <li>Priority: High</li>
            <li>Purpose: Load fonts, CSS immediately</li>
          </ul>
        </div>
        <div style={{ flex: 1, border: "1px solid var(--border-color)", padding: "10px", borderRadius: "6px", backgroundColor: "rgba(255, 152, 0, 0.02)" }}>
          <h5>💤 Prefetch</h5>
          <ul style={{ paddingLeft: "15px", fontSize: "11.5px", margin: 0 }}>
            <li>Runs on: Future Pages</li>
            <li>Priority: Low (Idle time)</li>
            <li>Purpose: Cache assets for next page click</li>
          </ul>
        </div>
        <div style={{ flex: 1, border: "1px solid var(--border-color)", padding: "10px", borderRadius: "6px", backgroundColor: "rgba(239, 83, 80, 0.02)" }}>
          <h5>🛡️ Preflight</h5>
          <ul style={{ paddingLeft: "15px", fontSize: "11.5px", margin: 0 }}>
            <li>Runs on: Cross-Origin calls</li>
            <li>Priority: Security Blocking</li>
            <li>Purpose: OPTIONS safety check</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
