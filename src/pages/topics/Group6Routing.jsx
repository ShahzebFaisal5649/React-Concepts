import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate, useParams, useLocation } from "react-router-dom";

// ==========================================
// 1. React Router DOM Demo
// ==========================================
export function ReactRouterDemo() {
  const [mockRoute, setMockRoute] = useState("Home");

  return (
    <div className="demo-box">
      <p>This is a simulated browser bar inside our app page, displaying component swapping:</p>
      
      {/* Mock URL Bar */}
      <div className="mock-browser-bar" style={{ display: "flex", gap: "8px", alignItems: "center", backgroundColor: "rgba(0,0,0,0.06)", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", fontFamily: "monospace", border: "1px solid var(--border-color)", marginBottom: "12px" }}>
        <span className="dot" style={{ color: "#ef5350" }}>●</span>
        <span className="dot" style={{ color: "#ffca28" }}>●</span>
        <span className="dot" style={{ color: "#66bb6a" }}>●</span>
        <div className="mock-address-input" style={{ flex: 1, backgroundColor: "var(--main-bg)", padding: "4px 8px", borderRadius: "4px", border: "1px solid var(--border-color)" }}>
          http://localhost:5173/mock-site/<strong>{mockRoute.toLowerCase()}</strong>
        </div>
      </div>

      {/* Simulated Nav Links */}
      <div className="flex-row" style={{ gap: "6px", marginBottom: "15px" }}>
        <button className="demo-btn" style={{ padding: "6px 12px", fontSize: "12px" }} onClick={() => setMockRoute("Home")}>🏠 Go to Home</button>
        <button className="demo-btn" style={{ padding: "6px 12px", fontSize: "12px" }} onClick={() => setMockRoute("Settings")}>⚙️ Go to Settings</button>
        <button className="demo-btn" style={{ padding: "6px 12px", fontSize: "12px" }} onClick={() => setMockRoute("Profile")}>👤 Go to Profile</button>
      </div>

      {/* Simulated Outlet viewport */}
      <div className="mock-outlet-view" style={{ border: "2px dashed #6200ee", padding: "16px", borderRadius: "8px", backgroundColor: "rgba(98, 0, 238, 0.02)", minHeight: "80px", textAlign: "center" }}>
        <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block", marginBottom: "6px" }}>⚡ MOCK OUTLET VIEWPORT</span>
        {mockRoute === "Home" && <div>🏠 <h3>Welcome to Home Screen</h3><p>This is public content.</p></div>}
        {mockRoute === "Settings" && <div>⚙️ <h3>Configure Settings</h3><p>Manage system options.</p></div>}
        {mockRoute === "Profile" && <div>👤 <h3>User Account Details</h3><p>Profile description.</p></div>}
      </div>
    </div>
  );
}

// ==========================================
// 2. Routes (Public vs Private) Demo
// ==========================================
export function RoutesPublicPrivateDemo() {
  
  return (
    <div className="demo-box">
      <p>Check the security boundaries in this app:</p>
      
      <div className="flex-row" style={{ justifyContent: "center" }}>
        {/* Link to public topic */}
        <Link to="/topic/usestate-hook" className="demo-btn" style={{ textDecoration: "none", textAlign: "center" }}>
          🔓 Visit Public Route (useState page)
        </Link>
        
        {/* Link to protected notes */}
        <Link to="/notes" className="demo-btn" style={{ textDecoration: "none", textAlign: "center", backgroundColor: "var(--accent-color)" }}>
          🔒 Visit Protected Route (My Notes)
        </Link>
      </div>

      <p className="demo-instruction">
        <strong>Security Check:</strong> Click the <strong>Fake Login/Logout</strong> button in the top header. 
        When logged out, try clicking the <strong>Visit Protected Route</strong> button above. 
        The app intercepts your navigation and forces you onto the <code>/login</code> page. 
        If you log in, accessing `/notes` loads the study notebook successfully!
      </p>
    </div>
  );
}

// ==========================================
// 3. Link vs NavLink Demo
// ==========================================
export function LinkVsNavLinkDemo() {
  return (
    <div className="demo-box">
      <p>Here is a miniature navigation bar. Link doesn't apply styling automatically, but NavLink highlights itself when URL matches:</p>
      
      <div style={{ display: "flex", gap: "10px", padding: "10px", backgroundColor: "rgba(0,0,0,0.03)", borderRadius: "8px", justifyContent: "center" }}>
        {/* Link components: */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px", flex: 1, borderRight: "1px solid var(--border-color)", paddingRight: "10px" }}>
          <strong>Standard Link (Prop: to="/topic/link-vs-navlink")</strong>
          <Link to="/topic/link-vs-navlink" style={{ padding: "8px", backgroundColor: "var(--hover-bg)", borderRadius: "4px", textDecoration: "none", color: "var(--text-color)", textAlign: "center" }}>
            Link to this page
          </Link>
        </div>

        {/* NavLink components: */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px", flex: 1 }}>
          <strong>NavLink (Prop: to="/topic/link-vs-navlink")</strong>
          <NavLink 
            to="/topic/link-vs-navlink" 
            style={({ isActive }) => ({
              padding: "8px", 
              backgroundColor: isActive ? "var(--active-bg)" : "var(--hover-bg)", 
              color: isActive ? "var(--active-text)" : "var(--text-color)",
              fontWeight: isActive ? "bold" : "normal",
              borderRadius: "4px", 
              textDecoration: "none",
              textAlign: "center"
            })}
          >
            NavLink to this page
          </NavLink>
        </div>
      </div>
      <p className="demo-instruction">
        <strong>Observe:</strong> The NavLink button is highlighted because the current URL matches its target path. The standard Link looks generic.
      </p>
    </div>
  );
}

// ==========================================
// 4. React Router Hooks Demo
// ==========================================
export function ReactRouterHooksDemo() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  return (
    <div className="demo-box">
      <p>Below is the live data extracted directly from React Router hooks in this component:</p>
      
      <div style={{ fontFamily: "monospace", fontSize: "12.5px", backgroundColor: "rgba(0,0,0,0.04)", padding: "12px", borderRadius: "8px", marginBottom: "15px", border: "1px solid var(--border-color)" }}>
        <div>🗺️ <strong>useLocation() Pathname:</strong> "{location.pathname}"</div>
        <div style={{ marginTop: "6px" }}>🏷️ <strong>useParams() dynamic parameters:</strong> {JSON.stringify(params)}</div>
      </div>

      <div className="flex-row">
        <button className="demo-btn" onClick={() => navigate(-1)}>🔙 Go Back (navigate(-1))</button>
        <button className="demo-btn" onClick={() => navigate("/topic/usestate-hook")}>🚀 Go to useState page</button>
      </div>
    </div>
  );
}

// ==========================================
// 5. Private Route Auth Timing Demo
// ==========================================
export function PrivateRouteTimingDemo() {
  const [simState, setSimState] = useState("idle"); // idle | loading | loggedIn | loggedOut
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  const runSimulation = (shouldSucceed) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setSimState("loading");
    setElapsed(0);

    // Simulate 3-second auth check (like verifying a JWT token with a slow server)
    let ms = 0;
    timerRef.current = setInterval(() => {
      ms += 100;
      setElapsed(ms);
      if (ms >= 3000) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setSimState(shouldSucceed ? "loggedIn" : "loggedOut");
      }
    }, 100);
  };

  const reset = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setSimState("idle");
    setElapsed(0);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="demo-box">
      <p>
        If your <code>PrivateRoute</code> needs 3 seconds to verify auth (e.g., checking a token with a slow API), 
        what does the user see during those 3 seconds? <strong>Does the private page flash?</strong>
      </p>

      {/* Key answer box */}
      <div style={{ backgroundColor: "rgba(99, 102, 241, 0.08)", border: "1px solid #6366f1", borderRadius: "8px", padding: "12px", marginBottom: "16px", fontSize: "13px" }}>
        <strong>🔑 The Answer: No, the private page is NOT shown.</strong>
        <ul style={{ margin: "8px 0 0", paddingLeft: "18px" }}>
          <li>During auth check → show a <strong>loading/skeleton screen</strong> (not the private content)</li>
          <li>Auth succeeded → <strong>then</strong> render the private route content</li>
          <li>Auth failed → redirect to <code>/login</code> immediately</li>
          <li>The private component is never even <em>mounted</em> until auth resolves</li>
        </ul>
      </div>

      {/* Code pattern */}
      <pre style={{ backgroundColor: "rgba(0,0,0,0.04)", padding: "10px", borderRadius: "6px", fontSize: "11px", overflowX: "auto", marginBottom: "14px" }}>
{`function PrivateRoute({ isLoggedIn, isCheckingAuth }) {
  // Step 1: Still verifying — show skeleton, NOT the private page!
  if (isCheckingAuth) return <LoadingSkeleton />;

  // Step 2: Verified — show private page or redirect
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}`}
      </pre>

      {/* Interactive simulation */}
      <h5 style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "6px", marginBottom: "10px" }}>
        🎮 Simulate a 3-Second Auth Check:
      </h5>

      <div className="flex-row" style={{ gap: "8px", marginBottom: "14px" }}>
        <button
          className="demo-btn"
          onClick={() => runSimulation(true)}
          disabled={simState === "loading"}
          style={{ backgroundColor: "#4caf50" }}
        >
          ✅ Simulate Login Success (3s delay)
        </button>
        <button
          className="demo-btn"
          onClick={() => runSimulation(false)}
          disabled={simState === "loading"}
          style={{ backgroundColor: "#ef5350" }}
        >
          ❌ Simulate Login Failure (3s delay)
        </button>
        <button className="demo-btn" onClick={reset} style={{ backgroundColor: "#607d8b" }}>
          🔄 Reset
        </button>
      </div>

      {/* Simulation viewport */}
      <div style={{
        border: "2px solid var(--border-color)",
        borderRadius: "8px",
        padding: "16px",
        minHeight: "120px",
        position: "relative",
        backgroundColor: "rgba(0,0,0,0.02)"
      }}>
        <div style={{ fontSize: "10px", color: "var(--text-muted)", marginBottom: "8px", fontFamily: "monospace" }}>
          MOCK BROWSER VIEWPORT
        </div>

        {simState === "idle" && (
          <div style={{ textAlign: "center", color: "var(--text-muted)", paddingTop: "20px" }}>
            Click a button above to start the simulation
          </div>
        )}

        {simState === "loading" && (
          <div>
            <div style={{ fontSize: "12px", marginBottom: "10px", color: "#ff9800" }}>
              ⏳ Checking authentication... ({(elapsed / 1000).toFixed(1)}s / 3.0s)
            </div>
            {/* Skeleton loader — this is what user sees, NOT the private page! */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ height: "18px", borderRadius: "4px", backgroundColor: "rgba(0,0,0,0.1)", width: "60%", animation: "pulse 1.5s infinite" }}></div>
              <div style={{ height: "12px", borderRadius: "4px", backgroundColor: "rgba(0,0,0,0.07)", width: "85%", animation: "pulse 1.5s infinite" }}></div>
              <div style={{ height: "12px", borderRadius: "4px", backgroundColor: "rgba(0,0,0,0.07)", width: "70%", animation: "pulse 1.5s infinite" }}></div>
            </div>
            <div style={{ marginTop: "8px", fontSize: "11px", color: "var(--text-muted)" }}>
              🛡️ <em>PrivateRoute is showing a skeleton — private content is NOT mounted yet!</em>
            </div>
            {/* Progress bar */}
            <div style={{ marginTop: "10px", height: "4px", backgroundColor: "rgba(0,0,0,0.1)", borderRadius: "2px" }}>
              <div style={{
                height: "100%",
                width: `${(elapsed / 3000) * 100}%`,
                backgroundColor: "#ff9800",
                borderRadius: "2px",
                transition: "width 0.1s linear"
              }}></div>
            </div>
          </div>
        )}

        {simState === "loggedIn" && (
          <div style={{ backgroundColor: "#e8f5e9", border: "1px solid #4caf50", padding: "12px", borderRadius: "6px" }}>
            <strong style={{ color: "#2e7d32" }}>✅ Auth verified! Private content mounted:</strong>
            <div style={{ marginTop: "8px", fontFamily: "monospace", fontSize: "12px" }}>
              <div>🔐 Secret Dashboard — Welcome back!</div>
              <div>💰 Account balance: $1,234.56</div>
              <div>📊 Personal analytics data…</div>
            </div>
            <div style={{ marginTop: "6px", fontSize: "11px", color: "#2e7d32" }}>
              ✅ This only appeared AFTER auth was confirmed. The user never saw it during the 3s check!
            </div>
          </div>
        )}

        {simState === "loggedOut" && (
          <div style={{ backgroundColor: "#ffebee", border: "1px solid #ef5350", padding: "12px", borderRadius: "6px" }}>
            <strong style={{ color: "#c62828" }}>❌ Auth failed! Redirecting to /login...</strong>
            <div style={{ marginTop: "8px", fontSize: "12px" }}>
              The private page was <strong>never shown</strong>. React Router's Navigate component is triggered.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
