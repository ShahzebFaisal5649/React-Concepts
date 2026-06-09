import React, { useState, Suspense } from "react";

// ==========================================
// 1. Lazy Loading and Suspense Demo
// ==========================================
// Mock heavy component loading delayed:
const MockHeavyChart = React.lazy(() => {
  return new Promise((resolve) => {
    // Delay load by 1.5 seconds to simulate downloading chunk bundle
    setTimeout(() => {
      resolve({
        default: () => (
          <div style={{ padding: "15px", backgroundColor: "#e8f5e9", border: "1px solid #81c784", borderRadius: "8px" }}>
            <h5>📈 Dynamic Analytical Data Chart</h5>
            <p>This component chunk was downloaded on-demand and loaded successfully!</p>
          </div>
        )
      });
    }, 1500);
  });
});

export function LazySuspenseDemo() {
  const [loadChart, setLoadChart] = useState(false);

  return (
    <div className="demo-box">
      <p>Click below to lazy load the heavy analytics component dynamically using React.lazy and Suspense:</p>
      
      <button className="demo-btn" onClick={() => setLoadChart(true)} disabled={loadChart}>
        {loadChart ? "Bundle Loaded" : "⚡ Load Dynamic Chart Bundle"}
      </button>

      <div style={{ marginTop: "12px" }}>
        {loadChart && (
          <Suspense fallback={<div className="loading-spinner">⏳ Downloading split JS chunk bundle...</div>}>
            <MockHeavyChart />
          </Suspense>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 2. Code Splitting Demo
// ==========================================
export function CodeSplittingDemo() {
  const [activeChunk, setActiveChunk] = useState("app");

  return (
    <div className="demo-box">
      <p>Modern bundlers divide codebases into smaller files loaded when accessing paths. Select a route to see requested chunks:</p>
      
      <div className="flex-row" style={{ gap: "10px", marginBottom: "15px" }}>
        <button className="demo-btn" style={{ backgroundColor: activeChunk === "app" ? "var(--primary-color)" : "" }} onClick={() => setActiveChunk("app")}>Path: / (Home)</button>
        <button className="demo-btn" style={{ backgroundColor: activeChunk === "notes" ? "var(--primary-color)" : "" }} onClick={() => setActiveChunk("notes")}>Path: /notes (Notes)</button>
        <button className="demo-btn" style={{ backgroundColor: activeChunk === "next" ? "var(--primary-color)" : "" }} onClick={() => setActiveChunk("next")}>Path: /nextjs (Next.js)</button>
      </div>

      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        {/* Visual code chunks container */}
        <div style={{ flex: 1 }}>
          <strong>Assets Directory:</strong>
          <div style={{ border: "1px solid var(--border-color)", padding: "10px", borderRadius: "6px", backgroundColor: "rgba(0,0,0,0.02)", fontFamily: "monospace", fontSize: "11.5px", display: "flex", flexDirection: "column", gap: "5px" }}>
            <div style={{ padding: "4px", backgroundColor: "#e0e0e0", color: "#333", borderRadius: "3px" }}>📦 main.js (120KB)</div>
            <div style={{ padding: "4px", backgroundColor: activeChunk === "notes" ? "#6200ee" : "#e0e0e0", color: activeChunk === "notes" ? "#fff" : "#333", borderRadius: "3px", transition: "all 0.3s" }}>📦 notes-chunk.js (25KB)</div>
            <div style={{ padding: "4px", backgroundColor: activeChunk === "next" ? "#6200ee" : "#e0e0e0", color: activeChunk === "next" ? "#fff" : "#333", borderRadius: "3px", transition: "all 0.3s" }}>📦 nextjs-chunk.js (45KB)</div>
          </div>
        </div>

        {/* Network Monitor */}
        <div style={{ flex: 1, padding: "10px", backgroundColor: "rgba(0,0,0,0.05)", borderRadius: "6px" }}>
          <h5>Network Stream Requests:</h5>
          <div style={{ fontFamily: "monospace", fontSize: "11px" }}>
            <div>GET /index.html (200 OK)</div>
            <div>GET /assets/main.js (200 OK)</div>
            {activeChunk === "notes" && <div style={{ color: "var(--accent-color)" }}>GET /assets/notes-chunk.js (200 OK) [lazy load]</div>}
            {activeChunk === "next" && <div style={{ color: "var(--accent-color)" }}>GET /assets/nextjs-chunk.js (200 OK) [lazy load]</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. Vite vs CRA Demo
// ==========================================
export function ViteVsCraDemo() {
  return (
    <div className="demo-box">
      <p>Performance comparison benchmarks between modern Vite and legacy Create React App (CRA):</p>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
        
        {/* Startup Speed */}
        <div>
          <strong>Server Startup Speed (seconds):</strong>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "4px" }}>
            <span style={{ width: "80px" }}>Vite:</span>
            <div style={{ flex: 1, height: "15px", backgroundColor: "#4caf50", width: "15%", borderRadius: "3px" }}></div>
            <span>0.3s 🚀</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "4px" }}>
            <span style={{ width: "80px" }}>CRA:</span>
            <div style={{ flex: 1, height: "15px", backgroundColor: "#ff9800", width: "80%", borderRadius: "3px" }}></div>
            <span>8.5s 🐢</span>
          </div>
        </div>

        {/* Hot Module Reload speed */}
        <div style={{ marginTop: "10px" }}>
          <strong>Hot Module Replacement (HMR) Time (ms):</strong>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "4px" }}>
            <span style={{ width: "80px" }}>Vite:</span>
            <div style={{ flex: 1, height: "15px", backgroundColor: "#4caf50", width: "5%", borderRadius: "3px" }}></div>
            <span>15ms</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "4px" }}>
            <span style={{ width: "80px" }}>CRA:</span>
            <div style={{ flex: 1, height: "15px", backgroundColor: "#ff9800", width: "65%", borderRadius: "3px" }}></div>
            <span>1200ms</span>
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 4. Environment Variables Demo
// ==========================================
export function EnvVariablesDemo() {
  const envMode = import.meta.env.MODE;
  const devStatus = import.meta.env.DEV;

  return (
    <div className="demo-box">
      <p>Vite extracts configuration from <code>.env</code> files. Below is the live variables metadata configuration loaded in your current browser runner:</p>
      
      <div style={{ fontFamily: "monospace", fontSize: "12px", backgroundColor: "rgba(0,0,0,0.04)", padding: "10px", borderRadius: "6px", border: "1px solid var(--border-color)" }}>
        <div>🌏 <strong>import.meta.env.MODE:</strong> "{envMode}"</div>
        <div style={{ marginTop: "6px" }}>🛠️ <strong>import.meta.env.DEV status:</strong> {devStatus ? "true (Development Mode)" : "false (Production Build)"}</div>
        <div style={{ marginTop: "6px" }}>🔑 <strong>import.meta.env.VITE_API_URL:</strong> {import.meta.env.VITE_API_URL || "undefined (Not configured)"}</div>
      </div>
    </div>
  );
}

// ==========================================
// 5. Folder Structure Demo
// ==========================================
export function FolderStructureDemo() {
  const [structType, setStructType] = useState("layer");

  return (
    <div className="demo-box">
      <p>Compare standard layer-based file organization with feature-based modular organization formats:</p>
      
      <div className="flex-row" style={{ gap: "10px", marginBottom: "12px" }}>
        <button className="demo-btn" style={{ padding: "6px 12px", fontSize: "12px" }} onClick={() => setStructType("layer")}>Layer-based structure</button>
        <button className="demo-btn" style={{ padding: "6px 12px", fontSize: "12px" }} onClick={() => setStructType("feature")}>Feature-based structure</button>
      </div>

      <pre style={{ padding: "12px", backgroundColor: "rgba(0,0,0,0.05)", borderRadius: "8px", fontSize: "11px", fontFamily: "monospace", margin: 0 }}>
        {structType === "layer" ? (
`src/
├── components/
│   ├── Button.jsx
│   └── UserCard.jsx
├── hooks/
│   └── useFetch.js
└── pages/
    ├── Dashboard.jsx
    └── Profile.jsx`
        ) : (
`src/
├── features/
│   ├── dashboard/
│   │   ├── Dashboard.jsx
│   │   └── components/
│   └── user/
│       ├── Profile.jsx
│       ├── UserCard.jsx
│       └── hooks/`
        )}
      </pre>
    </div>
  );
}
