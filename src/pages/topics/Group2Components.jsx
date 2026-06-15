import React, { useState } from "react";
import styled from "styled-components";

// ==========================================
// 1. React Components Demo
// ==========================================
// Helper Child Component:
function SimpleAlertButton({ alertText, buttonLabel }) {
  const triggerAlert = () => {
    alert(`Child Component says: ${alertText}`);
  };

  return (
    <button className="demo-btn" onClick={triggerAlert}>
      {buttonLabel}
    </button>
  );
}

export function ComponentsDemo() {
  return (
    <div className="demo-box">
      <p>Here, we are reusing the same <code>&lt;SimpleAlertButton /&gt;</code> component twice, but feeding it different properties (props):</p>
      <div className="flex-row">
        <SimpleAlertButton buttonLabel="First Instance" alertText="Greetings from Card A!" />
        <SimpleAlertButton buttonLabel="Second Instance" alertText="Howdy from Card B!" />
      </div>
    </div>
  );
}

// ==========================================
// 2. Higher Order Components Demo
// ==========================================
export function HocDemo() {
  return (
    <div className="demo-box">
      <div className="hoc-status-box">
        <span className="success-dot">🟢</span> 
        <strong>withLogger HOC Active</strong>
      </div>
      <p>This entire page view is wrapped in the <code>withLogger(TopicPage)</code> Higher Order Component.</p>
      <p className="demo-instruction">
        <strong>Check your console:</strong> You will see a log statement: 
        <code>[HOC Log] Topic content wrapped with withLogger HOC has mounted!</code>. 
        This message is injected automatically by the HOC function wrapping this page.
      </p>
    </div>
  );
}

// ==========================================
// 3. Stateless vs Stateful Demo
// ==========================================
// Stateless Component: Dumb, just renders props, has no useState
function StatelessBadge({ text, themeColor }) {
  return (
    <div className="stateless-badge" style={{ backgroundColor: themeColor, color: "#fff", padding: "6px 12px", borderRadius: "20px", display: "inline-block" }}>
      🏷️ Statless Prop: {text}
    </div>
  );
}

