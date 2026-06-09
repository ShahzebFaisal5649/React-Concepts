import React, { useState } from "react";

// ==========================================
// 1. Dashboard Layout Demo
// ==========================================
export function DashboardLayoutDemo() {
  const [activeSegment, setActiveSegment] = useState("Outlet");

  return (
    <div className="demo-box">
      <p>This interactive wireframe represents the structural layout of this application:</p>
      
      {/* Interactive Wireframe Container */}
      <div className="wireframe-container" style={{ display: "flex", flexDirection: "column", border: "2px solid var(--border-color)", borderRadius: "8px", overflow: "hidden", margin: "15px 0", height: "200px" }}>
        
        {/* Mock Header */}
        <div 
          className="mock-wireframe-header"
          onClick={() => setActiveSegment("Header")}
          style={{ 
            height: "40px", 
            backgroundColor: activeSegment === "Header" ? "rgba(98, 0, 238, 0.2)" : "rgba(0,0,0,0.05)",
            borderBottom: "1px solid var(--border-color)", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            cursor: "pointer",
            fontWeight: activeSegment === "Header" ? "bold" : "normal",
            transition: "all 0.2s"
          }}
        >
          Header Area (Fixed Top) {activeSegment === "Header" && "⚡"}
        </div>

        {/* Mock Body Container */}
        <div style={{ display: "flex", flex: 1 }}>
          
          {/* Mock Sidebar */}
          <div 
            className="mock-wireframe-sidebar"
            onClick={() => setActiveSegment("Sidebar")}
            style={{ 
              width: "80px", 
              backgroundColor: activeSegment === "Sidebar" ? "rgba(3, 218, 198, 0.2)" : "rgba(0,0,0,0.03)",
              borderRight: "1px solid var(--border-color)", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: activeSegment === "Sidebar" ? "bold" : "normal",
              transition: "all 0.2s"
            }}
          >
            Sidebar {activeSegment === "Sidebar" && "⚡"}
          </div>

          {/* Mock Main Content Area (Outlet) */}
          <div 
            className="mock-wireframe-outlet"
            onClick={() => setActiveSegment("Outlet")}
            style={{ 
              flex: 1, 
              backgroundColor: activeSegment === "Outlet" ? "rgba(255, 152, 0, 0.15)" : "var(--main-bg)",
              display: "flex", 
              flexDirection: "column",
              alignItems: "center", 
              justifyContent: "center",
              cursor: "pointer",
              fontWeight: activeSegment === "Outlet" ? "bold" : "normal",
              transition: "all 0.2s"
            }}
          >
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Main Content Area</span>
            <strong>&lt;Outlet /&gt; viewport {activeSegment === "Outlet" && "⚡"}</strong>
          </div>

        </div>
      </div>

      {/* Description output based on selected wireframe component */}
      <div className="segment-detail-card" style={{ padding: "12px", borderRadius: "6px", backgroundColor: "rgba(0,0,0,0.02)", borderLeft: "4px solid var(--primary-color)", fontSize: "13px" }}>
        {activeSegment === "Header" && (
          <p>🧑‍🏫 <strong>Header Panel:</strong> Stays mounted at the top. It contains our search bar and global settings. Because it never unmounts, your search queries and render counter states are preserved!</p>
        )}
        {activeSegment === "Sidebar" && (
          <p>🧑‍🏫 <strong>Sidebar Navigation:</strong> Stays fixed on the left. It renders our topics list. Because it is wrapped in <code>React.memo</code>, it does not re-render when switching topics, keeping search state smooth.</p>
        )}
        {activeSegment === "Outlet" && (
          <p>🧑‍🏫 <strong>Outlet Content Slot:</strong> This is the dynamic viewport. When you select a topic, only this segment unmounts and swaps components. The Header and Sidebar remain active.</p>
        )}
      </div>
    </div>
  );
}
