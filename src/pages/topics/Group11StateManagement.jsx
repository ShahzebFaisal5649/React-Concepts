import React, { createContext, useContext, useReducer, useState } from "react";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import { create } from "zustand";

// ==========================================
// 1. Context + useReducer Demo
// ==========================================
const CartContext = createContext();

const cartInitialState = { items: [] };

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return { ...state, items: [...state.items, { id: Date.now(), name: action.payload }] };
    case "REMOVE":
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

export function ContextReducerDemo() {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);
  const [itemName, setItemName] = useState("");

  const handleAdd = () => {
    if (!itemName.trim()) return;
    dispatch({ type: "ADD", payload: itemName });
    setItemName("");
  };

  return (
    <div className="demo-box">
      <p>A global store implemented using standard React Context and useReducer hooks:</p>
      
      <div className="flex-row" style={{ gap: "10px", marginBottom: "12px" }}>
        <input 
          id="context-cart-input"
          name="context-cart-input"
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Enter item name..."
          className="demo-input"
          style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid var(--border-color)" }}
        />
        <button className="demo-btn" onClick={handleAdd}>Add Item</button>
        <button className="demo-btn" style={{ backgroundColor: "#ef5350" }} onClick={() => dispatch({ type: "CLEAR" })}>Clear All</button>
      </div>

      <div style={{ padding: "12px", backgroundColor: "rgba(0,0,0,0.02)", borderRadius: "8px", border: "1px dashed var(--border-color)" }}>
        <h5>🛒 Shopping Cart ({state.items.length} items):</h5>
        {state.items.length === 0 ? (
          <div style={{ color: "var(--text-muted)", fontSize: "12px" }}>Cart is empty. Type above and click add.</div>
        ) : (
          <ul style={{ paddingLeft: "20px", fontSize: "13px", margin: "8px 0 0 0" }}>
            {state.items.map(item => (
              <li key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                <span>📦 {item.name}</span>
                <button className="demo-btn" style={{ padding: "2px 6px", fontSize: "10px", backgroundColor: "#ef5350" }} onClick={() => dispatch({ type: "REMOVE", payload: item.id })}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 2. Redux Toolkit Demo
// ==========================================
// Define Redux Toolkit Slice
const counterSlice = createSlice({
  name: "reduxCounter",
  initialState: { count: 10 },
  reducers: {
    increment: (state) => { state.count += 1; },
    decrement: (state) => { state.count -= 1; },
    reset: (state) => { state.count = 10; }
  }
});

const { increment, decrement, reset } = counterSlice.actions;

// Build Redux Store
const reduxStore = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
});

// A child component that connects to Redux:
function ReduxCounterDisplay() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: "center" }}>
      <h3 style={{ fontSize: "28px", margin: "10px 0" }}>Count: {count}</h3>
      <div className="flex-row" style={{ justifyContent: "center" }}>
        <button className="demo-btn" onClick={() => dispatch(decrement())}>Redux -</button>
        <button className="demo-btn" onClick={() => dispatch(reset())}>Reset</button>
        <button className="demo-btn" onClick={() => dispatch(increment())}>Redux +</button>
      </div>
    </div>
  );
}

export function ReduxToolkitDemo() {
  return (
    <div className="demo-box">
      <p>A global counter managed using Redux Toolkit slices, selector functions, and store provider wrappers:</p>
      
      {/* We wrap display component in Redux Provider */}
      <Provider store={reduxStore}>
        <ReduxCounterDisplay />
      </Provider>
    </div>
  );
}

// ==========================================
// 3. Zustand Demo
// ==========================================
// Create Zustand store hook:
const useZustandStore = create((set) => ({
  count: 100,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
  resetStore: () => set({ count: 100 })
}));

export function ZustandDemo() {
  const { count, increase, decrease, resetStore } = useZustandStore();

  return (
    <div className="demo-box">
      <p>A simple global counter managed using Zustand. Observe how simple the store declaration is compared to Redux:</p>
      
      <div style={{ textAlign: "center" }}>
        <h3 style={{ fontSize: "28px", margin: "10px 0" }}>Count: {count}</h3>
        <div className="flex-row" style={{ justifyContent: "center" }}>
          <button className="demo-btn" onClick={decrease}>Zustand -</button>
          <button className="demo-btn" onClick={resetStore}>Reset</button>
          <button className="demo-btn" onClick={increase}>Zustand +</button>
        </div>
      </div>
    </div>
  );
}
