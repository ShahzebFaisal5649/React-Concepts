import React, { useState } from "react";

// ==========================================
// 1. CSS Modules Demo
// ==========================================
export function CssModulesDemo() {
  const [toggleModuleHash, setToggleModuleHash] = useState(true);

  return (
    <div className="demo-box">
      <p>CSS Modules auto-generate unique classes to prevent styling collisions:</p>
      
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        {/* Toggle Button */}
        <div style={{ flex: 1 }}>
          <button className="demo-btn" onClick={() => setToggleModuleHash(!toggleModuleHash)}>
            {toggleModuleHash ? "Inspect Compiled Selectors" : "View Source Selectors"}
          </button>
        </div>

        {/* Dynamic Card Display */}
        <div style={{ flex: 2, padding: "12px", border: "1px solid var(--border-color)", borderRadius: "8px", backgroundColor: "rgba(0,0,0,0.02)" }}>
          <div className={toggleModuleHash ? "Button_card__z8q9p" : "card"}>
            <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block" }}>
              Class Assigned: <code>{toggleModuleHash ? "styles.card (Button_card__z8q9p)" : ".card"}</code>
            </span>
            <h5 style={{ margin: "4px 0" }}>Local Scope CSS</h5>
            <button className={toggleModuleHash ? "Button_primaryBtn__32x9a" : "primaryBtn"}>
              Hashed Class Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. Tailwind CSS Demo
// ==========================================
export function TailwindCssDemo() {
  return (
    <div className="demo-box">
      <p>Tailwind uses pre-defined utilities to style components directly in class lists:</p>
      
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        
        {/* Styled Card */}
        <div style={{ 
          flex: 1,
          backgroundColor: "#ffffff", 
          color: "#1f2937",
          padding: "20px", 
          borderRadius: "16px", 
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          border: "1px solid #e5e7eb",
          maxWidth: "320px",
          margin: "0 auto"
        }}>
          <span style={{ fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", color: "#4f46e5" }}>Tailwind Style Card</span>
          <h4 style={{ fontSize: "18px", fontWeight: "bold", margin: "6px 0", color: "#111827" }}>Learning React 19</h4>
          <p style={{ fontSize: "13px", color: "#4b5563", margin: "0 0 15px 0" }}>Build lightning fast web pages using standard React components.</p>
          <button style={{ 
            backgroundColor: "#4f46e5", 
            color: "#ffffff", 
            padding: "8px 16px", 
            borderRadius: "8px", 
            fontWeight: "600", 
            fontSize: "13px",
            border: "none",
            cursor: "pointer"
          }}>
            Get Started
          </button>
        </div>

        {/* Utilities breakdown */}
        <div style={{ flex: 1 }}>
          <h5>Class List Breakdown (simulation):</h5>
          <table className="demo-table" style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border-color)", textAlign: "left" }}>
                <th style={{ padding: "4px" }}>Utility Token</th>
                <th style={{ padding: "4px" }}>CSS Property</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "4px" }}><code>bg-white</code></td>
                <td style={{ padding: "4px" }}>background-color: #ffffff;</td>
              </tr>
              <tr>
                <td style={{ padding: "4px" }}><code>p-6</code></td>
                <td style={{ padding: "4px" }}>padding: 1.5rem;</td>
              </tr>
              <tr>
                <td style={{ padding: "4px" }}><code>rounded-2xl</code></td>
                <td style={{ padding: "4px" }}>border-radius: 1rem;</td>
              </tr>
              <tr>
                <td style={{ padding: "4px" }}><code>shadow-lg</code></td>
                <td style={{ padding: "4px" }}>box-shadow: 0 10px 15px...;</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 3. Inline Styles Demo
// ==========================================
export function InlineStylesDemo() {
  const [padding, setPadding] = useState(15);
  const [bgAlpha, setBgAlpha] = useState(20);
  const [textColor, setTextColor] = useState("#6200ee");

  const computedStyle = {
    padding: `${padding}px`,
    backgroundColor: `rgba(98, 0, 238, ${bgAlpha / 100})`,
    color: textColor,
    border: "2px solid",
    borderRadius: "8px",
    textAlign: "center",
    transition: "all 0.1s ease"
  };

  return (
    <div className="demo-box">
      <p>Inline styles accept standard JS style objects that update properties dynamically:</p>
      
      <div className="flex-row" style={{ gap: "20px" }}>
        
        {/* Controls */}
        <div style={{ flex: 1 }}>
          <div className="form-group">
            <label htmlFor="style-padding-slider">Padding (Style: {padding}px):</label>
            <input 
              id="style-padding-slider"
              name="style-padding-slider"
              type="range"
              min="8"
              max="40"
              value={padding}
              onChange={(e) => setPadding(Number(e.target.value))}
              style={{ width: "100%" }}
            />
          </div>

          <div className="form-group" style={{ marginTop: "10px" }}>
            <label htmlFor="style-bg-slider">Background Opacity (Style: {bgAlpha}%):</label>
            <input 
              id="style-bg-slider"
              name="style-bg-slider"
              type="range"
              min="5"
              max="95"
              value={bgAlpha}
              onChange={(e) => setBgAlpha(Number(e.target.value))}
              style={{ width: "100%" }}
            />
          </div>

          <div className="form-group" style={{ marginTop: "10px" }}>
            <label htmlFor="style-color-select">Text Color Selection:</label>
            <select 
              id="style-color-select"
              name="style-color-select"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              style={{ width: "100%", padding: "6px", backgroundColor: "var(--main-bg)", color: "var(--text-color)", border: "1px solid var(--border-color)" }}
            >
              <option value="#6200ee">Purple (#6200ee)</option>
              <option value="#ff007f">Pink (#ff007f)</option>
              <option value="#4caf50">Green (#4caf50)</option>
            </select>
          </div>
        </div>

        {/* Display and Code */}
        <div style={{ flex: 1 }}>
          <div style={computedStyle}>
            <strong>Interactive Style Chameleon</strong>
          </div>
          
          <pre className="code-block" style={{ fontSize: "11px", marginTop: "10px" }}>
{`// Inline style code generated:
<div style={{
  padding: "${padding}px",
  backgroundColor: "rgba(98, 0, 238, ${bgAlpha / 100})",
  color: "${textColor}"
}}>`}
          </pre>
        </div>

      </div>
    </div>
  );
}
