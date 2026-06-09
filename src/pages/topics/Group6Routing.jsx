import React, { useState } from "react";
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
  const navigate = useNavigate();

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
