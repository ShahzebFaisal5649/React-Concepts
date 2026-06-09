import React, { useState } from "react";

// ==========================================
// 1. Why Next.js Demo
// ==========================================
export function WhyNextjsDemo() {
  return (
    <div className="demo-box">
      <p>Comparison grid outlining why developers choose Next.js frameworks over standalone React setups:</p>
      
      <table className="demo-table" style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid var(--border-color)", textAlign: "left" }}>
            <th style={{ padding: "8px" }}>Feature</th>
            <th style={{ padding: "8px" }}>Standalone React (Vite)</th>
            <th style={{ padding: "8px" }}>Next.js (React Framework)</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
            <td style={{ padding: "8px" }}><strong>Rendering Model</strong></td>
            <td style={{ padding: "8px" }}>Client-Side Rendering (CSR) only</td>
            <td style={{ padding: "8px", color: "green", fontWeight: "600" }}>Hybrid (SSR, SSG, CSR, ISR)</td>
          </tr>
          <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
            <td style={{ padding: "8px" }}><strong>Routing System</strong></td>
            <td style={{ padding: "8px" }}>Requires react-router-dom library</td>
            <td style={{ padding: "8px", color: "green", fontWeight: "600" }}>Automatic File-based routing</td>
          </tr>
          <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
            <td style={{ padding: "8px" }}><strong>Backend Integration</strong></td>
            <td style={{ padding: "8px" }}>Requires standalone Express/Node server</td>
            <td style={{ padding: "8px", color: "green", fontWeight: "600" }}>Serverless API Routes built-in</td>
          </tr>
          <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
            <td style={{ padding: "8px" }}><strong>SEO Optimization</strong></td>
            <td style={{ padding: "8px" }}>Poor (Crawlers read blank HTML template)</td>
            <td style={{ padding: "8px", color: "green", fontWeight: "600" }}>Excellent (HTML pre-rendered on server)</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// ==========================================
// 2. File-Based Routing Demo
// ==========================================
export function FileRoutingDemo() {
  const [selectedFolder, setSelectedFolder] = useState("home");

  return (
    <div className="demo-box">
      <p>Click folder pages below to see which URL path gets generated automatically by Next.js:</p>
      
      <div style={{ display: "flex", gap: "20px" }}>
        
        {/* Directory Structure */}
        <div style={{ flex: 1, borderRight: "1px solid var(--border-color)", paddingRight: "15px" }}>
          <h5>Next.js App Directory:</h5>
          <ul style={{ listStyle: "none", paddingLeft: "10px", fontSize: "13px", fontFamily: "monospace", cursor: "pointer" }}>
            <li onClick={() => setSelectedFolder("home")} style={{ padding: "4px", backgroundColor: selectedFolder === "home" ? "var(--hover-bg)" : "" }}>📁 app/page.js</li>
            <li onClick={() => setSelectedFolder("about")} style={{ padding: "4px", backgroundColor: selectedFolder === "about" ? "var(--hover-bg)" : "" }}>
              📂 app/about/
              <ul style={{ listStyle: "none", paddingLeft: "15px" }}>
                <li>📄 page.js</li>
              </ul>
            </li>
            <li onClick={() => setSelectedFolder("details")} style={{ padding: "4px", backgroundColor: selectedFolder === "details" ? "var(--hover-bg)" : "" }}>
              📂 app/products/[id]/
              <ul style={{ listStyle: "none", paddingLeft: "15px" }}>
                <li>📄 page.js</li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Live URL Output */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h5>Generated Route Path:</h5>
          <div style={{ padding: "12px", backgroundColor: "rgba(0,0,0,0.04)", borderRadius: "6px", fontFamily: "monospace", fontSize: "14px", border: "1px solid var(--border-color)" }}>
            {selectedFolder === "home" && "Route: / (Home Page)"}
            {selectedFolder === "about" && "Route: /about (About Page)"}
            {selectedFolder === "details" && "Route: /products/:id (Dynamic Product Details)"}
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 3. Server Components vs Client Components Demo
// ==========================================
export function ServerVsClientComponentsDemo() {
  const [isClient, setIsClient] = useState(false);

  return (
    <div className="demo-box">
      <p>Toggle below to see the differences in file behaviors between React Server Components and Client Components:</p>
      
      <div className="flex-row" style={{ gap: "10px", marginBottom: "15px" }}>
        <button className="demo-btn" style={{ backgroundColor: !isClient ? "var(--primary-color)" : "" }} onClick={() => setIsClient(false)}>Server Component (default)</button>
        <button className="demo-btn" style={{ backgroundColor: isClient ? "var(--primary-color)" : "" }} onClick={() => setIsClient(true)}>Client Component ('use client')</button>
      </div>

      <div style={{ padding: "12px", border: "1px solid var(--border-color)", borderRadius: "8px", backgroundColor: "rgba(0,0,0,0.02)" }}>
        {isClient ? (
          <div>
            <h5>💻 Client Component Mode</h5>
            <ul style={{ fontSize: "12.5px", paddingLeft: "20px" }}>
              <li>Declared using <code>"use client";</code> at the very top.</li>
              <li>Runs inside the user's browser runtime.</li>
              <li>Can use React hooks like <code>useState</code>, <code>useEffect</code>, and custom listeners.</li>
              <li>Adds to the client JavaScript bundle payload.</li>
            </ul>
          </div>
        ) : (
          <div>
            <h5>⚙️ Server Component Mode</h5>
            <ul style={{ fontSize: "12.5px", paddingLeft: "20px" }}>
              <li>The default component type in Next.js.</li>
              <li>Runs exclusively on the backend server.</li>
              <li>Can access databases, secrets, and system APIs directly.</li>
              <li>Sends **0 bytes** of JavaScript bundle code to the browser!</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 4. getServerSideProps vs getStaticProps Demo
// ==========================================
export function SsrSsgDataFetchingDemo() {
  const [dataAge, setDataAge] = useState(null);
  const [loadTime, setLoadTime] = useState(null);
  const [fetching, setFetching] = useState(false);

  const simulateFetch = (mode) => {
    setFetching(true);
    setDataAge(null);
    setLoadTime(null);

    const delay = mode === "ssg" ? 0 : 1200; // SSG is instant because cached, SSR requires request generation time
    setTimeout(() => {
      setDataAge(mode === "ssg" ? "Build time (10 hours ago)" : "Fresh: request time (just now!)");
      setLoadTime(mode === "ssg" ? "0ms (Cached CDN hit)" : "1200ms (Generated dynamically)");
      setFetching(false);
    }, delay);
  };

  return (
    <div className="demo-box">
      <p>Compare page load speeds between build-time static pages (SSG) and request-time server pages (SSR):</p>
      
      <div className="flex-row" style={{ gap: "10px", marginBottom: "15px" }}>
        <button className="demo-btn" onClick={() => simulateFetch("ssg")}>getStaticProps (SSG)</button>
        <button className="demo-btn" style={{ backgroundColor: "#2196f3" }} onClick={() => simulateFetch("ssr")}>getServerSideProps (SSR)</button>
      </div>

      <div className="sim-log-box" style={{ padding: "8px", backgroundColor: "rgba(0,0,0,0.05)", borderRadius: "4px", fontSize: "12px", fontFamily: "monospace", minHeight: "80px" }}>
        {fetching && <div>⏳ Requesting page contents from NextJS routing server...</div>}
        {!fetching && dataAge && (
          <div>
            <div>📅 <strong>Data Freshness:</strong> {dataAge}</div>
            <div style={{ marginTop: "6px" }}>⚡ <strong>Request Execution Speed:</strong> <span style={{ color: loadTime.includes("0ms") ? "green" : "orange", fontWeight: "bold" }}>{loadTime}</span></div>
          </div>
        )}
        {!fetching && !dataAge && <div style={{ color: "var(--text-muted)" }}>Click a data fetching method above to trigger simulation...</div>}
      </div>
    </div>
  );
}

// ==========================================
// 5. API Routes Demo
// ==========================================
export function ApiRoutesDemo() {
  const [reqName, setReqName] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTestApi = (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    setTimeout(() => {
      setResponse({
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: {
          message: `Hello ${reqName || "Developer"}! Greetings from Next.js serverless route /api/hello`,
          timestamp: new Date().toISOString()
        }
      });
      setLoading(false);
    }, 800);
  };

  return (
    <div className="demo-box">
      <p>Submit a payload to see how Next.js processes API endpoints locally:</p>
      
      <div className="flex-row" style={{ gap: "20px" }}>
        
        {/* API Form */}
        <div style={{ flex: 1 }}>
          <form onSubmit={handleTestApi}>
            <div className="form-group">
              <label htmlFor="api-name-input">Query Name Parameter:</label>
              <input 
                id="api-name-input"
                type="text"
                value={reqName}
                onChange={(e) => setReqName(e.target.value)}
                placeholder="Type your name..."
                className="demo-input"
                style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border-color)", marginBottom: "8px" }}
              />
            </div>
            <button type="submit" className="demo-btn" style={{ width: "100%" }}>Send request to /api/hello</button>
          </form>
        </div>

        {/* API Output */}
        <div style={{ flex: 1 }}>
          <h5>Serverless Response Console:</h5>
          <div className="sim-log-box" style={{ fontSize: "11px", backgroundColor: "#1e1e1e", color: "#66bb6a", minHeight: "95px" }}>
            {loading && <div style={{ color: "#aaa" }}>Awaiting server response...</div>}
            {response && (
              <div>
                <div>HTTP Status: {response.status} OK</div>
                <pre style={{ margin: "5px 0 0 0", color: "#e0e0e0" }}>{JSON.stringify(response.body, null, 2)}</pre>
              </div>
            )}
            {!loading && !response && <div style={{ color: "#aaa" }}>Send request to view response JSON payloads.</div>}
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 6. Image Optimization Demo
// ==========================================
export function ImageOptimizationDemo() {
  const [optimize, setOptimize] = useState(true);

  return (
    <div className="demo-box">
      <p>Compare standard HTML &lt;img&gt; tags vs Next.js &lt;Image&gt; components rendering options:</p>
      
      <div className="flex-row" style={{ gap: "10px", marginBottom: "15px" }}>
        <button className="demo-btn" style={{ backgroundColor: !optimize ? "var(--primary-color)" : "" }} onClick={() => setOptimize(false)}>Raw &lt;img&gt; tag</button>
        <button className="demo-btn" style={{ backgroundColor: optimize ? "var(--primary-color)" : "" }} onClick={() => setOptimize(true)}>Optimized &lt;Image&gt; component</button>
      </div>

      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        {/* Mock Image Box */}
        <div style={{ 
          width: "120px", 
          height: "120px", 
          border: "1px solid var(--border-color)",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "40px",
          backgroundColor: optimize ? "#e8f5e9" : "#ffebee"
        }}>
          {optimize ? "🖼️" : "📷"}
        </div>

        {/* Image Performance Metadata */}
        <div style={{ flex: 1, fontSize: "13px" }}>
          <div>📦 <strong>File Download Weight:</strong> {optimize ? "18 KB (Optimized WebP)" : "2.4 MB (Raw original PNG)"}</div>
          <div style={{ marginTop: "4px" }}>📐 <strong>Dimensions rendering:</strong> {optimize ? "Custom scaled to fit container" : "Original full-size dimensions loaded"}</div>
          <div style={{ marginTop: "4px" }}>⏳ <strong>Lazy loading status:</strong> {optimize ? "Yes (Deferred until scrolling)" : "No (Fetched immediately)"}</div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 7. Vercel Deployment Demo
// ==========================================
export function VercelDeploymentDemo() {
  const [pipelineLogs, setPipelineLogs] = useState([]);
  const [deploying, setDeploying] = useState(false);

  const startDeploy = () => {
    setDeploying(true);
    setPipelineLogs([]);
    const buildSteps = [
      "☁️ Vercel: Git commit pushed. Initializing deployment builder...",
      "🔍 Vercel: Cloning project repository from GitHub...",
      "📦 Vercel: Installing node modules dependencies...",
      "⚡ Vercel: Running build build-script: 'next build'...",
      "✓ Vercel: Serverless API routes compiled successfully.",
      "✓ Vercel: Static pages built and cached onto CDN edges.",
      "🚀 Vercel: Deployment published! Live URL: https://react-concepts.vercel.app ✅"
    ];

    buildSteps.forEach((step, index) => {
      setTimeout(() => {
        setPipelineLogs(prev => [...prev, step]);
        if (index === buildSteps.length - 1) {
          setDeploying(false);
        }
      }, (index + 1) * 500);
    });
  };

  return (
    <div className="demo-box">
      <p>Simulate deploying the Next.js application onto Vercel cloud servers:</p>
      
      <button className="demo-btn" onClick={startDeploy} disabled={deploying}>
        {deploying ? "Deploying..." : "☁️ Push to Deploy on Vercel"}
      </button>

      <div className="sim-log-box" style={{ marginTop: "12px", padding: "8px", backgroundColor: "#000", color: "#fff", borderRadius: "6px", fontFamily: "monospace", fontSize: "11px", minHeight: "150px" }}>
        <strong>Vercel Pipeline Console:</strong>
        <div style={{ marginTop: "6px" }}>
          {pipelineLogs.map((log, i) => {
            const isSuccess = log.includes("successfully") || log.includes("published");
            return (
              <div key={i} style={{ color: isSuccess ? "#66bb6a" : "#fff" }}>
                {log}
              </div>
            );
          })}
          {!deploying && pipelineLogs.length === 0 && <div style={{ color: "#888" }}>Awaiting deployment trigger...</div>}
        </div>
      </div>
    </div>
  );
}
