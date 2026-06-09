import React, { useState, useRef, forwardRef } from "react";
import ReactDOM from "react-dom";

// ==========================================
// 1. Error Boundary Mock & Demo
// ==========================================
// A simulation of an error boundary UI.
// (We mock it in standard functional state, since Class components are required for physical ones).
export function ErrorBoundaryDemo() {
  const [hasError, setHasError] = useState(false);

  const handleSimulateCrash = () => {
    setHasError(true);
  };

  return (
    <div className="demo-box">
      <p>Error boundaries intercept rendering failures in children to show fallbacks instead of crashing the site:</p>
      
      {hasError ? (
        <div style={{ padding: "16px", backgroundColor: "#ffebee", border: "1px solid #ef5350", borderRadius: "8px", color: "#c62828" }}>
          <h4>⚠️ Error Boundary Fallback Active</h4>
          <p style={{ fontSize: "12.5px", margin: "6px 0 0 0" }}>
            A child component crashed during render. The parent caught the error and displayed this safe error message page cleanly.
          </p>
          <button className="demo-btn" style={{ marginTop: "10px", backgroundColor: "#ef5350" }} onClick={() => setHasError(false)}>
            Reset boundary view
          </button>
        </div>
      ) : (
        <div style={{ padding: "12px", border: "1px dashed var(--border-color)", borderRadius: "8px", backgroundColor: "rgba(0,0,0,0.02)" }}>
          <h5>Isolated Child Component</h5>
          <p>This component operates normally until a JavaScript runtime exception is thrown.</p>
          <button className="demo-btn" style={{ backgroundColor: "#ef5350" }} onClick={handleSimulateCrash}>
            Trigger Render Crash!
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. Portals Demo
// ==========================================
function PortalModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  // Render modal outside standard component tree, under body tag
  return ReactDOM.createPortal(
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999
    }}>
      <div style={{
        backgroundColor: "var(--card-bg)",
        color: "var(--text-color)",
        padding: "20px",
        borderRadius: "12px",
        width: "350px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        textAlign: "center"
      }}>
        <h4>🌀 Portaled Modal Window</h4>
        <p style={{ fontSize: "13px", margin: "10px 0 20px 0" }}>
          Inspect this popup with DevTools. You will find that its HTML tags are mounted directly under <code>&lt;body&gt;</code>, escaping the dashboard panel container.
        </p>
        <button className="demo-btn" onClick={onClose}>Close Modal</button>
      </div>
    </div>,
    document.body
  );
}

export function PortalsDemo() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="demo-box" style={{ textAlign: "center" }}>
      <p>Portals render components outside their parent containers in the DOM structure (useful for modals):</p>
      
      <button className="demo-btn" onClick={() => setModalOpen(true)}>
        Open Portaled Modal
      </button>

      <PortalModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

// ==========================================
// 3. Forwarding Refs Demo
// ==========================================
// Child custom input component wrapping input in forwardRef
const ForwardedInput = forwardRef((props, ref) => {
  return (
    <input 
      id="fw-ref-input"
      name="fw-ref-input"
      ref={ref}
      type="text" 
      placeholder="Forwarded input focuses here..."
      className="demo-input"
      style={{ padding: "8px", borderRadius: "4px", border: "1px solid var(--border-color)", flex: 1 }}
    />
  );
});

export function ForwardRefsDemo() {
  const inputRef = useRef(null);

  const focusChildInput = () => {
    // Parent accesses native element of child directly!
    inputRef.current.focus();
  };

  return (
    <div className="demo-box">
      <p>Forwarding refs lets a parent reference raw HTML nodes inside nested child components:</p>
      
      <div className="flex-row">
        <ForwardedInput ref={inputRef} />
        <button className="demo-btn" onClick={focusChildInput}>Focus Child Input</button>
      </div>
    </div>
  );
}

// ==========================================
// 4. Server Side Rendering (SSR) Basics Demo
// ==========================================
export function SsrBasicsDemo() {
  const [simRunning, setSimRunning] = useState(false);
  
  const [csrPhase, setCsrPhase] = useState("idle");
  const [ssrPhase, setSsrPhase] = useState("idle");

  const runSimulation = () => {
    setSimRunning(true);
    setCsrPhase("start");
    setSsrPhase("start");

    // Client Side Rendering Steps:
    setTimeout(() => setCsrPhase("html-loaded"), 800); // 1. loads blank page
    setTimeout(() => setCsrPhase("js-loaded"), 1800); // 2. downloads big JS bundle
    setTimeout(() => setCsrPhase("rendered"), 2500); // 3. page is visible and interactive

    // Server Side Rendering Steps:
    setTimeout(() => setSsrPhase("html-loaded"), 800); // 1. loads page with layout already visible
    setTimeout(() => setSsrPhase("js-loaded"), 1800); // 2. downloads JS in background (user can read page!)
    setTimeout(() => setSsrPhase("rendered"), 2500); // 3. page hydrates and becomes interactive
    setTimeout(() => setSimRunning(false), 2600);
  };

  return (
    <div className="demo-box">
      <p>Simulate how clients download and render pages using Client Side vs Server Side rendering models:</p>
      
      <button className="demo-btn" onClick={runSimulation} disabled={simRunning} style={{ marginBottom: "15px" }}>
        {simRunning ? "Simulating..." : "🏁 Run Loading Speed Test"}
      </button>

      <div className="flex-row" style={{ gap: "20px" }}>
        
        {/* Client Side Card */}
        <div style={{ flex: 1, border: "1px solid var(--border-color)", padding: "12px", borderRadius: "8px", backgroundColor: "rgba(0,0,0,0.02)" }}>
          <h5>Client-Side (CSR / Vite default)</h5>
          
          <div style={{ margin: "10px 0", height: "80px", border: "1px solid #ccc", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: csrPhase === "rendered" ? "var(--main-bg)" : "#eee" }}>
            {csrPhase === "start" && "⏳ Requesting..."}
            {csrPhase === "html-loaded" && <span style={{ color: "#777" }}>⬜ Blank HTML (loading JS...)</span>}
            {csrPhase === "js-loaded" && <span style={{ color: "var(--primary-color)" }}>⚡ Rendering Page...</span>}
            {csrPhase === "rendered" && <span style={{ fontWeight: "bold", color: "green" }}>✅ Full visible and interactive!</span>}
            {csrPhase === "idle" && "Click run to test..."}
          </div>
          <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
            <strong>Visible content delay:</strong> CSR sends a blank shell first, which causes delays on slow connections.
          </div>
        </div>

        {/* Server Side Card */}
        <div style={{ flex: 1, border: "1px solid var(--border-color)", padding: "12px", borderRadius: "8px", backgroundColor: "rgba(0,0,0,0.02)" }}>
          <h5>Server-Side (SSR / Next.js)</h5>
          
          <div style={{ margin: "10px 0", height: "80px", border: "1px solid #ccc", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: (ssrPhase === "html-loaded" || ssrPhase === "js-loaded" || ssrPhase === "rendered") ? "var(--main-bg)" : "#eee" }}>
            {ssrPhase === "start" && "⏳ Requesting..."}
            {ssrPhase === "html-loaded" && <span style={{ color: "orange" }}>👀 Visible layout! (Static reading)</span>}
            {ssrPhase === "js-loaded" && <span style={{ color: "orange" }}>👀 Visible layout! (Hydrating...)</span>}
            {ssrPhase === "rendered" && <span style={{ fontWeight: "bold", color: "green" }}>✅ Full visible and interactive!</span>}
            {ssrPhase === "idle" && "Click run to test..."}
          </div>
          <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
            <strong>Visible content delay:</strong> SSR sends HTML pre-built by server, so text is readable immediately.
          </div>
        </div>

      </div>
    </div>
  );
}
