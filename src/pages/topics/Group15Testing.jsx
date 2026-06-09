import React, { useState } from "react";

// ==========================================
// 1. React Testing Library Demo
// ==========================================
export function ReactTestingLibraryDemo() {
  const [testOutput, setTestOutput] = useState([]);
  const [running, setRunning] = useState(false);

  const runTest = () => {
    setRunning(true);
    setTestOutput([]);
    const steps = [
      "⚡ RTL: render(<Counter />) inside isolated Virtual JSDOM...",
      "🔍 RTL: Searching document body for label 'Count: 0'...",
      "🎯 RTL: Found element: <button>Count: 0</button> ✅",
      "🖱️ RTL: fireEvent.click(button) triggered successfully...",
      "🔍 RTL: Searching body for updated label 'Count: 1'...",
      "🎉 RTL: Assertion expect(button.textContent).toBe('Count: 1') PASSED! ✅"
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setTestOutput(prev => [...prev, step]);
        if (index === steps.length - 1) {
          setRunning(false);
        }
      }, (index + 1) * 600);
    });
  };

  return (
    <div className="demo-box">
      <p>Simulate running React Testing Library asserts against a simple counter page:</p>
      
      <button className="demo-btn" onClick={runTest} disabled={running}>
        {running ? "Testing..." : "🟢 Run RTL Test Suite"}
      </button>

      <div className="sim-log-box" style={{ marginTop: "12px", padding: "8px", backgroundColor: "#1e1e1e", color: "#66bb6a", borderRadius: "6px", fontFamily: "monospace", fontSize: "11px", minHeight: "130px" }}>
        <strong>RTL CLI Console:</strong>
        <div style={{ marginTop: "6px" }}>
          {testOutput.map((log, i) => <div key={i}>{log}</div>)}
          {!running && testOutput.length === 0 && <div style={{ color: "#aaa" }}>Click above to execute test asserts...</div>}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. Jest Demo
// ==========================================
export function JestDemo() {
  const [testLog, setTestLog] = useState([]);
  const [running, setRunning] = useState(false);

  const triggerJest = () => {
    setRunning(true);
    setTestLog([]);
    const logs = [
      " PASS  src/utils/math.test.js",
      "  ✓ adds 1 + 2 to equal 3 (2ms)",
      "  ✓ subtracts 5 - 2 to equal 3 (1ms)",
      "Test Suites: 1 passed, 1 total",
      "Tests:       2 passed, 2 total",
      "Snapshots:   0 total",
      "Time:        0.45s",
      "Ran all test suites."
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setTestLog(prev => [...prev, log]);
        if (index === logs.length - 1) {
          setRunning(false);
        }
      }, (index + 1) * 300);
    });
  };

  return (
    <div className="demo-box">
      <p>Simulate running a Jest test runner to verify mathematical utility functions:</p>
      
      <button className="demo-btn" onClick={triggerJest} disabled={running}>
        {running ? "Running..." : "🚀 Run Jest Test Runner"}
      </button>

      <div className="sim-log-box" style={{ marginTop: "12px", padding: "8px", backgroundColor: "#1e1e1e", color: "#e0e0e0", borderRadius: "6px", fontFamily: "monospace", fontSize: "11px", minHeight: "140px" }}>
        <strong>Jest test output logs:</strong>
        <div style={{ marginTop: "6px" }}>
          {testLog.map((log, i) => {
            const isPass = log.includes("PASS") || log.includes("✓");
            return (
              <div key={i} style={{ color: isPass ? "#66bb6a" : "#e0e0e0" }}>
                {log}
              </div>
            );
          })}
          {!running && testLog.length === 0 && <div style={{ color: "#aaa" }}>Click button to boot Jest compiler...</div>}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. Unit Testing Demo
// ==========================================
export function UnitTestingDemo() {
  const [runLogs, setRunLogs] = useState([]);
  const [testing, setTesting] = useState(false);

  const runUnitTest = () => {
    setTesting(true);
    setRunLogs([]);
    const assertionSteps = [
      "🛠️ Render badge component independently with props: theme='green' text='Status'",
      "🔍 Search document body for cell containing text: 'Status'",
      "Assert: Element exists? YES ✅",
      "Assert: CSS background-color matches theme props? YES (rgba(102,187,106)) ✅",
      "🎉 Component Unit Test PASSED successfully!"
    ];

    assertionSteps.forEach((step, index) => {
      setTimeout(() => {
        setRunLogs(prev => [...prev, step]);
        if (index === assertionSteps.length - 1) {
          setTesting(false);
        }
      }, (index + 1) * 500);
    });
  };

  return (
    <div className="demo-box">
      <p>Unit testing tests isolated components without parent or global stores context dependencies:</p>
      
      <button className="demo-btn" onClick={runUnitTest} disabled={testing}>
        {testing ? "Testing..." : "🧪 Run Unit Test"}
      </button>

      <div className="sim-log-box" style={{ marginTop: "12px", padding: "8px", backgroundColor: "#1e1e1e", color: "#29b6f6", borderRadius: "6px", fontFamily: "monospace", fontSize: "11px", minHeight: "110px" }}>
        <strong>Unit testing output logs:</strong>
        <div style={{ marginTop: "6px" }}>
          {runLogs.map((log, i) => {
            const isSuccess = log.includes("PASSED") || log.includes("YES");
            return (
              <div key={i} style={{ color: isSuccess ? "#66bb6a" : "#29b6f6" }}>
                {log}
              </div>
            );
          })}
          {!testing && runLogs.length === 0 && <div style={{ color: "#aaa" }}>Click to verify isolated component props renders...</div>}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. Integration Testing Demo
// ==========================================
export function IntegrationTestingDemo() {
  const [logs, setLogs] = useState([]);
  const [running, setRunning] = useState(false);

  const runIntegrationTest = () => {
    setRunning(true);
    setLogs([]);
    const steps = [
      "🛠️ Render parent dashboard shell component containing inputs & list cards...",
      "⌨️ Simulate user typing 'Study Testing' inside note input box...",
      "🖱️ Simulate user clicking 'Submit Note' button...",
      "🔄 Check that child list updates with the new item...",
      "🔍 Search note list display for 'Study Testing' label...",
      "Assert: Note item correctly visible in child card view? YES ✅",
      "🎉 Component Integration workflow PASSED!"
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, step]);
        if (index === steps.length - 1) {
          setRunning(false);
        }
      }, (index + 1) * 500);
    });
  };

  return (
    <div className="demo-box">
      <p>Integration testing checks that multiple connected sub-systems work together successfully:</p>
      
      <button className="demo-btn" onClick={runIntegrationTest} disabled={running}>
        {running ? "Testing..." : "🛠️ Run Integration Workflow Test"}
      </button>

      <div className="sim-log-box" style={{ marginTop: "12px", padding: "8px", backgroundColor: "#1e1e1e", color: "#ab47bc", borderRadius: "6px", fontFamily: "monospace", fontSize: "11px", minHeight: "140px" }}>
        <strong>Integration testing logs:</strong>
        <div style={{ marginTop: "6px" }}>
          {logs.map((log, i) => {
            const isSuccess = log.includes("PASSED") || log.includes("YES");
            return (
              <div key={i} style={{ color: isSuccess ? "#66bb6a" : "#ab47bc" }}>
                {log}
              </div>
            );
          })}
          {!running && logs.length === 0 && <div style={{ color: "#aaa" }}>Click to test parent-child message data stream integrations...</div>}
        </div>
      </div>
    </div>
  );
}
