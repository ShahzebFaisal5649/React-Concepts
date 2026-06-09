import React, { useState } from "react";

// ==========================================
// 1. Reconciliation Demo
// ==========================================
export function ReconciliationDemo() {
  const [count, setCount] = useState(0);

  return (
    <div className="demo-box">
      <p>This button changes a state variable local to the right content area:</p>
      <div className="flex-row">
        <button className="demo-btn" onClick={() => setCount(count + 1)}>
          Increment Content Counter (Count: {count})
        </button>
      </div>
      <p className="demo-instruction">
        <strong>What to do:</strong> Open your browser DevTools Console (F12) and clear it. Click the button above. 
        Notice that the counter updates. Now look at the console - there are <em>no</em> logs saying "Sidebar Component Rendered!". 
        React compares the Virtual DOM and only reconciles (updates) this content block in the real DOM. The sidebar is completely untouched.
      </p>
    </div>
  );
}

// ==========================================
// 2. Virtual DOM vs Real DOM Demo
// ==========================================
export function VirtualDomDemo() {
  return (
    <div className="demo-box">
      <p className="demo-instruction">
        <strong>Look at the header above:</strong> There is a badge titled <strong>"Header Renders"</strong> showing a counter.
      </p>
      <ol className="demo-list">
        <li>Click different links in the left sidebar. The URL changes, and this content switches.</li>
        <li>Observe the <strong>Header Renders</strong> counter. It does <strong>NOT</strong> increment when switching pages! This is because React's Virtual DOM checks that the Header element was not modified, so it avoids re-rendering it in the real DOM.</li>
        <li>Now, click the <strong>Theme Toggle</strong> button in the header. The counter <strong>will</strong> increment by 1 because the header state itself changed, requiring a re-render.</li>
      </ol>
    </div>
  );
}

// ==========================================
// 3. SPA Demo
// ==========================================
export function SpaDemo() {
  return (
    <div className="demo-box">
      <p>A Single Page Application doesn't reload the HTML document when clicking links.</p>
      <div className="network-log-sim">
        <div className="sim-header">🔄 Network Requests (Mock Monitor)</div>
        <div className="sim-body">
          <p className="success-log">✓ Initial Load: index.html downloaded (1 request)</p>
          <p className="success-log">✓ Initial Load: main.jsx + assets downloaded</p>
          <p className="warning-log">⚠ Clicking topics: 0 document requests made</p>
        </div>
      </div>
      <p className="demo-instruction">
        <strong>What to do:</strong> Press F12 to open DevTools, select the <strong>Network</strong> tab, and click the <strong>Doc</strong> filter. 
        Now, click different sidebar topics. You will see that the Network list remains completely blank. 
        No new HTML documents are fetched.
      </p>
    </div>
  );
}

// ==========================================
// 4. Why React Demo
// ==========================================
export function WhyReactDemo() {
  // A mock array of topic items to render dynamically
  const sampleItems = [
    { id: 1, title: "Reusable Component 1", color: "#e0f7fa" },
    { id: 2, title: "Reusable Component 2", color: "#e8f5e9" },
    { id: 3, title: "Reusable Component 3", color: "#fff3e0" }
  ];

  return (
    <div className="demo-box">
      <p>Instead of copying and pasting the HTML code for these three cards, we loop over an array of data and render a single card component three times:</p>
      
      <div className="flex-row">
        {sampleItems.map((item) => (
          <div 
            key={item.id} 
            className="demo-card" 
            style={{ backgroundColor: item.color, border: "1px solid rgba(0,0,0,0.1)", padding: "12px", borderRadius: "8px", flex: 1, textAlign: "center" }}
          >
            <h4>{item.title}</h4>
            <p>ID: {item.id}</p>
          </div>
        ))}
      </div>

      <pre className="code-block" style={{ marginTop: "16px" }}>
{`// We write this JSX pattern only once in our code:
items.map((item) => (
  <Card key={item.id} title={item.title} />
))`}
      </pre>
    </div>
  );
}
