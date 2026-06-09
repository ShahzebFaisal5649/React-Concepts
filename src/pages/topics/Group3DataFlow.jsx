import React, { useState } from "react";

// ==========================================
// 1. Parent-Child / Child-Parent Demo
// ==========================================
// Child component that accepts data (props) and a callback function prop:
function ChildInputBox({ currentText, onTextChange }) {
  return (
    <div style={{ backgroundColor: "rgba(0,0,0,0.03)", padding: "12px", borderRadius: "8px", border: "1px dashed var(--border-color)" }}>
      <h5>👧 Child Input Component</h5>
      <p>I don't store this text myself. I report changes up to my parent:</p>
      <input 
        id="child-message-input"
        name="child-message-input"
        type="text" 
        className="demo-input"
        value={currentText}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Type here to speak to Parent..."
        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border-color)" }}
      />
    </div>
  );
}

export function ParentChildDemo() {
  const [parentMessage, setParentMessage] = useState("Hello Child!");

  return (
    <div className="demo-box">
      <h4>👩 Parent Component Container</h4>
      <p>Current Parent State: <strong style={{ color: "var(--primary-color)" }}>"{parentMessage}"</strong></p>
      
      <div style={{ marginTop: "12px" }}>
        {/* We pass the text down as a prop, and the change handler callback as a prop */}
        <ChildInputBox 
          currentText={parentMessage} 
          onTextChange={(newText) => setParentMessage(newText)} 
        />
      </div>
    </div>
  );
}

// ==========================================
// 2. What is State Demo
// ==========================================
export function WhatIsStateDemo() {
  const [lightOn, setLightOn] = useState(false);

  return (
    <div className="demo-box" style={{ textAlign: "center" }}>
      <div 
        className="lightbulb-graphic" 
        style={{ 
          fontSize: "64px", 
          margin: "10px auto", 
          width: "120px", 
          height: "120px", 
          lineHeight: "120px",
          borderRadius: "50%",
          backgroundColor: lightOn ? "#fff59d" : "#e0e0e0",
          boxShadow: lightOn ? "0 0 25px #fff176" : "none",
          transition: "all 0.3s ease"
        }}
      >
        {lightOn ? "💡" : "🔌"}
      </div>
      
      <p>The switch state is: <strong>{lightOn ? "ON (true)" : "OFF (false)"}</strong></p>
      
      <button 
        className="demo-btn" 
        onClick={() => setLightOn(!lightOn)}
        style={{ margin: "10px auto" }}
      >
        Flip Switch State
      </button>
    </div>
  );
}

// ==========================================
// 3. What is Props Demo
// ==========================================
// Child Component that accepts a prop:
function TextDisplayCard({ sizeValue, textContent }) {
  return (
    <div style={{ 
      border: "1px solid var(--border-color)", 
      padding: "16px", 
      borderRadius: "8px", 
      marginTop: "16px",
      textAlign: "center"
    }}>
      <p style={{ fontSize: "11px", color: "var(--text-muted)", margin: "0 0 8px 0" }}>
        Child Component rendering text styled with size prop: <code>{sizeValue}px</code>
      </p>
      {/* Inline styles dynamically mapped to the prop! */}
      <h3 style={{ fontSize: `${sizeValue}px`, margin: 0, transition: "font-size 0.1s ease" }}>
        {textContent || "Props rule React!"}
      </h3>
    </div>
  );
}

export function WhatIsPropsDemo() {
  const [size, setSize] = useState(18);
  const [text, setText] = useState("Drag slider to change my size");

  return (
    <div className="demo-box">
      <div className="form-group">
        <label htmlFor="font-size-slider">Adjust Font Size (State: {size}px):</label>
        <input 
          id="font-size-slider"
          name="font-size-slider"
          type="range" 
          min="12" 
          max="48" 
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          style={{ width: "100%", margin: "8px 0" }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="prop-text-input">Edit Text Value State:</label>
        <input 
          id="prop-text-input"
          name="prop-text-input"
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          className="demo-input"
          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border-color)" }}
        />
      </div>

      {/* Passing states as props to the child component */}
      <TextDisplayCard sizeValue={size} textContent={text} />
    </div>
  );
}

