import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// ==========================================
// 1. Controlled Forms Demo
// ==========================================
export function ControlledFormsDemo() {
  const [formData, setFormData] = useState({ username: "", email: "" });
  const [renders, setRenders] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setRenders(prev => prev + 1);
  };

  return (
    <div className="demo-box">
      <p>Controlled inputs update React state and trigger re-renders on EVERY keystroke:</p>
      
      <div className="flex-row" style={{ gap: "15px", marginBottom: "12px" }}>
        <div style={{ flex: 1 }}>
          <div className="form-group">
            <label htmlFor="ctrl-username-input">Username:</label>
            <input 
              id="ctrl-username-input"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="demo-input"
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border-color)" }}
            />
          </div>
          <div className="form-group" style={{ marginTop: "10px" }}>
            <label htmlFor="ctrl-email-input">Email Address:</label>
            <input 
              id="ctrl-email-input"
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              className="demo-input"
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border-color)" }}
            />
          </div>
        </div>

        <div style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.02)", padding: "12px", borderRadius: "8px", border: "1px dashed var(--border-color)" }}>
          <h5>📊 Form State Monitoring:</h5>
          <div>Username: <strong>"{formData.username}"</strong></div>
          <div>Email: <strong>"{formData.email}"</strong></div>
          <div style={{ marginTop: "12px", color: "var(--accent-color)" }}>
            ⌨️ Total Keystroke Renders: <strong>{renders}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. React Hook Form Demo
// ==========================================
export function ReactHookFormDemo() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [submittedData, setSubmittedData] = useState(null);

  // useRef to count renders safely — a ref update does NOT cause a re-render
  // so we avoid the infinite loop that would happen with useState here
  const renderCountRef = React.useRef(0);
  renderCountRef.current += 1; // increment on every render, no loop!

  const onSubmit = (data) => {
    setSubmittedData(data);
  };

  return (
    <div className="demo-box">
      <p>React Hook Form uses uncontrolled inputs under the hood. Typing does NOT trigger component re-renders:</p>
      
      <div className="flex-row" style={{ gap: "15px", marginBottom: "12px" }}>
        <div style={{ flex: 1 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="rhf-nickname-input">Nickname (Required, min 3 chars):</label>
              <input 
                id="rhf-nickname-input"
                type="text"
                {...register("nickname", { required: true, minLength: 3 })}
                className="demo-input"
                style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border-color)" }}
              />
              {errors.nickname && <span style={{ color: "#ef5350", fontSize: "11px" }}>Nickname is required (min 3 chars).</span>}
            </div>

            <div className="form-group" style={{ marginTop: "10px" }}>
              <label htmlFor="rhf-phone-input">Phone Number (Required):</label>
              <input 
                id="rhf-phone-input"
                type="text"
                {...register("phone", { required: true })}
                className="demo-input"
                style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border-color)", marginBottom: "8px" }}
              />
              {errors.phone && <span style={{ color: "#ef5350", fontSize: "11px" }}>Phone number is required.</span>}
            </div>

            <button type="submit" className="demo-btn" style={{ width: "100%" }}>Submit Form</button>
          </form>
        </div>

        <div style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.02)", padding: "12px", borderRadius: "8px", border: "1px dashed var(--border-color)" }}>
          <h5>📊 React Hook Form Monitor:</h5>
          <div>Component Renders: <strong>{renderCountRef.current}</strong></div>
          <div style={{ marginTop: "10px" }}>
            <strong>Submitted Payload:</strong>
            <pre style={{ fontSize: "11px", margin: "4px 0 0 0" }}>{JSON.stringify(submittedData, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. Form Validation (Manual vs Zod) Demo
// ==========================================
// Zod Validation Schema
const signupSchema = z.object({
  email: z.string().email("Invalid email layout structure"),
  age: z.coerce.number().min(18, "Age must be at least 18 to sign up")
});

export function FormValidationDemo() {
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  
  const [manualErrors, setManualErrors] = useState({});
  const [zodErrors, setZodErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const handleManualSubmit = (e) => {
    e.preventDefault();
    setSuccessMsg("");
    const errors = {};
    
    // Manual logic validation checks
    if (!email.includes("@")) {
      errors.email = "Email must contain @ character";
    }
    if (Number(age) < 18) {
      errors.age = "Must be 18 years or older";
    }

    setManualErrors(errors);
    if (Object.keys(errors).length === 0) {
      setSuccessMsg("Manual validation passed successfully! 🎉");
    }
  };

  const handleZodSubmit = (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setZodErrors({});

    const result = signupSchema.safeParse({ email, age });
    if (!result.success) {
      // Flatten error arrays
      const errors = result.error.flatten().fieldErrors;
      const formatted = {};
      Object.keys(errors).forEach(key => {
        formatted[key] = errors[key][0];
      });
      setZodErrors(formatted);
    } else {
      setSuccessMsg("Zod Schema validation passed successfully! 🚀");
    }
  };

  return (
    <div className="demo-box">
      <p>Compare manual validation checks (raw JS if statements) vs Zod Schema validations:</p>
      
      <div className="flex-row" style={{ gap: "20px" }}>
        
        {/* Form Inputs */}
        <div style={{ flex: 1, borderRight: "1px solid var(--border-color)", paddingRight: "15px" }}>
          <h5>Submit Form Fields</h5>
          <div className="form-group">
            <label htmlFor="val-email-input">Email Address:</label>
            <input 
              id="val-email-input"
              type="text" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="demo-input"
              placeholder="e.g. hello@domain.com"
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border-color)" }}
            />
          </div>
          <div className="form-group" style={{ marginTop: "10px" }}>
            <label htmlFor="val-age-input">Age:</label>
            <input 
              id="val-age-input"
              type="number" 
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="demo-input"
              placeholder="e.g. 20"
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid var(--border-color)" }}
            />
          </div>
          
          {successMsg && (
            <div style={{ marginTop: "12px", color: "green", fontWeight: "bold", fontSize: "13px" }}>
              {successMsg}
            </div>
          )}
        </div>

        {/* Manual Checks Panel */}
        <div style={{ flex: 1 }}>
          <h5>Form A: Manual Validation</h5>
          <button className="demo-btn" style={{ width: "100%", padding: "6px", marginBottom: "8px" }} onClick={handleManualSubmit}>Run Manual checks</button>
          <div className="sim-log-box" style={{ fontSize: "11px", minHeight: "60px", backgroundColor: "#fffde7" }}>
            {manualErrors.email && <div style={{ color: "#ef5350" }}>Email: {manualErrors.email}</div>}
            {manualErrors.age && <div style={{ color: "#ef5350" }}>Age: {manualErrors.age}</div>}
            {Object.keys(manualErrors).length === 0 && <div>No manual errors found.</div>}
          </div>
        </div>

        {/* Zod Schema Panel */}
        <div style={{ flex: 1 }}>
          <h5>Form B: Zod Schema Validation</h5>
          <button className="demo-btn" style={{ width: "100%", padding: "6px", marginBottom: "8px", backgroundColor: "#2196f3" }} onClick={handleZodSubmit}>Run Zod checks</button>
          <div className="sim-log-box" style={{ fontSize: "11px", minHeight: "60px", backgroundColor: "#ffebee" }}>
            {zodErrors.email && <div style={{ color: "#ef5350" }}>Email: {zodErrors.email}</div>}
            {zodErrors.age && <div style={{ color: "#ef5350" }}>Age: {zodErrors.age}</div>}
            {Object.keys(zodErrors).length === 0 && <div>No Zod errors found.</div>}
          </div>
        </div>

      </div>
    </div>
  );
}