// Stateful Component: Smart, maintains local counter state
export function StatelessStatefulDemo() {
  const [clickCount, setClickCount] = useState(0);

  return (
    <div className="demo-box">
      <div className="flex-row" style={{ alignItems: "center", gap: "20px" }}>
        {/* Smart/Stateful Section */}
        <div style={{ flex: 1, borderRight: "1px solid var(--border-color)", paddingRight: "15px" }}>
          <h4>Stateful Component (Smart)</h4>
          <p>Controls its own counter state:</p>
          <button className="demo-btn" onClick={() => setClickCount(clickCount + 1)}>
            Increment: {clickCount}
          </button>
        </div>

        {/* Dumb/Stateless Section */}
        <div style={{ flex: 1 }}>
          <h4>Stateless Component (Dumb)</h4>
          <p>Receives value as props from parent:</p>
          <StatelessBadge text={`Clicks received: ${clickCount}`} themeColor={clickCount % 2 === 0 ? "#6200ee" : "#03dac6"} />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. Styled Components Demo
// ==========================================
// Styled component button definition:
const CustomStyledButton = styled.button`
  background: linear-gradient(135deg, #ff007f 0%, #7f00ff 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 0, 127, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 0, 127, 0.4);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export function StyledComponentsDemo() {
  return (
    <div className="demo-box">
      <p>Below is a button styled using the <code>styled-components</code> library:</p>
      
      <div className="flex-row" style={{ justifyContent: "center", margin: "15px 0" }}>
        <CustomStyledButton>Styled Component Button</CustomStyledButton>
      </div>

      <p className="demo-instruction">
        <strong>What to do:</strong> Right-click the button above and select <strong>Inspect</strong>. 
        Look at its class attributes. You will see auto-generated, hashed class names like <code>sc-bczRLJ bGugvY</code>. 
        This styling approach guarantees that CSS rules never collide across components.
      </p>
    </div>
  );
}

// ==========================================
// 5. JSX vs JS Syntax Demo
// ==========================================
export function JsxJsSyntaxDemo() {
  const [jsxCount, setJsxCount] = useState(0);
  const [jsCount, setJsCount] = useState(0);

  // Define a button using standard JS function call React.createElement()
  const rawJsButton = React.createElement(
    "button",
    {
      className: "demo-btn",
      style: { backgroundColor: "#ff5722", color: "#fff" },
      onClick: () => setJsCount(jsCount + 1)
    },
    `Raw JS Button Count: ${jsCount}`
  );

  return (
    <div className="demo-box">
      <p>We render two buttons that perform the exact same task. Button A is written in JSX, Button B is written in pure JS:</p>
      
      <div className="flex-row">
        {/* Button A written in JSX */}
        <button 
          className="demo-btn" 
          style={{ backgroundColor: "#4caf50", color: "#fff" }}
          onClick={() => setJsxCount(jsxCount + 1)}
        >
          JSX Button Count: {jsxCount}
        </button>

        {/* Button B rendered from React.createElement() variable */}
        {rawJsButton}
      </div>
    </div>
  );
}

// ==========================================
// 6. JSX vs JS Difference Demo
// ==========================================
export function JsxJsDifferenceDemo() {
  return (
    <div className="demo-box">
      <p>Vite's compiler translates your JSX code into standard JavaScript before sending it to the browser. Let's see the comparison:</p>
      <div className="flex-row" style={{ gap: "10px" }}>
        <div style={{ flex: 1 }}>
          <h5>What We Write (JSX)</h5>
          <pre className="code-block" style={{ fontSize: "11px" }}>
{`<div className="card">
  <h2>Welcome</h2>
  <button onClick={click}>Ok</button>
</div>`}
          </pre>
        </div>
        <div style={{ flex: 1 }}>
          <h5>What Browser Runs (Compiled JS)</h5>
          <pre className="code-block" style={{ fontSize: "11px", backgroundColor: "#1e1e1e" }}>
{`React.createElement("div", { className: "card" },
  React.createElement("h2", null, "Welcome"),
  React.createElement("button", { onClick: click }, "Ok")
);`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 7. Conditional Rendering Demo
// ==========================================
export function ConditionalRenderingDemo() {
  const [toggleState, setToggleState] = useState("a");

  return (
    <div className="demo-box">
      <p>Select which type of conditional rendering you want to see:</p>
      <div className="flex-row" style={{ marginBottom: "12px" }}>
        <button className="demo-btn" onClick={() => setToggleState("a")}>1. ternary operator</button>
        <button className="demo-btn" onClick={() => setToggleState("b")}>2. logical && operator</button>
        <button className="demo-btn" onClick={() => setToggleState("c")}>3. outside if/else</button>
      </div>

      <div style={{ padding: "12px", border: "1px dashed var(--border-color)", borderRadius: "8px", backgroundColor: "rgba(0,0,0,0.02)" }}>
        {toggleState === "a" && (
          <div>
            <h5>Pattern: ternary operator <code>(condition ? A : B)</code></h5>
            <p>Example: Is value true? {toggleState === "a" ? <span style={{ color: "green" }}>Yes (green)</span> : <span style={{ color: "red" }}>No</span>}</p>
          </div>
        )}
        
        {toggleState === "b" && (
          <div>
            <h5>Pattern: logical AND <code>(condition && A)</code></h5>
            <p>We only show the warning badge if the condition matches: {toggleState === "b" && <span style={{ padding: "4px 8px", backgroundColor: "orange", color: "white", borderRadius: "4px" }}>Active Alert!</span>}</p>
          </div>
        )}

        {toggleState === "c" && (
          <div>
            <h5>Pattern: outside if/else</h5>
            <p>If toggleState is "c", we return a custom block. We solved this with standard if statements outside JSX.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 8. Lists and Keys Demo
// ==========================================
export function ListsKeysDemo() {
  const [items, setItems] = useState([
    { id: "item-1", value: "React components" },
    { id: "item-2", value: "State management" },
    { id: "item-3", value: "Hooks references" }
  ]);
  const [inputText, setInputText] = useState("");
  const [useIndexAsKey, setUseIndexAsKey] = useState(false);
  const [warningLog, setWarningLog] = useState([]);

  const handleAddItem = () => {
    if (!inputText.trim()) return;
    const newItem = {
      id: `item-${Date.now()}`,
      value: inputText
    };
    setItems([...items, newItem]);
    setInputText("");
  };

  const handleRemoveItem = (id) => {
    if (useIndexAsKey) {
      const msg = `⚠️ [React Keys Warning] Removed item while using index as key. React re-maps all remaining items — potentially causing stale or swapped UI. Use stable unique IDs instead!`;
      console.warn(msg);
      setWarningLog(prev => [msg, ...prev.slice(0, 4)]);
    }
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="demo-box">
      <div className="form-group" style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <label htmlFor="list-item-input" style={{ display: "none" }}>New topic</label>
        <input 
          id="list-item-input"
          name="list-item-input"
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
          placeholder="Type new topic..."
          className="demo-input"
          style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid var(--border-color)" }}
        />
        <button className="demo-btn" onClick={handleAddItem}>Add Item</button>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label htmlFor="use-index-key-cb" style={{ fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}>
          <input 
            id="use-index-key-cb"
            name="use-index-key-cb"
            type="checkbox" 
            checked={useIndexAsKey}
            onChange={(e) => {
              setUseIndexAsKey(e.target.checked);
              if (e.target.checked) {
                const msg = "⚠️ [React Keys Warning] Switched to index-based keys. Adding or removing items will cause React to misidentify elements. Always use stable unique IDs as keys in production.";
                console.warn(msg);
                setWarningLog(prev => [msg, ...prev.slice(0, 4)]);
              } else {
                setWarningLog([]);
              }
            }}
          />
          Use array index as key instead of stable unique ID (warning mode)
        </label>
      </div>

      {/* ⚠️ Visual Warning Banner — visible in the page, not just the console */}
      {useIndexAsKey && (
        <div style={{
          backgroundColor: "#fff3cd",
          border: "2px solid #f0ad4e",
          borderRadius: "6px",
          padding: "10px 14px",
          marginBottom: "12px",
          fontSize: "12px"
        }}>
          <strong>⚠️ WARNING MODE ACTIVE: Using array index as key</strong>
          <p style={{ margin: "4px 0 0" }}>
            React cannot track which item was removed when using index-based keys. 
            Try clicking <strong>Remove</strong> on any item and watch the warning log below!
          </p>
        </div>
      )}

      <ul style={{ paddingLeft: "20px" }}>
        {items.map((item, index) => (
          <li key={useIndexAsKey ? index : item.id} style={{ marginBottom: "6px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span>📖 {item.value} <small style={{ color: "var(--text-muted)" }}>(key: {useIndexAsKey ? `index ${index}` : item.id})</small></span>
            <button className="demo-btn" style={{ padding: "2px 6px", backgroundColor: "#ef5350", fontSize: "11px" }} onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>

      {/* Warning Activity Log — shows in UI, not just console */}
      {warningLog.length > 0 && (
        <div style={{
          marginTop: "12px",
          backgroundColor: "#ffebee",
          border: "1px solid #ef5350",
          borderRadius: "6px",
          padding: "8px 12px",
          fontSize: "11px",
          fontFamily: "monospace"
        }}>
          <strong style={{ color: "#c62828" }}>⚠️ Console Warning Log (visible here too):</strong>
          {warningLog.map((w, i) => (
            <div key={i} style={{ marginTop: "4px", color: "#c62828" }}>{w}</div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 9. React Fragments Demo
// ==========================================
export function ReactFragmentsDemo() {
  const [useBrokenDiv, setUseBrokenDiv] = useState(false);

  return (
    <div className="demo-box">
      <p>Click below to toggle rendering table columns inside a <code>&lt;div&gt;</code> wrapper (breaks layout structures) vs a <code>&lt;React.Fragment&gt;</code> (keeps it clean):</p>
      
      <button className="demo-btn" onClick={() => setUseBrokenDiv(!useBrokenDiv)} style={{ marginBottom: "12px" }}>
        {useBrokenDiv ? "Use Fragments (Clean Layout)" : "Use Wrapper Div (Broken Layout)"}
      </button>

      <table style={{ width: "100%", borderCollapse: "collapse", border: "2px solid var(--border-color)" }}>
        <thead>
          <tr style={{ backgroundColor: "rgba(0,0,0,0.05)" }}>
            <th style={{ padding: "8px", border: "1px solid var(--border-color)" }}>Header 1</th>
            <th style={{ padding: "8px", border: "1px solid var(--border-color)" }}>Header 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {useBrokenDiv ? (
              // HTML invalid: div wrapping td cells inside tr row
              <td key="broken" colSpan="2" style={{ padding: 0, border: "none" }}>
                <div className="broken-wrapper-div" style={{ display: "flex", gap: "10px", width: "100%" }}>
                  <div style={{ flex: 1, padding: "8px", border: "1px solid var(--border-color)", backgroundColor: "#ffebee" }}>Broken Cell A (div wrapper)</div>
                  <div style={{ flex: 1, padding: "8px", border: "1px solid var(--border-color)", backgroundColor: "#ffebee" }}>Broken Cell B (div wrapper)</div>
                </div>
              </td>
            ) : (
              // HTML valid: Fragment grouping td cells without wrapper nodes
              <React.Fragment>
                <td style={{ padding: "8px", border: "1px solid var(--border-color)", backgroundColor: "#e8f5e9" }}>Valid Cell A</td>
                <td style={{ padding: "8px", border: "1px solid var(--border-color)", backgroundColor: "#e8f5e9" }}>Valid Cell B</td>
              </React.Fragment>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// ==========================================
// 10. JSX Runtime, Compilation & RAFCE Demo
// ==========================================
export function JsxRuntimeRafceDemo() {
  const [activeTab, setActiveTab] = useState("runtime");

  return (
    <div className="demo-box">
      {/* Tab switcher */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "16px", borderBottom: "2px solid var(--border-color)", paddingBottom: "10px" }}>
        {["runtime", "jsinjsx", "rafce"].map(tab => (
          <button
            key={tab}
            className="demo-btn"
            style={{
              backgroundColor: activeTab === tab ? "var(--primary-color)" : "transparent",
              color: activeTab === tab ? "#fff" : "var(--text-color)",
              border: "1px solid var(--border-color)",
              fontSize: "12px"
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "runtime" ? "⚙️ How JSX Compiles" : tab === "jsinjsx" ? "🔀 JSX in .js / JS in .jsx" : "⚡ RAFCE Snippet"}
          </button>
        ))}
      </div>

      {/* Tab 1: How JSX compiles */}
      {activeTab === "runtime" && (
        <div>
          <p style={{ fontSize: "13px" }}>
            JSX is <strong>not valid JavaScript</strong>. Browsers cannot run it directly. A build tool (Vite/Babel/ESBuild) 
            transforms every JSX tag into a <code>React.createElement()</code> call before sending it to the browser.
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: "12px" }}>📝 What you write (JSX):</strong>
              <pre style={{ backgroundColor: "rgba(0,0,0,0.04)", padding: "10px", borderRadius: "6px", fontSize: "11px", marginTop: "6px" }}>{`// In your .jsx file:
const MyBtn = () => (
  <button className="btn" onClick={click}>
    Hello!
  </button>
);`}</pre>
            </div>
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: "12px" }}>🖥️ What the browser runs (compiled JS):</strong>
              <pre style={{ backgroundColor: "#1e1e1e", color: "#d4d4d4", padding: "10px", borderRadius: "6px", fontSize: "11px", marginTop: "6px" }}>{`// After Vite's ESBuild compiles it:
const MyBtn = () => (
  React.createElement("button",
    { className: "btn", onClick: click },
    "Hello!"
  )
);`}</pre>
            </div>
          </div>
          <div style={{ marginTop: "10px", backgroundColor: "rgba(99,102,241,0.08)", border: "1px solid #6366f1", padding: "10px", borderRadius: "6px", fontSize: "12px" }}>
            <strong>🔑 Key facts:</strong>
            <ul style={{ margin: "6px 0 0", paddingLeft: "18px" }}>
              <li>JSX is a <em>syntax extension</em> — not a separate language, just sugar over <code>React.createElement()</code></li>
              <li>Every HTML-like tag in JSX compiles to a function call</li>
              <li>The <code>import React</code> used to be required before React 17 — now the runtime is auto-imported</li>
              <li>You can check compiled output in DevTools → Sources → your bundled file</li>
            </ul>
          </div>
        </div>
      )}

      {/* Tab 2: JSX in .js vs JS in .jsx */}
      {activeTab === "jsinjsx" && (
        <div>
          <p style={{ fontSize: "13px" }}>
            The <strong>file extension</strong> tells your build tool whether to parse JSX syntax or not.
            If you write JSX in a <code>.js</code> file, the parser treats it as plain JS and throws a syntax error!
          </p>
          <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
            <div style={{ flex: 1, backgroundColor: "#ffebee", border: "1px solid #ef5350", padding: "10px", borderRadius: "6px", fontSize: "12px" }}>
              <strong style={{ color: "#c62828" }}>❌ JSX in a .js file — BREAKS</strong>
              <pre style={{ fontSize: "11px", marginTop: "6px" }}>{`// myComponent.js ← plain JS extension!
// The parser does NOT apply JSX transformation.
function MyBtn() {
  return (
    <button>Click</button>  // ← SyntaxError!
    // Parser sees "<" and panics!
  );
}`}</pre>
              <p style={{ margin: "6px 0 0", color: "#c62828" }}>
                Error: <code>Unexpected token &lt;</code>
              </p>
            </div>
            <div style={{ flex: 1, backgroundColor: "#e8f5e9", border: "1px solid #4caf50", padding: "10px", borderRadius: "6px", fontSize: "12px" }}>
              <strong style={{ color: "#2e7d32" }}>✅ JSX in a .jsx file — WORKS</strong>
              <pre style={{ fontSize: "11px", marginTop: "6px" }}>{`// myComponent.jsx ← JSX extension!
// Vite/Babel applies JSX transform automatically.
function MyBtn() {
  return (
    <button>Click</button>  // ← OK!
    // Compiles to React.createElement(...)
  );
}`}</pre>
            </div>
          </div>
          <div style={{ backgroundColor: "rgba(255,152,0,0.08)", border: "1px solid #ff9800", padding: "10px", borderRadius: "6px", fontSize: "12px" }}>
            <strong>🔧 How to run JSX in a plain .js file (two options):</strong>
            <ol style={{ margin: "6px 0 0", paddingLeft: "18px" }}>
              <li><strong>Configure Vite:</strong> Add <code>{"{ extensions: ['.js', '.jsx'] }"}</code> to <code>vite.config.js</code> to tell Vite to parse JSX in .js files too.</li>
              <li><strong>Use React.createElement directly:</strong> Skip JSX entirely. Write <code>React.createElement('button', null, 'Click')</code> in plain .js — it runs anywhere!</li>
            </ol>
          </div>
        </div>
      )}

      {/* Tab 3: RAFCE */}
      {activeTab === "rafce" && (
        <div>
          <p style={{ fontSize: "13px" }}>
            <strong>RAFCE</strong> stands for <strong>React Arrow Function Component Export</strong>. 
            It is a <em>VS Code snippet</em> (from the ES7+ React Snippets extension) that auto-generates a full component boilerplate when you type <code>rafce</code> and press Tab.
          </p>
          <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: "12px" }}>⌨️ You type:</strong>
              <pre style={{ backgroundColor: "rgba(0,0,0,0.04)", padding: "10px", borderRadius: "6px", fontSize: "14px", marginTop: "6px", textAlign: "center" }}>
                <strong>rafce</strong> + Tab
              </pre>
            </div>
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: "12px" }}>✨ VS Code expands to:</strong>
              <pre style={{ backgroundColor: "#1e1e1e", color: "#d4d4d4", padding: "10px", borderRadius: "6px", fontSize: "11px", marginTop: "6px" }}>{`import React from 'react'

const MyComponent = () => {
  return (
    <div>MyComponent</div>
  )
}

export default MyComponent`}</pre>
            </div>
          </div>
          <div style={{ backgroundColor: "rgba(99,102,241,0.08)", border: "1px solid #6366f1", padding: "10px", borderRadius: "6px", fontSize: "12px" }}>
            <strong>📋 Common VS Code React Snippets:</strong>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "6px", fontSize: "11px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <th style={{ padding: "4px 8px", textAlign: "left" }}>Snippet</th>
                  <th style={{ padding: "4px 8px", textAlign: "left" }}>Meaning</th>
                  <th style={{ padding: "4px 8px", textAlign: "left" }}>Output</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["rafce", "React Arrow Function Component Export", "Arrow fn + default export"],
                  ["rfce", "React Function Component Export", "Named fn + default export"],
                  ["rfc", "React Function Component", "Named fn only"],
                  ["rafc", "React Arrow Function Component", "Arrow fn only"],
                  ["useState", "useState import snippet", "useState with getter/setter"],
                  ["useEffect", "useEffect snippet", "useEffect with cleanup stub"],
                ].map(([snip, meaning, output]) => (
                  <tr key={snip} style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td style={{ padding: "4px 8px", fontFamily: "monospace", color: "#6200ee" }}>{snip}</td>
                    <td style={{ padding: "4px 8px" }}>{meaning}</td>
                    <td style={{ padding: "4px 8px", color: "var(--text-muted)" }}>{output}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="demo-instruction" style={{ marginTop: "10px" }}>
            <strong>Install:</strong> In VS Code, press <code>Ctrl+P</code> → type <code>ext install dsznajder.es7-react-js-snippets</code> → Enter. 
            Then open any <code>.jsx</code> file, type <code>rafce</code> and press Tab!
          </p>
        </div>
      )}
    </div>
  );
}