// ==========================================
// 4. Lifting State Up Demo
// ==========================================
function SiblingSlider({ value, onChange }) {
  return (
    <div style={{ padding: "10px", border: "1px dashed var(--border-color)", borderRadius: "6px", flex: 1 }}>
      <h5>Slider Sibling A (Controls Value)</h5>
      <input 
        id="sibling-slider-control"
        name="sibling-slider-control"
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%" }}
      />
    </div>
  );
}

function SiblingGauge({ value }) {
  return (
    <div style={{ padding: "10px", border: "1px dashed var(--border-color)", borderRadius: "6px", flex: 1, textAlign: "center" }}>
      <h5>Gauge Sibling B (Displays Value)</h5>
      <div style={{ fontSize: "20px", fontWeight: "bold", color: "var(--primary-color)" }}>
        {value}%
      </div>
      <div style={{ height: "10px", width: "100%", backgroundColor: "rgba(0,0,0,0.1)", borderRadius: "5px", overflow: "hidden", marginTop: "8px" }}>
        <div style={{ height: "100%", width: `${value}%`, backgroundColor: "var(--primary-color)", transition: "width 0.1s ease" }}></div>
      </div>
    </div>
  );
}

export function LiftingStateUpDemo() {
  const [sharedProgress, setSharedProgress] = useState(50);

  return (
    <div className="demo-box">
      <p>Both child siblings below share progress state lifted to their parent container:</p>
      <div className="flex-row" style={{ gap: "15px" }}>
        <SiblingSlider value={sharedProgress} onChange={setSharedProgress} />
        <SiblingGauge value={sharedProgress} />
      </div>
    </div>
  );
}

// ==========================================
// 5. Controlled vs Uncontrolled Demo
// ==========================================
export function ControlledVsUncontrolledDemo() {
  // Controlled Input State:
  const [controlledVal, setControlledVal] = useState("");

  // Uncontrolled Input Ref:
  const uncontrolledInputRef = React.useRef(null);
  const [uncontrolledFeedback, setUncontrolledFeedback] = useState("");

  const handleUncontrolledSubmit = (e) => {
    e.preventDefault();
    setUncontrolledFeedback(uncontrolledInputRef.current.value);
  };

  return (
    <div className="demo-box">
      <div className="flex-row" style={{ gap: "20px" }}>
        
        {/* Controlled Form Column */}
        <div style={{ flex: 1, paddingRight: "15px", borderRight: "1px solid var(--border-color)" }}>
          <h5>Controlled Component (React State)</h5>
          <p>Value updates on every keystroke:</p>
          <input 
            id="controlled-demo-input"
            name="controlled-demo-input"
            type="text"
            value={controlledVal}
            onChange={(e) => setControlledVal(e.target.value)}
            className="demo-input"
            placeholder="Type here..."
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border-color)" }}
          />
          <div style={{ marginTop: "8px", fontSize: "12px", color: "var(--text-muted)" }}>
            Real-time state tracking: <strong>"{controlledVal}"</strong> ({controlledVal.length} chars)
          </div>
        </div>

        {/* Uncontrolled Form Column */}
        <div style={{ flex: 1 }}>
          <h5>Uncontrolled Component (DOM ref)</h5>
          <p>Value is only read when submitted:</p>
          <form onSubmit={handleUncontrolledSubmit}>
            <input 
              id="uncontrolled-demo-input"
              name="uncontrolled-demo-input"
              ref={uncontrolledInputRef}
              type="text"
              className="demo-input"
              placeholder="Type here..."
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border-color)", marginBottom: "8px" }}
            />
            <button type="submit" className="demo-btn" style={{ width: "100%" }}>Read value from Ref</button>
          </form>
          <div style={{ marginTop: "8px", fontSize: "12px", color: "var(--text-muted)" }}>
            Submitted Ref Value: <strong>"{uncontrolledFeedback}"</strong>
          </div>
        </div>

      </div>
    </div>
  );
}
