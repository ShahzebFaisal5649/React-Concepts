// This file holds all the topics our app teaches. 
// We export this array so the Sidebar and ContentPanel can read from it.
// Written in a simple student style with easy-to-understand explanations.

export const topics = [
  // ==========================================
  // GROUP 1 — React fundamentals
  // ==========================================
  {
    id: "reconciliation",
    title: "What is Reconciliation?",
    group: "Group 1 — React fundamentals",
    summary: "Reconciliation is the process React uses to update the real web page by comparing the new Virtual DOM with the old one, and changing only the parts that actually changed.",
    howItWorks: "When a component's state changes, React builds a new tree of elements (Virtual DOM). It compares this new tree with the old tree (this is called 'diffing'). Then, it goes to the real browser DOM and only modifies the elements that are different, instead of wiping out and recreating the whole page. This makes updates extremely fast.",
    realLife: "Imagine you have a shopping list on a piece of paper. If you want to add milk, you don't throw away the paper and write a whole new list. You just write 'milk' at the bottom of the existing paper.",
    codeExample: `// If we change parent state, only the parts of JSX that depend on it get updated.
function ParentComponent() {
  const [clickCount, setClickCount] = useState(0);

  return (
    <div>
      {/* This paragraph gets updated in the real DOM because clickCount changes */}
      <p>You clicked {clickCount} times</p>
      <button onClick={() => setClickCount(clickCount + 1)}>
        Click me
      </button>
      
      {/* This component will NOT update in the real DOM because its props didn't change! */}
      <StaticChild />
    </div>
  );
}`,
    howThisAppUsesIt: "Our app uses reconciliation every time you click a sidebar topic. The URL changes (which triggers a re-render of the content area), but the Header and Sidebar components stay mounted. React diffing compares the Virtual DOM trees and determines that only the <Outlet /> content slot changed, so only that part of the real DOM is updated. The demo below shows an isolated counter that updates without touching the sidebar.",
    outcomeToCheck: "Click the 'Increment Content Counter' button in the demo below. The counter updates. Now look at the left sidebar — it never flickers or reloads. This is reconciliation working: React only patches the single element that changed in the real DOM."
  },
  {
    id: "virtual-vs-real-dom",
    title: "Virtual DOM vs Real DOM",
    group: "Group 1 — React fundamentals",
    summary: "The Real DOM is the actual browser structure of the page, which is slow to change. The Virtual DOM is a fast, lightweight copy stored in computer memory that React uses to figure out updates before touching the real browser.",
    howItWorks: "Updating the Real DOM is slow because the browser has to recalculate styles and redraw layout for the page. React avoids this by keeping a virtual copy of the HTML tree in JavaScript memory. When something changes, React updates this virtual copy first, compares it, and then groups all changes together to update the Real DOM in one quick step.",
    realLife: "Think of an architect. Before rebuilding a wall in a real house (Real DOM, slow and expensive), the architect tests the changes on a blueprint or 3D model (Virtual DOM, fast and cheap) first.",
    codeExample: `// This is what a Virtual DOM element looks like in JS memory under the hood:
const virtualElement = {
  type: 'button',
  props: {
    className: 'primary-btn',
    children: 'Click Me!'
  }
};
// React turns this lightweight JS object into a real <button class='primary-btn'>Click Me!</button> in the HTML.`,
    howThisAppUsesIt: "Look at the very top header bar (src/components/Header.jsx). There is a 'Render Counter' that increments on every render of the header component. Because React uses the Virtual DOM to only patch what changed, and the Header is wrapped in React.memo with stable props, clicking sidebar items does not cause the Header to re-render.",
    outcomeToCheck: "Look at the 'Header Renders' badge in the top header. Click various topics in the sidebar. Notice that this counter does NOT increase. It only goes up when you toggle the theme, because that actually changes the Header's context value and forces it to re-render!"
  },
  {
    id: "spa",
    title: "Single Page Application (SPA)",
    group: "Group 1 — React fundamentals",
    summary: "A Single Page Application is a website that loads only one HTML page once. As you click links, Javascript replaces the content dynamically without requesting a new HTML page from the server.",
    howItWorks: "In standard websites, clicking a link makes the browser ask the server for a completely new HTML file, causing a white flash/reload. In a React SPA, React Router intercepts the link clicks, updates the browser URL bar, and swaps the components on the screen instantly in JavaScript.",
    realLife: "Like a TV screen. When you change the channel, you don't throw away the TV and buy a new one. The TV screen stays the same, it just changes the picture pixels.",
    codeExample: `// Instead of using standard <a href="/about"> which reloads the page,
// React Router uses the <Link to="/about"> component to swap views in JS.

import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      {/* Clicking this updates the view instantly in browser without page reload */}
      <Link to="/topic/usestate">Go to useState</Link>
    </nav>
  );
}`,
    howThisAppUsesIt: "This entire learning app is a Single Page Application. We use React Router DOM to manage page switches. When you click sidebar topics, look at the URL - it updates to '/topic/[topic-id]', but the page never flashes or requests a new HTML document.",
    outcomeToCheck: "Open browser DevTools, go to the Network tab, and select the 'Doc' filter. Click around the sidebar topics. You will see that no new documents are requested from the server. The page never does a full refresh."
  },
  {
    id: "why-react",
    title: "Why React when we have HTML, CSS, JS?",
    group: "Group 1 — React fundamentals",
    summary: "React makes it easy to build complex websites by letting you split your UI into small, reusable building blocks (components) and letting React handle updating the web page automatically when data changes.",
    howItWorks: "With vanilla JS, you have to write document.getElementById(), find elements, insert text, and keep track of everything manually, which gets buggy. React uses 'declarative' coding - you just describe what the HTML should look like based on the current data (state), and React makes sure the browser matches that description automatically.",
    realLife: "Using LEGO blocks. Instead of building a toy car out of raw, melted plastic every time, you use pre-made, reusable wheel blocks and window blocks to assemble it quickly.",
    codeExample: `// Without React (Vanilla JS):
// const btn = document.createElement('button');
// btn.innerText = 'Click';
// btn.onclick = () => { count++; document.getElementById('num').innerText = count; }
// document.body.appendChild(btn);

// With React (Declarative):
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}`,
    howThisAppUsesIt: "In our Sidebar component, we render a list of 20+ topics. Instead of writing the HTML code for a list item 23 times, we wrote a single reusable component (TopicItem) once and dynamically rendered it 23 times from our topics array using a loop (.map()).",
    outcomeToCheck: "Look at the Sidebar component file (src/components/Sidebar.jsx). You will see we use a simple loop over the topics list, passing data into a single component `<TopicItem>` inside the loop. No copy-pasting required."
  },

  // ==========================================
  // GROUP 2 — Components
  // ==========================================
  {
    id: "react-components",
    title: "React components",
    group: "Group 2 — Components",
    summary: "React components are the building blocks of a React app. They are just JavaScript functions that return JSX (HTML-like code) and can be used like custom HTML tags.",
    howItWorks: "A component function takes input data (called props), does some logic, and returns JSX. You capitalize component names (e.g. Header, not header) so React knows they are custom components and not standard HTML tags. You can embed them inside other components.",
    realLife: "Think of a component like a recipe card. You can use the card to make cookies (render the component) as many times as you want, and even put different toppings (props) on each batch.",
    codeExample: `// Defining a component:
function WelcomeMessage(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Using the component inside another component:
function App() {
  return (
    <div>
      <WelcomeMessage name="Alice" />
      <WelcomeMessage name="Bob" />
    </div>
  );
}`,
    howThisAppUsesIt: "Our app is made of several components: App, Header, Sidebar, TopicItem, and TopicPage. Look at the React DevTools component tree to see how they nest inside one another.",
    outcomeToCheck: "Right-click anywhere on the app page, choose Inspect, and look at the HTML structure. If you have React DevTools installed, switch to the 'Components' tab to see the custom component tree: <App> containing <Header>, <Sidebar>, etc."
  },
  {
    id: "hoc-vs-lower",
    title: "Higher Order vs Lower Order Components",
    group: "Group 2 — Components",
    summary: "A Lower Order component is a normal component that renders UI. A Higher Order Component (HOC) is a special function that takes a component as an input and returns a new, enhanced component with extra features.",
    howItWorks: "HOCs are patterns for sharing behavior between components. An HOC takes a component, wraps it in a new container component, adds some features (like logging, loading states, or auth checks), and returns it. Today, Custom Hooks are preferred, but HOCs are still found in older React code.",
    realLife: "Think of gift wrapping. The item inside is the lower-order component. The wrapper paper and ribbon (HOC) add decoration and protection, but the core item inside remains the same.",
    codeExample: `// This is an HOC. It takes an InputComponent, prints a log on load, and returns it.
function withLogger(InputComponent) {
  return function LoggedComponent(props) {
    useEffect(() => {
      console.log("Component mounted!");
    }, []);
    return <InputComponent {...props} />;
  };
}`,
    howThisAppUsesIt: "We created a simple `withLogger` HOC in src/components/TopicPage.jsx (or as a wrapper around our content display). It wraps the topic page content component and outputs a browser console message whenever the topic changes and mounts.",
    outcomeToCheck: "Open the DevTools Console. Click on this topic. You will see a log: '[HOC Log] Topic content wrapped with withLogger HOC has mounted!'"
  },
  {
    id: "stateless-vs-stateful",
    title: "Stateless vs Stateful Components",
    group: "Group 2 — Components",
    summary: "A Stateless component is simple and only displays whatever props it is given. A Stateful component is smart and maintains its own changing data using useState.",
    howItWorks: "Stateless components are also called 'dumb' or 'presentational' components. They do not have state hooks. Stateful components are 'smart' or 'container' components; they hold state and pass it down to stateless components as props.",
    realLife: "A mirror is stateless (it just reflects whatever is standing in front of it). A digital watch is stateful (it keeps track of time internally and updates its display).",
    codeExample: `// Stateless component: just renders props.
function UserCard(props) {
  return <h3>Name: {props.username}</h3>;
}

// Stateful component: holds and modifies state.
function UserSettings() {
  const [name, setName] = useState("Alex");
  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <UserCard username={name} />
    </div>
  );
}`,
    howThisAppUsesIt: "In our app, TopicItem (in src/components/Sidebar.jsx) is a stateless component: it just receives topic info and rendering style props and displays them. App.jsx is stateful: it maintains state for the active topic and passes it down.",
    outcomeToCheck: "Look at the source files. Notice that `Sidebar.jsx` (the `TopicItem` component) does not contain a single `useState` call, whereas `App.jsx` handles state like selected topics, theme toggles, and user sessions."
  },
  {
    id: "styled-components",
    title: "Styled Components",
    group: "Group 2 — Components",
    summary: "Styled Components is a library that allows you to write actual CSS directly inside your JavaScript files to style your React components, keeping styles scoped to that specific component.",
    howItWorks: "Instead of writing styles in an external `.css` file and assigning classNames, you use the `styled` function (e.g. `styled.div`) followed by backticks containing raw CSS. The library automatically generates a unique class name so the styles never leak out to other elements.",
    realLife: "Custom labeling. Instead of putting all shirts in a shared wardrobe and hoping they don't get mixed up, you label each shirt with a unique barcode so it only goes to its specific owner.",
    codeExample: `import styled from 'styled-components';

// This creates a button with its CSS attached directly to it!
const DangerButton = styled.button\`
  background-color: red;
  color: white;
  border-radius: 4px;
  padding: 8px 12px;
  border: none;
  &:hover {
    background-color: darkred;
  }
\`;

function Confirm() {
  return <DangerButton>Delete Account</DangerButton>;
}`,
    howThisAppUsesIt: "We installed the `styled-components` library and used it in the live demo below to create a `CustomStyledButton`. The button gets its styles through a tagged template literal attached directly to the component, generating a unique hashed class name automatically.",
    outcomeToCheck: "Right-click the 'Styled Component Button' in the demo below and click 'Inspect'. Look at its class attribute. You will see auto-generated hashed class names like `sc-bczRLJ bGugvY` instead of a hand-written class name."
  },
  {
    id: "jsx-vs-js-syntax",
    title: "JSX vs JS — Same button, different syntax",
    group: "Group 2 — Components",
    summary: "JSX is an HTML-like syntax we use in React files. Under the hood, JSX gets transformed into plain JavaScript functions (`React.createElement`) because browsers cannot read JSX.",
    howItWorks: "When you write JSX code, a compiler (like Babel or Vite's ESBuild) converts it before running. Writing `<button>Click</button>` in JSX is exactly the same as writing `React.createElement('button', null, 'Click')` in pure JavaScript.",
    realLife: "Using emojis vs writing words. Typing a thumbs-up emoji 👍 is faster and easier for humans, but it compiles to a computer-coded character value like 'U+1F44D' under the hood.",
    codeExample: `// What you write (JSX):
const jsxBtn = <button className="btn">Hello</button>;

// What runs in the browser (JS):
const jsBtn = React.createElement('button', { className: 'btn' }, 'Hello');`,
    howThisAppUsesIt: "On this topic's page (src/pages/topics/Group2Components.jsx), we have rendered two buttons. One is created using standard JSX, and the other is created using raw `React.createElement()` function calls. Both behave identically.",
    outcomeToCheck: "Look at the interactive demo below on this page. Click both buttons. Both of them update a counter successfully, proving JSX compiles down to raw JS createElement functions."
  },
  {
    id: "jsx-vs-js-difference",
    title: "Difference between JSX and JS, and output",
    group: "Group 2 — Components",
    summary: "JSX stands for JavaScript XML. It is not standard JavaScript, meaning browsers will throw errors if they try to run it. It must compile to regular JS first.",
    howItWorks: "Standard Javascript contains variables, functions, and standard logic. JSX extends JS to allow tags like HTML inline. Because it is a hybrid, it requires compilation. The output is a standard JavaScript bundle containing function trees that standard browser runtimes understand perfectly.",
    realLife: "Translate a foreign document. You write in English (JSX, easier for you) but translate it to Spanish (pure JS) for a reader who only speaks Spanish (the browser).",
    codeExample: `// JSX version (what we write):
const element = <div id="main"><h1>Welcome</h1></div>;

// Compiled JS version (what the browser runs):
const element = React.createElement('div', { id: 'main' }, 
  React.createElement('h1', null, 'Welcome')
);`,
    howThisAppUsesIt: "This learning app is written in `.jsx` files. If you inspect the downloaded files in the network tab, you will see Vite has compiled them into pure `.js` bundles containing nested JS function calls.",
    outcomeToCheck: "Press F12, open the 'Sources' tab. Find `src/App.jsx` in the folder tree on the left. You will see that the code loaded in the browser has been transformed from JSX tags into raw JavaScript browser code."
  },

  // ==========================================
  // GROUP 3 — Data flow
  // ==========================================
  {
    id: "communication-parent-child",
    title: "Parent-Child and Child-Parent Communication",
    group: "Group 3 — Data flow",
    summary: "React uses one-way data flow: parents send data to children via props. If a child needs to send data back, the parent passes a function prop, which the child calls to trigger updates.",
    howItWorks: "To communicate downward: Parent renders `<Child data={someValue} />`. To communicate upward: Parent renders `<Child onClick={handleChildClick} />`. When the child triggers the action, it calls `props.onClick(data)`, which runs the function in the parent, updating the parent's state.",
    realLife: "A manager (parent) gives instructions (props) to an employee (child). The manager also gives them a walkie-talkie (callback function). When the employee finishes, they speak into the walkie-talkie (call the callback) to let the manager know.",
    codeExample: `// Parent component:
function Parent() {
  const [status, setStatus] = useState("Waiting");

  return (
    <div>
      <p>Child status: {status}</p>
      {/* Passing the callback function as a prop */}
      <Child onNotify={(msg) => setStatus(msg)} />
    </div>
  );
}

// Child component:
function Child(props) {
  return (
    <button onClick={() => props.onNotify("Task finished!")}>
      Notify Parent
    </button>
  );
}`,
    howThisAppUsesIt: "This communication is used between App.jsx (parent) and Sidebar.jsx (child). App.jsx holds the selectedTopic state and passes a function `onTopicSelect` to the Sidebar. When you click a topic in the Sidebar, it triggers this function, updating the parent's selectedTopic state.",
    outcomeToCheck: "Click any item in the left sidebar. The Content area on the right immediately updates. This happens because the child sidebar clicked item sent the selected ID back up to the parent App state."
  },
  {
    id: "what-is-state",
    title: "What is State?",
    group: "Group 3 — Data flow",
    summary: "State is a built-in React object that stores data that belongs to a component. When the state changes, React re-renders that component to update the UI.",
    howItWorks: "State represents the component's internal memory. You create it by calling the `useState` hook. It gives you the current state value and an update function. You must ALWAYS use the update function to change state - modifying the variable directly won't tell React to re-render.",
    realLife: "A lightbulb switch. It holds the current state ('ON' or 'OFF'). Flipping the switch updates the state, causing the light bulb to either glow or go dark.",
    codeExample: `function LightSwitch() {
  const [isOn, setIsOn] = useState(false); // Default state is OFF (false)

  return (
    <div>
      <p>The light is {isOn ? "ON" : "OFF"}</p>
      <button onClick={() => setIsOn(!isOn)}>
        Flip Switch
      </button>
    </div>
  );
}`,
    howThisAppUsesIt: "Our app uses state in multiple places: `App.jsx` stores `selectedTopic` and the theme toggle; `Header.jsx` stores the sidebar search input filter; and we have live interactive states inside each demo page.",
    outcomeToCheck: "Look at the lightbulb interactive demo on the Group 3 page. Click the switch. The color turns yellow when ON, proving that updating state immediately re-renders the component to show new data."
  },
  {
    id: "what-is-props",
    title: "What is Props?",
    group: "Group 3 — Data flow",
    summary: "Props (short for properties) are read-only variables passed from a parent component to a child component, similar to arguments passed into a normal JavaScript function.",
    howItWorks: "Props are used to pass data down the component tree. They are immutable, which means a child component cannot change the props it receives. If you need to change them, the parent must change the values it passes down.",
    realLife: "Like receiving a package from a delivery driver. You (child) can open and read/use the contents of the package, but you cannot change what the sender (parent) placed inside it before mailing.",
    codeExample: `// Parent passes properties down:
<DisplayBoard message="Welcome to our site!" textColor="blue" />

// Child receives and displays them:
function DisplayBoard(props) {
  // props.message is "Welcome to our site!"
  // props.textColor is "blue"
  return <p style={{ color: props.textColor }}>{props.message}</p>;
}`,
    howThisAppUsesIt: "The TopicItem component in src/components/Sidebar.jsx receives the topic title, group, active status, and custom click handler via props from its parent Sidebar.jsx component.",
    outcomeToCheck: "Look at the React DevTools, select any `<TopicItem>` component, and check the 'Props' section in the right panel. You will see properties like `topic`, `isActive`, and `onClick`."
  },

  // ==========================================
  // GROUP 4 — Hooks
  // ==========================================
  {
    id: "what-is-hook",
    title: "What is a Hook? (Rules of Hooks)",
    group: "Group 4 — Hooks",
    summary: "Hooks are built-in React functions that let you 'hook into' state and lifecycle features from simple function components. They start with the prefix 'use'.",
    howItWorks: "Before Hooks, you had to write complex Class components to use state or lifecycles. Hooks simplified this. However, you must follow the Rules of Hooks: 1. Only call hooks at the top level (never inside loops, conditions, or nested functions). 2. Only call hooks from React function components or custom hooks.",
    realLife: "Rules of the road. You must drive on the designated side of the street and stop at red lights. If you break these rules, things crash immediately. In React, breaking hook rules breaks state tracking.",
    codeExample: `// Correct use:
function MyComponent() {
  const [count, setCount] = useState(0); // Top-level call
  // ...
}

// INCORRECT (breaks rule 1 - inside condition):
if (isLogged) {
  const [user, setUser] = useState(null); 
}`,
    howThisAppUsesIt: "This app contains several hooks: `useState`, `useEffect`, `useRef`, `useCallback`, `useMemo`, `useContext`. They are all written at the top level of our function components to follow the React rules.",
    outcomeToCheck: "Check the Group 4 page for a toggle button that attempts to break rules by running a hook inside an if statement, showing the resulting warning message or console error."
  },
  {
    id: "types-of-hooks",
    title: "Types of Hooks",
    group: "Group 4 — Hooks",
    summary: "React provides various built-in hooks: state hooks, effect hooks, ref hooks, performance hooks, context hooks, and custom hooks.",
    howItWorks: "Each hook solves a specific problem. `useState` manages local variables, `useEffect` syncs with external APIs or runs startup code, `useRef` references DOM nodes, `useMemo`/`useCallback` improve speed, and `useContext` shares global state.",
    realLife: "A Swiss Army Knife. It contains various specialized tools (scissors, knife, bottle opener). You choose the right tool depending on whether you need to cut paper or open a bottle.",
    codeExample: `// Different hooks in one file:
import { useState, useEffect, useRef } from 'react';

function Form() {
  const [text, setText] = useState(""); // State hook
  const inputRef = useRef(null); // Ref hook
  
  useEffect(() => {
    inputRef.current.focus(); // Effect hook (focus input on mount)
  }, []);
}`,
    howThisAppUsesIt: "We created a summary dashboard under this topic page that links directly to the files in our src/ directory where each hook type is declared and utilized.",
    outcomeToCheck: "Look at the Hook Types table on the Group 4 page. It shows exactly which file (e.g. App.jsx, Header.jsx) uses each hook, complete with source paths."
  },
  {
    id: "usestate-hook",
    title: "useState()",
    group: "Group 4 — Hooks",
    summary: "useState is the most common hook. It lets you create and update local variables inside a function component that React tracks and re-renders on change.",
    howItWorks: "When you call `useState(initialValue)`, it returns an array containing: 1. The current state value. 2. A function to update that state. We use array destructuring `const [value, setValue] = useState(init)` to name them.",
    realLife: "A tally counter clicker. Every time you push the lever, the counter increments by one and displays the new number on the digital face.",
    codeExample: `import { useState } from 'react';

function SimpleCounter() {
  // Declare "count" state initialized to 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count is: {count}</p>
      {/* We update state using setCount */}
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`,
    howThisAppUsesIt: "We use `useState` in App.jsx to track the active sidebar page, and in Header.jsx to track the text entered in the search filter box.",
    outcomeToCheck: "Play with the live useState counter demo below. Click '+' and '-' to watch the numbers update instantly in real-time."
  },
  {
    id: "useeffect-hook",
    title: "useEffect()",
    group: "Group 4 — Hooks",
    summary: "useEffect lets you run side effects (fetching data, setting up listeners, changing document titles) after a component renders on the screen.",
    howItWorks: "It takes a function and a dependency array. If dependencies change, the function runs again. [] means run only once on mount. [state] means run when that state changes. Returning a function from useEffect acts as a cleanup (runs when component unmounts or before re-running).",
    realLife: "An alarm clock. You set it to beep (run effect) only when it reaches the alarm time (dependency changes). If you turn the alarm off, you deactivate the switch (cleanup).",
    codeExample: `// Fetching data on mount:
useEffect(() => {
  fetch("https://api.com/data")
    .then(res => res.json())
    .then(data => setData(data));
}, []); // Empty array = mount only

// Effect with cleanup:
useEffect(() => {
  const onResize = () => console.log(window.innerWidth);
  window.addEventListener('resize', onResize);

  return () => {
    // This runs when component unmounts - clean up event listeners!
    window.removeEventListener('resize', onResize);
  };
}, []);`,
    howThisAppUsesIt: "We use `useEffect` to: 1. Fetch user data in `UserContext.jsx` on mount. 2. Register a global keydown event listener in `Header.jsx` so that pressing '/' focuses the search box, with a cleanup function to remove it on unmount. 3. The demo below shows three different useEffect patterns: updating a tab title, a timer with cleanup, and a window resize listener with cleanup.",
    outcomeToCheck: "1. Look at your browser's tab title at the top when you click the tab buttons in Demo A — it updates live. 2. Click 'Start Timer' in Demo B, wait a few seconds, then click 'Stop Timer' — the cleanup runs and the timer stops. 3. Click 'Add Resize Listener' in Demo C then drag your browser window edge — the width updates live. Click 'Remove Listener' — it stops tracking."
  },
  {
    id: "useref-hook",
    title: "useRef()",
    group: "Group 4 — Hooks",
    summary: "useRef does two things: it gives you a direct link to a physical HTML DOM element, and it stores a mutable value that stays updated without triggering a re-render when changed.",
    howItWorks: "useRef returns an object with a `.current` property. If you pass it to JSX `<input ref={myRef} />`, `myRef.current` becomes the raw HTML input element. You can also write `myRef.current = newValue` to store data privately without triggering component re-renders.",
    realLife: "A bookmark in a physical book. It keeps track of your page number (retains value) without causing the book to be reprinted (no re-render), and points you directly to the exact paragraph (DOM reference).",
    codeExample: `// 1. DOM Reference:
function InputFocus() {
  const inputEl = useRef(null);
  
  const focusInput = () => {
    inputEl.current.focus(); // Access raw DOM input element directly
  };

  return (
    <div>
      <input ref={inputEl} />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}`,
    howThisAppUsesIt: "We use `useRef` to: 1. Automatically focus the header search box when you press the '/' key. 2. Keep track of the previously selected topic so we can display a 'Previously reading: [X]' label in the content panel.",
    outcomeToCheck: "1. Press the '/' key on your keyboard. The search bar at the top gets focused immediately. 2. Switch topics in the sidebar and look at the bottom of the content panel to see your previously visited page name."
  },
  {
    id: "usecallback-hook",
    title: "useCallback()",
    group: "Group 4 — Hooks",
    summary: "useCallback caches (memoizes) a function definition between renders so it doesn't get recreated on every single re-render, preventing unnecessary child re-renders.",
    howItWorks: "By default, React recreates all functions inside a component on every render. If you pass this function as a prop to a child component, the child sees a 'new' reference and re-renders, even if memoized. Wrapping it in `useCallback(fn, deps)` keeps the same function reference until dependencies change.",
    realLife: "Printing a business card. Instead of hiring a designer to draw your logo from scratch on every single envelope you mail, you print a stamp and reuse the exact same logo stamp for every envelope.",
    codeExample: `// Without useCallback, this function is created brand new on every render:
// const handleClick = () => { doSomething(id); };

// With useCallback, the function stays the same:
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]); // Only recreate function if 'id' changes`,
    howThisAppUsesIt: "Our `onTopicSelect` handler in App.jsx is wrapped in `useCallback`. This keeps its function reference stable so the Sidebar (wrapped in React.memo) won't re-render when unrelated state changes like the theme toggle. The demo below shows the direct comparison: toggle useCallback off and click 'Increment Parent' — the memoized child re-renders because the callback reference changed. Toggle it back on — the child stops re-rendering.",
    outcomeToCheck: "In the demo below: 1. Make sure 'Enable useCallback' checkbox is CHECKED. Click 'Increment Parent Count' several times — the Memoized Child's render count stays frozen. 2. Now UNCHECK the checkbox and click 'Increment Parent Count' — the child's render count goes up every time because it receives a new function reference each render!"
  },
  {
    id: "usememo-hook",
    title: "useMemo()",
    group: "Group 4 — Hooks",
    summary: "useMemo caches the result of an expensive calculation so it doesn't have to run again unless the variables it depends on change.",
    howItWorks: "If you have a function that runs a slow loop or filters a huge list, you don't want it running on every render (e.g. when typing in a box or clicking a counter). `useMemo(() => calculateValue(a, b), [a, b])` stores the result in memory and returns it instantly on re-renders, unless `a` or `b` changes.",
    realLife: "Writing down math answers. If you do 384 × 29 and get 11,136, you write '11,136' on a cheat sheet (useMemo). Next time someone asks for 384 × 29, you read the sheet instead of doing the math again.",
    codeExample: `const filteredTopics = useMemo(() => {
  console.log("Filtering topics..."); // This log only fires if query or topics change
  return topics.filter(t => t.title.toLowerCase().includes(query.toLowerCase()));
}, [query, topics]); // Only recalculate if query or topics list changes`,
    howThisAppUsesIt: "In App.jsx, the list of sidebar topics is filtered based on the header search term. We wrapped this filtering process inside `useMemo` so that clicking sidebar topics or toggling the theme doesn't re-run the search list search code.",
    outcomeToCheck: "Open DevTools Console. Type in the search box: you will see the console log 'useMemo: Filtering topics...' run on each keystroke. Now, click theme toggle: the log does NOT run, because the search query didn't change!"
  },
  {
    id: "usecontext-hook",
    title: "useContext()",
    group: "Group 4 — Hooks",
    summary: "useContext allows you to share data (like user info, themes, or language settings) globally across your entire component tree without manually passing props through every level (prop drilling).",
    howItWorks: "First, you create a context box using `createContext()`. Second, you wrap your components with a `<Context.Provider value={data}>` and pass the data. Third, any child component anywhere inside the wrapper can retrieve the data by running `useContext(Context)`.",
    realLife: "A radio broadcast. The station (Provider) plays music over the airwaves. Anyone in the city with a radio receiver (useContext) can tune in and listen to the music directly, without needing someone to run wires from the station to their house.",
    codeExample: `// 1. Create:
const UserContext = createContext();

// 2. Provide:
<UserContext.Provider value={{ name: "Sophia" }}>
  <Dashboard />
</UserContext.Provider>

// 3. Consume (deep inside Dashboard):
function Profile() {
  const user = useContext(UserContext); // Retrieves { name: "Sophia" } directly!
  return <p>User: {user.name}</p>;
}`,
    howThisAppUsesIt: "We use two contexts in our app: 1. `ThemeContext` (manages theme 'light' vs 'dark' and sets cookies). 2. `UserContext` (fetches a mock user profile from jsonplaceholder on mount). The Header reads the theme and user name, and the Sidebar footer displays the user profile, all without prop drilling.",
    outcomeToCheck: "Toggle the theme button in the header. The theme shifts immediately across the whole app. In the header and sidebar, you will see 'Logged in as: Leanne Graham', which is fetched from jsonplaceholder API and shared via context."
  },

  // ==========================================
  // GROUP 5 — Storage
  // ==========================================
  {
    id: "localstorage",
    title: "localStorage",
    group: "Group 5 — Storage",
    summary: "localStorage is a browser feature that lets you store key-value string data permanently. The data stays even if you close the tab, close the browser, or turn off your computer.",
    howItWorks: "Data is saved locally on the user's browser. It has a limit of about 5MB and only supports text strings (so you must use JSON.stringify() to store objects). Common methods are: `localStorage.setItem(key, val)`, `localStorage.getItem(key)`, and `localStorage.removeItem(key)`.",
    realLife: "A notebook with a pen. You write down some notes. You can close the book, put it in a drawer, and when you open it next week, the notes are still exactly where you left them.",
    codeExample: `// Storing data:
localStorage.setItem("username", "developer_student");

// Retrieving data:
const user = localStorage.getItem("username"); // "developer_student"

// Storing an object (must convert to string first!):
const settings = { volume: 80, dark: true };
localStorage.setItem("user_settings", JSON.stringify(settings));

// Retrieving object:
const loadedSettings = JSON.parse(localStorage.getItem("user_settings"));`,
    howThisAppUsesIt: "Our app uses a custom hook `useLocalStorage` to save the ID of your active topic. When you click a topic, we save it. When you reload the app, it reads from localStorage and automatically re-opens the last page you visited.",
    outcomeToCheck: "Select a topic like 'useState()'. Refresh the page (F5) or close the tab and re-open the app URL. Notice that the app opens directly back to 'useState()' automatically."
  },
  {
    id: "sessionstorage",
    title: "sessionStorage",
    group: "Group 5 — Storage",
    summary: "sessionStorage is just like localStorage, but it is temporary. The stored data is wiped out as soon as the user closes the browser tab.",
    howItWorks: "It shares the same methods (`setItem`, `getItem`, etc.) and 5MB storage limit as localStorage. However, sessionStorage is isolated to that specific browser tab. Opening the page in a new tab creates a fresh, empty session storage.",
    realLife: "Writing notes on a whiteboard. As long as you are in the meeting room (tab is open), you can reference the board. But when you leave and turn off the lights (close the tab), the whiteboard is erased completely.",
    codeExample: `// Saving temporary form progress:
sessionStorage.setItem("draft_search", "useEffect");

// Reading:
const draft = sessionStorage.getItem("draft_search"); // "useEffect"`,
    howThisAppUsesIt: "We save the search input query in `sessionStorage`. If you type in the search box to filter topics and then hit refresh, the search word remains in the input. But if you close the tab and open it again, the search box resets to empty.",
    outcomeToCheck: "1. Type 'use' in the header search input. 2. Reload the page (F5). The search text 'use' is still there! 3. Copy the URL, close the tab, open a new tab, paste the URL. The search input is now empty."
  },
  {
    id: "cookie-storage",
    title: "Cookie Storage",
    group: "Group 5 — Storage",
    summary: "Cookies are small text files stored in the browser that are automatically attached to every network request sent to the server. They can have set expiration dates and are limited to 4KB.",
    howItWorks: "Because cookies are sent to the server with every request, they are ideal for security tokens. JavaScript reads and writes them using the `document.cookie` string. Since the raw string interface is messy, we write helpers to parse them.",
    realLife: "A wristband ticket given to you at a theme park entry. Every time you enter a ride (server request), you don't have to buy a new ticket; the ride operator checks your wristband (cookie) automatically.",
    codeExample: `// Writing a helper to set a cookie with an expiry date:
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

// Reading a cookie:
function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(';');
  for(let i=0;i < ca.length;i++) {
    let c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}`,
    howThisAppUsesIt: "We use a browser cookie to store your theme preference ('light' or 'dark'). On application startup, the theme context checks if a theme cookie exists and restores it. If no cookie exists, it defaults to light.",
    outcomeToCheck: "1. Change the theme using the header toggle button. 2. Press F12, open the 'Application' tab, click 'Cookies' in the sidebar. You will see a cookie named `app_theme` containing the value `light` or `dark` with a 7-day expiration."
  },
  {
    id: "storage-differences",
    title: "Difference between localStorage, sessionStorage, and cookies",
    group: "Group 5 — Storage",
    summary: "The main differences lie in expiration dates, capacity, accessibility, and whether they are sent to the server.",
    howItWorks: "Here is a comparison table:\n\n| Feature | localStorage | sessionStorage | Cookies |\n|---|---|---|---|\n| **Capacity** | ~5MB | ~5MB | ~4KB |\n| **Lifespan** | Permanent | Till tab closes | Set by developer |\n| **Sent to server?** | No | No | Yes (with every request) |\n| **Access** | HTML5 client | HTML5 client | Client & Server |",
    realLife: "localStorage is a notebook in your desk (permanent). sessionStorage is a scrap paper in your pocket (throw it away when you get home). Cookies are a passport badge on your shirt (shown to every customs officer you pass).",
    codeExample: `// Choose localStorage for UI settings (theme, layout preference).
// Choose sessionStorage for multi-page checkout forms.
// Choose Cookies for server session tokens (JSON Web Tokens).`,
    howThisAppUsesIt: "We have built a comparison control panel on the Group 5 page that allows you to click buttons to set values in all three storages, refresh/restart, and observe how they react.",
    outcomeToCheck: "Open the interactive storage comparison panel on the Group 5 page. Fill out the inputs for localStorage, sessionStorage, and cookies, then try refreshing the tab or opening in a new tab to see which ones survive."
  },

  // ==========================================
  // GROUP 6 — Routing
  // ==========================================
  {
    id: "react-router-dom",
    title: "React Router DOM",
    group: "Group 6 — Routing",
    summary: "React Router DOM is the standard routing library for React apps. It links the browser's address bar to specific component pages without refreshing the browser.",
    howItWorks: "You wrap your application in a `<BrowserRouter>`. Then you use `<Routes>` and `<Route>` to define URL paths. Clicking navigation links created with the `<Link>` or `<NavLink>` component updates the URL and switches components instantly.",
    realLife: "A building map directory. When you look at the directory and walk to room 101, the building doesn't change; you simply move your body to a different area of the existing structure.",
    codeExample: `import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}`,
    howThisAppUsesIt: "In `src/App.jsx`, we wrap our layout inside `<BrowserRouter>` and use `<Routes>` to map path `/topic/:id` to our `<TopicPage>` component, enabling direct navigation.",
    outcomeToCheck: "Look at your URL bar. Click on any topic. Notice the path changes to `/topic/[topic-id]`. Try copying that URL, pasting it in a new tab, and opening it. It opens directly to the exact topic page."
  },
  {
    id: "routes-public-private",
    title: "Public vs Private Routes",
    group: "Group 6 — Routing",
    summary: "Public routes are pages anyone can view (like a Login or Home page). Private routes are protected pages that restrict access to logged-in users only.",
    howItWorks: "We build a wrapper component called `<PrivateRoute>`. It checks an authentication state (e.g. is user logged in?). If yes, it renders the child pages (using `<Outlet />` or `children`). If no, it redirects the user to the `/login` route using the `<Navigate />` component.",
    realLife: "A nightclub. The street and lobby (Public route) are open to everyone. But the VIP lounge (Private route) requires showing a valid member ID (Auth check) to the bouncer at the door.",
    codeExample: `import { Navigate, Outlet } from 'react-router-dom';

// Private route wrapper component:
function PrivateRoute(props) {
  const isLoggedIn = props.isLoggedIn; // Boolean check
  
  // If logged in, show the inner route components (<Outlet />)
  // Otherwise, redirect to login page
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

// Inside App.jsx routing definition:
// <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
//   <Route path="/notes" element={<NotesPage />} />
// </Route>`,
    howThisAppUsesIt: "We have created a Private Route for '/notes' (My Notes page). We also added a fake login toggle in the Header. When logged out, trying to navigate to '/notes' redirects you to '/login'. When logged in, it loads successfully.",
    outcomeToCheck: "1. Log out (via Header button if logged in). 2. Click the 'My Notes' link at the bottom of the sidebar or type `/notes` in the browser URL. Notice you get redirected to `/login`. 3. Log in, then try again: the notes page loads!"
  },

  // ==========================================
  // GROUP 7 — Dashboard layout
  // ==========================================
  {
    id: "dashboard-layout",
    title: "Dashboard Layout",
    group: "Group 7 — Dashboard layout",
    summary: "A dashboard layout is a standard structural template consisting of a persistent header and sidebar, with a main content area that updates based on the active path.",
    howItWorks: "We define a single main layout component. It renders the Header at the top and the Sidebar on the left. On the right, it leaves a placeholder slot (using React Router's `<Outlet />`). When you visit child routes, React Router swaps those components into the Outlet slot, while keeping Header and Sidebar mounted.",
    realLife: "A picture frame. The frame (Header and Sidebar) stays the same on your shelf, but you can slide different photographs (Content components) in and out of the center window.",
    codeExample: `import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-body">
        <Sidebar />
        <main className="content-slot">
          {/* This is where child routes get rendered! */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}`,
    howThisAppUsesIt: "Our main structure in App.jsx follows this pattern. The Header remains loaded at the top, the Sidebar stays fixed on the left, and the topic content re-renders inside the main area via the `<Outlet />` component.",
    outcomeToCheck: "Switch between different topics. Open React DevTools and inspect the `<Header>` or `<Sidebar>` component. Notice their state (like the search filter text in the sidebar) is completely preserved, proving they never unmount."
  },

  // ==========================================
  // GROUP 8 — Performance and networking
  // ==========================================
  {
    id: "preload",
    title: "Preload",
    group: "Group 8 — Performance and networking",
    summary: "Preload is an HTML instruction that tells the browser to download a high-priority asset (like a critical font, image, or stylesheet) immediately because the current page will definitely use it.",
    howItWorks: "You place a `<link rel=\"preload\" href=\"...\" as=\"...\">` tag in the `<head>` of your HTML document. This tells the browser to fetch the file in parallel before it even starts executing the main Javascript bundle, speeding up load times.",
    realLife: "Calling a restaurant to order food while you are still driving there. When you arrive, the food is already cooked and waiting for you on the table.",
    codeExample: `<!-- Inside index.html head -->
<link rel="preload" href="/fonts/my-font.woff2" as="font" type="font/woff2" crossorigin>`,
    howThisAppUsesIt: "In our `index.html`, we have added a `<link rel=\"preload\">` for a Google Web Font to load the primary typography style early. On this topic page, we also provide a button that appends a preload link to the head dynamically to demonstrate the network fetch.",
    outcomeToCheck: "1. Open browser DevTools Network tab. 2. Reload the page. You will see the web font request fires at the very top of the list, right after the main HTML document, with a high priority."
  },
  {
    id: "prefetch",
    title: "Prefetch",
    group: "Group 8 — Performance and networking",
    summary: "Prefetch is an HTML instruction that tells the browser to download low-priority assets during its idle time because the user might visit that page next.",
    howItWorks: "You insert `<link rel=\"prefetch\" href=\"...\">`. The browser waits until the current page is fully loaded and the CPU is quiet, then downloads the file and stores it in the local cache. When the user eventually clicks the link, the page loads instantly.",
    realLife: "Packing an umbrella in your car trunk because the weather report says it *might* rain tomorrow. It doesn't get in your way today, but it's ready if you need it.",
    codeExample: `// Dynamically adding a prefetch link when user hovers over a link:
const prefetchLink = document.createElement('link');
prefetchLink.rel = 'prefetch';
prefetchLink.href = '/details-page-data.json';
document.head.appendChild(prefetchLink);`,
    howThisAppUsesIt: "We have built a hover prefetcher on our Sidebar topic items. When you hover your cursor over a topic in the sidebar for more than 300ms, we dynamically inject a prefetch link tag for that topic's mock data.",
    outcomeToCheck: "Open your Network tab. Gently hover your mouse over sidebar topics without clicking them. You will see low-priority prefetch network requests trigger in the log."
  },
  {
    id: "preflight-request",
    title: "Preflight request (CORS)",
    group: "Group 8 — Performance and networking",
    summary: "A preflight request is a security check the browser runs automatically. It sends an OPTIONS request to a server on another domain to ask permission before executing complex requests.",
    howItWorks: "When making requests across domains (e.g. from localhost to api.com), simple GET requests are sent directly. But if you make a request that deletes data (DELETE) or sends custom headers (like Authorization), the browser first sends an OPTIONS check. If the server approves, the browser sends the actual request.",
    realLife: "Knocking on a closed door and asking, 'May I enter?' before actually opening the door and walking into the room.",
    codeExample: `// This request triggers a preflight because it has custom headers:
fetch("https://api.example.com/data", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer secret-token" // Trigger!
  },
  body: JSON.stringify({ item: "new" })
});`,
    howThisAppUsesIt: "We provide two buttons on the Group 8 page: Button 1 sends a standard GET request (no preflight). Button 2 sends a mock DELETE request to jsonplaceholder with a custom authorization header. This triggers the browser to fire a preflight OPTIONS request.",
    outcomeToCheck: "Click the 'Trigger Preflight' button on this page. Look at your Network tab. You will see two entries for the same request: first an OPTIONS request (the preflight check) returning status 204 or 200, followed by the actual request."
  },
  {
    id: "preload-prefetch-preflight-diff",
    title: "Difference between preload, prefetch, and preflight",
    group: "Group 8 — Performance and networking",
    summary: "Preload and prefetch are performance optimizations that you control. Preflight is a security mechanism enforced by the browser.",
    howItWorks: "Summary of differences:\n- **Preload**: High priority. Fetching resources needed *right now* on the current page.\n- **Prefetch**: Low priority. Fetching resources that *might* be needed later on future pages.\n- **Preflight**: Automatic security check. Browser checks cross-origin access permissions using OPTIONS before sending a non-simple request.",
    realLife: "Preload is placing keys in your pocket before leaving. Prefetch is carrying a spare tire in your car. Preflight is showing your ticket to a security guard before boarding a train.",
    codeExample: `// Preload: <link rel="preload" href="font.woff2" as="font" />
// Prefetch: <link rel="prefetch" href="next-page.js" />
// Preflight: Handled automatically by browser fetch() when headers are present.`,
    howThisAppUsesIt: "We have built a triple-monitoring panel on this page where you can run all three processes side-by-side and see live visual bars demonstrating their execution timings.",
    outcomeToCheck: "Look at the visual timing simulator below. Click the start button and compare how early preload executes, when prefetch triggers during idle time, and how preflight delays the actual request."
  },

  // ==========================================
  // GROUP 9 — API calls
  // ==========================================
  {
    id: "fetch-api",
    title: "Fetch API and all its methods",
    group: "Group 9 — API calls",
    summary: "The Fetch API is a built-in browser interface that lets you make HTTP network requests. It uses JavaScript Promises and does not require installing any external libraries.",
    howItWorks: "Fetch supports standard HTTP methods (GET to read, POST to create, PUT/PATCH to update, DELETE to remove). Note: Fetch does not automatically throw errors on HTTP status codes like 404 or 500 - you must manually check if `response.ok` is true, and you must call `response.json()` to parse the data.",
    realLife: "A mail carrier. They deliver messages. If they deliver a letter that says 'Sorry, you are evicted!' (404/500 error), the mail carrier still successfully delivered the mail (Promise resolved) - it is up to you to read the letter and react.",
    codeExample: `// Fetch GET:
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then(res => {
    if (!res.ok) {
      throw new Error("HTTP error: " + res.status);
    }
    return res.json(); // Must manually parse!
  })
  .then(data => console.log(data))
  .catch(err => console.error(err));

// Fetch POST:
fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "New Post", body: "Content" })
});`,
    howThisAppUsesIt: "We created a file `src/services/fetchService.js` that implements all five CRUD methods (GET, POST, PUT, PATCH, DELETE) using the Fetch API. We expose these methods to a demo panel on this page so you can test them.",
    outcomeToCheck: "Click the Fetch API method buttons on this page. Read the output box to see how the code handles the raw promise responses and inspect the Network tab to view the payload formats."
  },
  {
    id: "axios-api",
    title: "Axios and all its methods",
    group: "Group 9 — API calls",
    summary: "Axios is a popular third-party library for making HTTP requests. It simplifies code by auto-parsing JSON, automatically throwing errors on 404/500, and supporting interceptors.",
    howItWorks: "You install it via `npm install axios`. Axios provides shorthand methods like `axios.get()` or `axios.post()`. It also allows creating reusable instances with set configurations (like a baseURL or default headers). Request and response interceptors allow running code before requests are sent or after responses arrive.",
    realLife: "Hiring a personal assistant to handle your mail. Instead of you opening letters and translating them yourself (Fetch's .json()), the assistant opens, translates, and hands you the ready-to-read contents. If a letter contains an bad bill, the assistant screams immediately (throws error).",
    codeExample: `import axios from 'axios';

// Create a custom instance:
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

// Interceptor:
api.interceptors.request.use(config => {
  config.headers.Authorization = "Bearer my_token";
  return config;
});

// Axios GET (automatically parses JSON!):
api.get("/posts/1")
  .then(res => console.log(res.data))
  .catch(err => console.error(err)); // Automatically catches 404/500s!`,
    howThisAppUsesIt: "We set up an Axios instance in `src/services/axiosInstance.js` which points to `jsonplaceholder`. We added request interceptors to inject headers, and response interceptors. We created `src/services/axiosService.js` to manage CRUD requests.",
    outcomeToCheck: "Click the Axios CRUD buttons below. Watch the DevTools Console: you will see our custom request interceptor print 'Axios Request Interceptor: Sending to [URL]' before every call, followed by the response."
  },
  {
    id: "axios-vs-fetch",
    title: "Difference between Axios and Fetch",
    group: "Group 9 — API calls",
    summary: "Axios is an external library that handles JSON parsing and error catching automatically. Fetch is built into the browser but requires more boilerplate code.",
    howItWorks: "Key differences include:\n1. **JSON Parsing**: Fetch requires `response.json()`, Axios parses automatically into `response.data`.\n2. **Error Handling**: Fetch resolves successfully on 404/500 errors (you must check `response.ok`). Axios throws an error automatically.\n3. **Interceptors**: Axios has them built-in; Fetch requires writing custom wrappers.\n4. **Size**: Fetch is built-in (0 KB additional size), Axios adds about 13KB to your project.",
    realLife: "Fetch is buying raw wood and building a table yourself (clean, free, but takes work). Axios is buying an assembled table from a furniture store (costs something in weight/size, but ready to use instantly).",
    codeExample: `// Fetch:
fetch('/api')
  .then(res => {
    if(!res.ok) throw new Error();
    return res.json();
  })
  .then(data => console.log(data));

// Axios:
axios.get('/api')
  .then(res => console.log(res.data));`,
    howThisAppUsesIt: "We built a side-by-side comparison box on this page. Clicking both buttons attempts to load a broken URL. You will see Fetch log 'Success' (initially) with status 404, while Axios immediately jumps to the `.catch()` block.",
    outcomeToCheck: "Click 'Fetch Test 404' and 'Axios Test 404' below. Note that the Fetch output requires custom check logic to identify the error, whereas the Axios output is caught immediately by the standard error handler."
  },
  {
    id: "axios-fetch-preflight",
    title: "How Axios and Fetch relate to preflight",
    group: "Group 9 — API calls",
    summary: "Both Axios and Fetch trigger CORS preflight OPTIONS requests in identical scenarios because preflight is a browser-level security rule, not a library feature.",
    howItWorks: "Whether you use Axios or Fetch, if you make a request to a different domain, the browser will trigger a preflight OPTIONS request if you: 1. Use methods like DELETE, PUT, or PATCH. 2. Include custom headers like `Authorization`. 3. Set the `Content-Type` header to `application/json`.",
    realLife: "Airport security. It doesn't matter if you fly on a commercial jet (Fetch) or a luxury airline (Axios), you must go through the exact same security checkpoint before boarding.",
    codeExample: `// Both of these trigger a preflight OPTIONS request:
fetch("https://api.com/delete", { method: "DELETE" });
axios.delete("https://api.com/delete");`,
    howThisAppUsesIt: "In `src/services/axiosInstance.js`, we have configured a request interceptor that adds an `Authorization` header to every request. This ensures that every Axios request in our application triggers a preflight check when making cross-origin calls.",
    outcomeToCheck: "Click the API demo triggers below. You will see that both Fetch and Axios trigger preflight requests whenever headers are changed, showing the OPTIONS request in the Network tab."
  },
  {
    id: "conditional-rendering",
    title: "Conditional Rendering",
    group: "Group 2 — Components",
    summary: "Conditional Rendering in React allows you to selectively display different UI elements or components based on certain logic or states.",
    howItWorks: "In React, we use standard JavaScript operators to decide what JSX to return. The most common patterns are:\n1. ternary operator: condition ? <A /> : <B /> (when you have an if-else layout).\n2. logical && operator: condition && <A /> (when you only want to show something if true, and nothing if false).\n3. if/else statements outside of JSX returning different blocks entirely.",
    realLife: "A vending machine. If you put in enough money, it shows the green 'Dispense' light. If you don't, it shows the red 'Insert Coins' message.",
    codeExample: `// 1. Ternary Operator:
{isLoggedIn ? <WelcomeBanner /> : <LoginForm />}

// 2. Logical AND (&&) Operator:
{hasUnreadMessages && <NotificationDot />}

// 3. Standard if/else outside JSX:
if (isLoading) {
  return <p>Loading...</p>;
}
return <Dashboard />;`,
    howThisAppUsesIt: "We render conditional sections on this demo page. A toggle switch updates state, showing or hiding components using && and ternary operators.",
    outcomeToCheck: "Click the toggle button in the demo. Observe how the text and badge style changes dynamically based on the state using conditional React rendering."
  },
  {
    id: "lists-keys",
    title: "Lists and Keys",
    group: "Group 2 — Components",
    summary: "Lists are rendered in React by looping over arrays using the .map() method. Keys are unique string identifiers passed to list items so React can track their identities during list updates.",
    howItWorks: "When you render a list of elements, React needs to know which elements changed, were added, or were removed. Without unique keys, React has to re-render the whole list whenever a single item changes. You should always use a stable, unique ID (not the array index) as the 'key' prop.",
    realLife: "Cloakroom tags at a museum. If every coat gets a unique number tag, the keeper can find and return your exact coat. If they just rely on the order coats are hung, moving one coat breaks the whole order.",
    codeExample: `// Rendering lists with unique keys:
const fruits = [
  { id: 'f1', name: 'Apple' },
  { id: 'f2', name: 'Banana' }
];

function FruitList() {
  return (
    <ul>
      {fruits.map((fruit) => (
        <li key={fruit.id}>{fruit.name}</li>
      ))}
    </ul>
  );
}`,
    howThisAppUsesIt: "This app displays lists of topics in the left sidebar. Each topic in our array has a unique 'id' property which we pass as the key prop inside the .map() loop in Sidebar.jsx.",
    outcomeToCheck: "Look at the list editor below. Try adding and removing items. When we use unique keys, React only updates the modified items. When we use index keys, you will see a warning in the console on list modifications."
  },
  {
    id: "react-fragments",
    title: "React Fragments",
    group: "Group 2 — Components",
    summary: "React Fragments let you group a list of children elements without adding extra wrapper nodes (like unnecessary <div> tags) to the HTML DOM tree.",
    howItWorks: "React components must return a single root element. If you have two adjacent tags, you'd normally wrap them in a <div>. This makes the HTML DOM cluttered and can break CSS layouts like Flexbox or tables. React Fragments <React.Fragment> or the shorthand <>...</> group the elements in JSX but compile to nothing in the final HTML.",
    realLife: "A clear plastic bag used to group items at airport security. It holds all your keys and phone together while passing the checkpoint, but is discarded once you put them back in your pockets.",
    codeExample: `// Without fragments (extra wrapper div created in HTML):
function TableCells() {
  return (
    <div>
      <td>Cell 1</td>
      <td>Cell 2</td>
    </div>
  );
}

// With fragments (no wrapper div, keeps table structure valid!):
function TableCells() {
  return (
    <>
      <td>Cell 1</td>
      <td>Cell 2</td>
    </>
  );
}`,
    howThisAppUsesIt: "In our dynamic topic page, we use React Fragments to group heading, summary, and analogy blocks without wrapping the entire page in a redundant div.",
    outcomeToCheck: "Inspect the DOM elements on this page. You will notice that there are no container divs wrapping adjacent elements in sections where <React.Fragment> is utilized."
  },
  {
    id: "lifting-state-up",
    title: "Lifting State Up",
    group: "Group 3 — Data flow",
    summary: "Lifting State Up is the pattern of moving shared state to the closest common parent component of two sibling components that need to share or sync the same data.",
    howItWorks: "In React, data flows downward (unidirectional). If two sibling components need to share the same changing data, you cannot pass data directly between siblings. Instead, you move that state up to their shared parent, and pass the state value and change callback functions down to both siblings as props.",
    realLife: "A shared thermostat in a college apartment. Instead of roommates having separate individual heaters, they share a single thermostat in the central living room (parent) that sets the temperature for both bedrooms.",
    codeExample: `// Parent container holds the state:
function Parent() {
  const [temperature, setTemperature] = useState(20);
  return (
    <>
      <ThermostatInput value={temperature} onChange={setTemperature} />
      <TemperatureDisplay value={temperature} />
    </>
  );
}`,
    howThisAppUsesIt: "In our app, we lift the active topic state up to App.jsx. This allows the Sidebar component (sibling A) to show which item is active, and the TopicPage component (sibling B) to render the details for that same topic.",
    outcomeToCheck: "Play with the double slider demo below. Adjusting slider A immediately updates the value displayed in card B because their state is lifted to their parent container."
  },
  {
    id: "controlled-vs-uncontrolled",
    title: "Controlled vs Uncontrolled Components",
    group: "Group 3 — Data flow",
    summary: "Controlled components have their value managed entirely by React state. Uncontrolled components have their value managed by the browser DOM itself (read via useRef).",
    howItWorks: "1. Controlled: You bind the input's val to a state variable, and update it using onChange. Every keystroke updates React state and re-renders the input.\n2. Uncontrolled: The input behaves like traditional HTML. You do not set value or onChange. Instead, you use a useRef to query the input's value from the DOM only when you need it (e.g., when clicking submit).",
    realLife: "Controlled is driving a modern electric car where the onboard computer controls every steer and adjusts traction constantly. Uncontrolled is steering a manual go-kart where you only inspect the wheel position when parking.",
    codeExample: `// 1. Controlled (value tracked in state):
const [val, setVal] = useState("");
<input value={val} onChange={(e) => setVal(e.target.value)} />

// 2. Uncontrolled (value read from DOM via ref):
const inputRef = useRef(null);
const submit = () => console.log(inputRef.current.value);
<input ref={inputRef} />`,
    howThisAppUsesIt: "We provide two form panels below: Form A uses React state (Controlled) to show character counts in real-time. Form B uses a ref (Uncontrolled) to read values only on submit.",
    outcomeToCheck: "Type in both input forms below. The controlled input displays character counts as you type. The uncontrolled input only shows the value after you click the submit button."
  },
  {
    id: "link-vs-navlink",
    title: "Link vs NavLink",
    group: "Group 6 — Routing",
    summary: "Link is a standard router component used to navigate the app. NavLink is a special wrapper around Link that automatically adds styling class attributes when its path matches the current URL.",
    howItWorks: "Both Link and NavLink prevent page refreshes by intercepting clicks and updating the history stack in JS. However, NavLink checks the active route. If the URL matches the to prop, NavLink appends className='active' to the anchor element, making it ideal for building navigation tabs or sidebars.",
    realLife: "A standard signpost (Link) that points you to a room, versus a smart signpost (NavLink) that lights up green if you are currently standing inside that room.",
    codeExample: `import { Link, NavLink } from 'react-router-dom';

// Standard Link:
<Link to="/about">About Page</Link>

// NavLink (receives .active class when on /about):
<NavLink to="/about" className={({ isActive }) => isActive ? 'highlight' : ''}>
  About Page
</NavLink>`,
    howThisAppUsesIt: "We use NavLink in Sidebar.jsx to render sidebar topics. The currently active topic automatically highlights in purple because React Router injects the 'active' class into its style tag.",
    outcomeToCheck: "Hover and click the demo links below. You will notice that NavLink links change color automatically when clicked, while standard Links do not change styling on selection."
  },
  {
    id: "react-router-hooks",
    title: "useNavigate, useParams, useLocation",
    group: "Group 6 — Routing",
    summary: "These are built-in hooks provided by React Router to programmatically navigate, fetch URL parameters, and read the current location data in components.",
    howItWorks: "1. useNavigate() returns a function that lets you jump to routes programmatically (e.g., navigate('/home')).\n2. useParams() returns an object containing key-value pairs of dynamic URL params (e.g., /user/:id -> { id: '123' }).\n3. useLocation() returns an object representing the current URL path details (hash, pathname, search query string).",
    realLife: "useNavigate is a GPS navigator steering wheel (moves you). useParams is a mailbox name tag (reveals who lives at this address). useLocation is a compass (tells you exactly where you stand right now).",
    codeExample: `import { useNavigate, useParams, useLocation } from 'react-router-dom';

function UserProfile() {
  const navigate = useNavigate();
  const { id } = useParams(); // URL: /user/:id
  const location = useLocation(); // URL path information
  
  return (
    <div>
      <p>Current Path: {location.pathname}</p>
      <p>Viewing User: {id}</p>
      <button onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
    </div>
  );
}`,
    howThisAppUsesIt: "We use useParams in TopicPage.jsx to fetch the active topic ID from the URL. We use useLocation in Sidebar.jsx to check active links, and useNavigate in LoginPage.jsx to redirect users.",
    outcomeToCheck: "Check the URL bar info display on the demo board below. It displays the path segments parsed from the live browser location parameters in real-time."
  },
  {
    id: "async-await-react",
    title: "Async/Await in React",
    group: "Group 9 — API calls",
    summary: "Async/Await is a clean, readable syntax in JavaScript used to handle asynchronous operations and promises inside React hooks like useEffect.",
    howItWorks: "You cannot make the direct callback of useEffect async (e.g., useEffect(async () => {}) is invalid). Instead, you define an inner async function, execute it inside the effect, and await the data. This keeps the code clean compared to nesting multiple .then() blocks.",
    realLife: "Ordering coffee at a cafe. Instead of standing in a queue doing nothing while waiting for the barista (.then chain), you sit down and read a book, and only react when they call your order (await).",
    codeExample: `useEffect(() => {
  // Define inner async function
  async function loadData() {
    try {
      const response = await fetch("https://api.com/users");
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err.message);
    }
  }
  loadData();
}, []);`,
    howThisAppUsesIt: "We utilize async/await functions inside our API service files and demo screens to perform requests and catch network failures cleanly using try/catch.",
    outcomeToCheck: "Click the Trigger Async Fetch button below. Observe that the UI safely transitions from 'Loading' to displaying the user profile, catching any errors gracefully."
  },
  {
    id: "react-query",
    title: "React Query (TanStack Query)",
    group: "Group 9 — API calls",
    summary: "React Query is a powerful library that simplifies data fetching, caching, synchronization, and state management in React web applications.",
    howItWorks: "Instead of writing boilerplate useState and useEffect for loading, error, and caching, React Query handles it all with the useQuery hook. It caches fetched data so switching pages loads cached values instantly while updating in the background.",
    realLife: "A local newspaper delivery. Instead of you writing letters to the printing press every morning (fetch in useEffect), a delivery driver drops the fresh edition on your doorstep, relying on the central distribution office.",
    codeExample: `import { useQuery } from '@tanstack/react-query';

function UsersList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/users').then(res => res.json())
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred!</p>;

  return <ul>{data.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}`,
    howThisAppUsesIt: "We configure a QueryClientProvider wrapping our app, and run a query demonstration below fetching items from JSONPlaceholder showing cache status highlights.",
    outcomeToCheck: "Trigger the query fetch below. Switch topics and return here: notice that the table loads instantly from the cache while showing a subtle background sync indicator."
  },
  {
    id: "component-lifecycle",
    title: "Component Lifecycle",
    group: "Group 10 — React Lifecycle",
    summary: "The Component Lifecycle represents the phases a component goes through: Mounting (creation), Updating (props/state changes), and Unmounting (removal).",
    howItWorks: "React uses hooks to let you tap into these phases:\n1. Mount: useEffect with an empty array [] runs once when component is first added to the screen.\n2. Update: useEffect with variables [state] runs when dependencies change.\n3. Unmount: The return function of a useEffect runs before the component is destroyed, used for cleanups.",
    realLife: "A plant's life. Plant seed (Mount). Water and sun grow the leaves (Update). Clean up withered parts at the end of the season (Unmount).",
    codeExample: `useEffect(() => {
  console.log("Component Mounted!");

  return () => {
    console.log("Component Unmounting (Clean up)!");
  };
}, []); // Empty array limits this to Mount & Unmount`,
    howThisAppUsesIt: "Our topic page logs mount statements. The arrow-keys navigation listener is cleaned up when switching pages, executing unmount operations.",
    outcomeToCheck: "Toggle the sub-component in the logger demo box. Look at the printed event lists showing Mount, Update, and Unmount logs trigger in real-time."
  },
  {
    id: "react-memo",
    title: "React.memo",
    group: "Group 10 — React Lifecycle",
    summary: "React.memo is a performance optimization tool that prevents a functional child component from re-rendering if its props have not changed.",
    howItWorks: "By default, when a parent component re-renders, all of its children re-render. If a child renders the same HTML every time, this is wasteful. Wrapping the child in React.memo makes React skip rendering it if its input props are identical to the last render.",
    realLife: "A school homework grader. If you submit the exact same essay twice, the teacher doesn't waste time reading and grading it again; they just copy the grade from last week.",
    codeExample: `const ChildComp = React.memo(function ChildComp(props) {
  return <div>Username: {props.name}</div>;
}); // Only re-renders if props.name changes!`,
    howThisAppUsesIt: "Our TopicItem component in Sidebar.jsx is wrapped in React.memo. When you change topics, only the active and clicked items re-render; the remaining 20+ list items skip execution.",
    outcomeToCheck: "Click parent increment on the memo panel. You will see the normal child component's render count increase, while the memoized child component's render count stays frozen."
  },
  {
    id: "context-reducer",
    title: "Context + useReducer",
    group: "Group 11 — State Management",
    summary: "Context combined with useReducer allows you to create a global state store similar to Redux using React's built-in hooks.",
    howItWorks: "Instead of multiple useState hooks, you define a single state object and a reducer function that handles state updates based on dispatched actions. You pass the state and the dispatch function down the tree using Context Provider, giving any nested component access.",
    realLife: "A bank. Customers (components) cannot walk into the vault and change account balances. They must talk to a teller (dispatch) and request a transaction type (action), which the bank's processing system (reducer) executes.",
    codeExample: `const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': return { ...state, items: [...state.items, action.payload] };
    default: return state;
  }
}

// In parent:
const [state, dispatch] = useReducer(cartReducer, { items: [] });
<CartContext.Provider value={{ state, dispatch }}>...`,
    howThisAppUsesIt: "We provide a mock shopping cart demonstration below, where clicking items dispatches actions to add or remove items using Context + useReducer.",
    outcomeToCheck: "Add items to the shopping cart. You will see state objects update and dispatch actions logged in the history list."
  },
  {
    id: "redux-toolkit",
    title: "Redux Toolkit",
    group: "Group 11 — State Management",
    summary: "Redux Toolkit is the official, modern library used to manage complex global application state in React projects.",
    howItWorks: "It uses a central 'Store' to hold all state. You define 'slices' containing initial state and reducer functions. Components select state values with useSelector() and trigger updates by sending actions using useDispatch().",
    realLife: "A city post office. Instead of houses sending letters directly to each other, all mail goes to the central sorting office (Store) which routes and dispatches them.",
    codeExample: `import { createSlice, configureStore } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => { state.value += 1; }
  }
});

export const { increment } = counterSlice.actions;
export const store = configureStore({ reducer: counterSlice.reducer });`,
    howThisAppUsesIt: "We configured a standard Redux Slice inside this page's demo. Clicking buttons dispatches standard Redux actions to show how store variables are updated.",
    outcomeToCheck: "Click the Redux buttons on the demo panel. Inspect the state viewer showing the store updates triggered by the Redux dispatcher."
  },
  {
    id: "zustand",
    title: "Zustand",
    group: "Group 11 — State Management",
    summary: "Zustand is a lightweight, simple, and popular state management library for React that uses hooks to access global stores with minimal boilerplate.",
    howItWorks: "You create a store with a single function create that defines variables and actions. Then, you can import and use the returned hook directly in any component. No Providers, Context wrappers, or complex slices required.",
    realLife: "A whiteboard in a shared kitchen. Anyone can write on it or read from it directly without needing a formal request form or permission system.",
    codeExample: `import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 }))
}));

// Inside component:
const { count, increase } = useStore();`,
    howThisAppUsesIt: "We implement a Zustand global store on this demo page. Toggling count updates state values, demonstrating how simple global state is accessed.",
    outcomeToCheck: "Change state in the Zustand control panel. Notice that multiple independent cards on the page update immediately, without any Context provider setup."
  },
  {
    id: "controlled-forms",
    title: "Controlled Forms with useState",
    group: "Group 12 — Forms",
    summary: "Controlled Forms manage all form input elements in React by binding their values to useState state variables.",
    howItWorks: "Every time a character is typed, the onChange event triggers, updating state, which updates the input value. The React state acts as the 'single source of truth' for the inputs, making validation and submission simple.",
    realLife: "A diary. You record every thought you have in the diary immediately, and only say things that are written in the text lines.",
    codeExample: `const [formData, setFormData] = useState({ name: "" });

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

<input name="name" value={formData.name} onChange={handleChange} />`,
    howThisAppUsesIt: "We render a simple controlled contact form below that stores form inputs inside useState hook structures.",
    outcomeToCheck: "Type into the inputs. You will see character counts and local form state details printed in the state monitoring badge."
  },
  {
    id: "react-hook-form",
    title: "React Hook Form",
    group: "Group 12 — Forms",
    summary: "React Hook Form is a high-performance form management library that reduces component re-renders by using uncontrolled inputs under the hood.",
    howItWorks: "You register inputs to the hook using standard spread syntax register(). Instead of re-rendering on every keypress, inputs update the DOM directly, and validation only triggers when needed, drastically improving speed in complex forms.",
    realLife: "Filling out a physical paper application form. You write everything down quietly without talking, and only hand it to the receptionist to check when completely finished.",
    codeExample: `import { useForm } from 'react-hook-form';

function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email", { required: true })} />
      {errors.email && <span>Email is required!</span>}
      <button type="submit">Submit</button>
    </form>
  );
}`,
    howThisAppUsesIt: "We render a registration form managed by react-hook-form. We show that re-renders are suppressed until you click submit.",
    outcomeToCheck: "Fill out the fields. Note that the render counter does not go up as you type, but errors show up immediately when click submit with empty values."
  },
  {
    id: "form-validation",
    title: "Form Validation (Manual vs Schema)",
    group: "Group 12 — Forms",
    summary: "Form validation is the check process ensuring user inputs are valid. It can be done manually using if/else logic or systematically using schema validators like Zod.",
    howItWorks: "1. Manual: You write manual if/else checks for every input field and set custom error states.\n2. Schema: You define a structural blueprint (schema) using Zod or Yup. On submit, you pass the data to the schema, which validates it all at once and returns formatted error lists.",
    realLife: "Customs check. Manual is checking passengers by individually asking them 20 different questions. Schema is scanning their passport through a computer validation terminal.",
    codeExample: `import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email("Invalid email format"),
  age: z.number().min(18, "Must be at least 18")
});

const validate = (data) => {
  const result = userSchema.safeParse(data);
  return result.success ? {} : result.error.flatten().fieldErrors;
};`,
    howThisAppUsesIt: "We provide two identical forms below: Form A uses manual if/else checks, Form B uses Zod schema validation to enforce rules.",
    outcomeToCheck: "Submit both forms with invalid inputs. Note that the schema form formats and lists all validation errors in one structured block."
  },
  {
    id: "css-modules",
    title: "CSS Modules",
    group: "Group 13 — Styling Options",
    summary: "CSS Modules is a built-in feature in modern bundlers like Vite that keeps CSS classes local to a specific component by automatically hashing class names.",
    howItWorks: "You create a CSS file named Component.module.css. When you import it into React, it behaves like a JavaScript object containing key-value pairs of the classes. The compiler generates unique class names like Component_btn__3jh12, preventing styles from leaking.",
    realLife: "Renting a locker with a key. Only you can access the locker with your key, whereas a shared public closet allows anyone to mix up clothes.",
    codeExample: `/* Button.module.css */
.primaryBtn {
  background-color: blue;
  color: white;
}

// In Button.jsx:
import styles from './Button.module.css';
function Button() {
  return <button className={styles.primaryBtn}>Ok</button>;
}`,
    howThisAppUsesIt: "We style a custom card component on this page using a simulated CSS module pattern, displaying how class selectors look when compiled.",
    outcomeToCheck: "Look at the rendered card below. Inspect its class attribute: you will notice the generated unique hash structure."
  },
  {
    id: "tailwind-css",
    title: "Tailwind CSS",
    group: "Group 13 — Styling Options",
    summary: "Tailwind CSS is a utility-first CSS framework that lets you build layouts quickly by writing pre-defined class tokens directly in JSX elements.",
    howItWorks: "Instead of writing standard CSS declarations (like padding, color, borders), Tailwind provides single-purpose utility class names (like p-4, bg-blue-500, rounded-lg). It parses your files and generates a lightweight CSS bundle containing only classes you actually used.",
    realLife: "Using pre-packaged spice mixes. Instead of measuring out salt, pepper, cumin, and garlic powder separately, you open a taco seasoning packet (utility mix) and add it.",
    codeExample: `// Styling a modern card with Tailwind class utilities:
function Card() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm hover:scale-105 transition">
      <h2 className="text-xl font-bold text-gray-800">Title</h2>
      <p className="text-gray-600 mt-2">Card description goes here.</p>
    </div>
  );
}`,
    howThisAppUsesIt: "We showcase a custom card component styled using class names resembling Tailwind utilities, with a breakdown explaining class names.",
    outcomeToCheck: "View the card details below. Try toggling class names to see how the card layout changes dynamically based on utility tokens."
  },
  {
    id: "inline-styles",
    title: "Inline Styles in React",
    group: "Group 13 — Styling Options",
    summary: "Inline Styles let you style JSX elements dynamically by passing standard JavaScript style objects directly to the element's style attribute.",
    howItWorks: "Unlike HTML where inline styles are strings, React uses JS objects. Property names are camelCased (e.g. backgroundColor instead of background-color). Because style values are JS objects, you can use state variables to update layout styles dynamically.",
    realLife: "An chameleon changing color based on its environment in real-time.",
    codeExample: `function ColorBox() {
  const [color, setColor] = useState("red");
  
  return (
    <div style={{ backgroundColor: color, width: 100, height: 100 }}>
      Box
    </div>
  );
}`,
    howThisAppUsesIt: "We provide an interactive style builder below. Sliders modify state properties, which are passed directly to inline style elements.",
    outcomeToCheck: "Drag the sliders to adjust padding, margins, and borders. You will see the styled box update size and shape instantly."
  },
  {
    id: "lazy-suspense",
    title: "Lazy Loading with React.lazy + Suspense",
    group: "Group 14 — Performance & Build Tools",
    summary: "Lazy Loading is a technique that delays loading components until they are actually needed on the screen, using React.lazy and Suspense.",
    howItWorks: "By default, React bundle loader fetches all components at startup. React.lazy() lets you import components dynamically (e.g., when clicking a tab). You wrap lazy components inside <Suspense> which renders a fallback loader UI while the code chunk is downloaded in the background.",
    realLife: "A library. Instead of carrying all 10,000 books home in your backpack (heavy initial bundle), you request a specific book from the front desk (lazy load) only when you are ready to read it.",
    codeExample: `import React, { Suspense } from 'react';

const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading component bundle...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}`,
    howThisAppUsesIt: "We implement dynamic import bundles on this demo page. Clicking a trigger loads a sub-page component dynamically with a visible loading delay.",
    outcomeToCheck: "Click the 'Load Dynamic Chart' button. Observe that a loader spinner appears briefly while the code segment is requested and rendered."
  },
  {
    id: "code-splitting",
    title: "Code Splitting",
    group: "Group 14 — Performance & Build Tools",
    summary: "Code Splitting is the process of breaking your main JavaScript bundle into smaller, independent files (chunks) that can be loaded on demand.",
    howItWorks: "Modern bundlers (like Vite/Rollup) analyze your import tree. Dynamic imports (import()) trigger code splitting, creating separate .js` files. Instead of a single 2MB file, the client loads a small 100KB entry file and downloads extra chunks as they navigate.",
    realLife: "A multi-part series of books. Instead of printing and carrying a massive encyclopedia, the publisher prints 10 separate thin booklets, so you only carry volume 1.",
    codeExample: `// Vite automatic code splitting chunk mapping:
// dist/assets/index.js      (Main app core logic)
// dist/assets/AboutPage.js  (Split chunk, loaded only on /about)`,
    howThisAppUsesIt: "Our router configures lazy page routing for topics, generating split chunks loaded dynamically as users click links in the sidebar.",
    outcomeToCheck: "Observe the interactive bundler visualizer below showing how the application chunks are mapped, divided, and requested."
  },
  {
    id: "vite-vs-cra",
    title: "Vite vs Create React App (CRA)",
    group: "Group 14 — Performance & Build Tools",
    summary: "Vite is a modern, fast development tool replacing Create React App (CRA), which is now deprecated.",
    howItWorks: "CRA uses Webpack to bundle the entire project before launching the dev server (slow startup). Vite uses browser-native ES Modules to load files directly, and compiles assets instantly using ESBuild (fast startup). During build, Vite uses Rollup to optimize chunks.",
    realLife: "CRA is a translator who translates a whole book before reading it to you. Vite is a translator who reads the pages directly, translating words only as they appear on the screen.",
    codeExample: `// CRA config: package.json script runs "react-scripts start" (Webpack)
// Vite config: vite.config.js runs "vite" dev server (ES Modules)`,
    howThisAppUsesIt: "This React concepts application is built using Vite, starting up the local dev server and compiling JSX instantly on save.",
    outcomeToCheck: "Look at the project configuration files in your repository. You will see vite.config.js instead of complex CRA scripts or hidden Webpack loaders."
  },
  {
    id: "env-variables",
    title: "Environment Variables in React (.env files)",
    group: "Group 14 — Performance & Build Tools",
    summary: "Environment Variables allow you to store configuration constants (like API keys or endpoints) separate from your source code using .env files.",
    howItWorks: "You create a .env file at the project root. In Vite, environment variables must start with the prefix VITE_ (e.g. VITE_API_URL). Vite exposes them in code via the global import.meta.env.VITE_API_URL object, hiding values from version control.",
    realLife: "Sticking a label on your desk showing the password to your cabinet, rather than printing the password directly in the employee manual.",
    codeExample: `// .env file at root:
VITE_API_KEY=my-super-secret-key-123

// Inside React code:
const key = import.meta.env.VITE_API_KEY;`,
    howThisAppUsesIt: "We showcase how environment parameters are configured. A mock control panel displays env variables currently loaded.",
    outcomeToCheck: "View the environment variable dashboard below. It displays the app's current environment mode (e.g. development) and active port config."
  },
  {
    id: "folder-structure",
    title: "Folder Structure Best Practices",
    group: "Group 14 — Performance & Build Tools",
    summary: "Folder Structure organizes React codebases logically by dividing files by roles (components, hooks, pages, contexts, services) or features.",
    howItWorks: "Clean structures keep codes manageable. Common models are:\n1. Layer-based: separate directories for assets, components, hooks, pages.\n2. Feature-based: grouping all related styles, files, and tests into feature directories (e.g., features/user/).",
    realLife: "Sorting drawers in a kitchen. You place utensils in one drawer, towels in another, and spices in a cupboard, so you never search the whole house for a spoon.",
    codeExample: `src/
├── components/  (reusable UI layout items)
├── context/     (global context stores)
├── hooks/       (custom react hooks)
├── pages/       (routed view screens)
└── services/    (api calls, axios configurations)`,
    howThisAppUsesIt: "Our learning codebase follows layer-based guidelines. You can see folders for hooks, services, contexts, and pages grouped under src/.",
    outcomeToCheck: "Explore the directory explorer mock below. Select folders to view their contents and trace file relationship imports."
  },
  {
    id: "react-testing-library",
    title: "React Testing Library",
    group: "Group 15 — Testing",
    summary: "React Testing Library (RTL) is the standard testing library used to test user interactions and render output of React components.",
    howItWorks: "RTL focuses on testing behavior rather than implementation details. Instead of asserting state values directly, RTL checks what is visible on the screen (e.g., screen.getByText('Count: 1')) and triggers actions (e.g., fireEvent.click(button)).",
    realLife: "Driving test. The inspector checks if you can safely drive, park, and read road signs, rather than asking you to disassemble the engine.",
    codeExample: `import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('increments counter on click', () => {
  render(<Counter />);
  const button = screen.getByText('Count: 0');
  fireEvent.click(button);
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});`,
    howThisAppUsesIt: "We provide a mock RTL simulator below. You can see RTL test suites run against a counter button, outputting test passes.",
    outcomeToCheck: "Click the 'Run RTL Test' button. Watch the console simulation execute steps: render, locate element, fire click, assert value."
  },
  {
    id: "jest-testing",
    title: "Jest",
    group: "Group 15 — Testing",
    summary: "Jest is a JavaScript test runner and assertion framework that runs test suites and prints detailed terminal reports.",
    howItWorks: "Jest locates and runs test files (usually ending in .test.js). It provides helper structures like describe (to group tests), test/it (to write individual asserts), and matchers like expect().toBe() (to validate values).",
    realLife: "A quiz grading teacher. They run through the student test papers, assert correct options, mark items, and print a pass/fail sheet.",
    codeExample: `// A simple unit test in Jest:
const sum = (a, b) => a + b;

describe('Math utilities', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});`,
    howThisAppUsesIt: "We showcase how Jest runs assertions. The testing console below simulates Jest test suite executions.",
    outcomeToCheck: "Click the 'Run Jest Assertions' button. It runs mock calculations tests and prints green PASS checkmarks inside the terminal window."
  },
  {
    id: "unit-testing",
    title: "Writing Unit Tests",
    group: "Group 15 — Testing",
    summary: "Unit Testing is the practice of testing individual functions, utilities, or isolated component elements in isolation.",
    howItWorks: "You isolate the function or component. You provide mock inputs (props) and assert that the output matches the expected outcome without invoking external databases, APIs, or parent container logic.",
    realLife: "Quality checking individual LEGO blocks before assembling a house, confirming that each wheel is round and rotates on its axle.",
    codeExample: `// Testing a stateless presentational component:
test('renders welcome greeting', () => {
  render(<Welcome name="Dave" />);
  expect(screen.getByText('Hello, Dave')).toBeInTheDocument();
});`,
    howThisAppUsesIt: "We simulate running unit tests for a custom badge button, verifying prop displays work independently of click handlers.",
    outcomeToCheck: "Trigger the unit test simulation. You will see test blocks verify properties one by one in isolated boxes."
  },
  {
    id: "integration-testing",
    title: "Writing Integration Tests",
    group: "Group 15 — Testing",
    summary: "Integration Testing checks that multiple components, hooks, or service layers work together harmoniously as a unified workflow.",
    howItWorks: "Instead of rendering a single child element, you render a group of connected components (or the entire page layout). You simulate a complete user workflow (e.g., filling out forms, sending api requests, displaying success modals) to verify the integration.",
    realLife: "Testing a car after assembly. You sit in the seat, turn the key, step on the gas, and verify that the fuel line feeds the engine and rotates the wheels.",
    codeExample: `test('submits contact form and views success popup', async () => {
  render(<ContactPanel />);
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Alex' } });
  fireEvent.click(screen.getByText('Submit'));
  expect(await screen.findByText('Thanks, Alex!')).toBeInTheDocument();
});`,
    howThisAppUsesIt: "We simulate integration tests for our private notes creation workflow: typing a note and clicking submit updates lists.",
    outcomeToCheck: "Run the integration test simulation. Watch the step-by-step progress logging form entries and checking output results."
  },
  {
    id: "error-boundaries",
    title: "Error Boundaries",
    group: "Group 16 — Advanced React",
    summary: "Error Boundaries are React components that catch JavaScript errors anywhere in their child component tree and display a fallback UI instead of crashing the app.",
    howItWorks: "Error boundaries must be Class components because they use the lifecycle hooks getDerivedStateFromError (to update state and show fallback UI) and componentDidCatch (to log errors). They wrap components to catch rendering crashes.",
    realLife: "A circuit breaker in your basement. If a toaster short-circuits, the breaker trips to cut off power to that single outlet, preventing the whole house from losing electricity.",
    codeExample: `class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Caught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong.</h2>;
    }
    return this.props.children;
  }
}`,
    howThisAppUsesIt: "We provide an ErrorBoundary wrapper. Clicking the 'Break Component' button simulates a render crash, showing the fallback panel.",
    outcomeToCheck: "Click the trigger crash button. Notice that only that specific card turns into an error fallback UI; the sidebar and header stay functional!"
  },
  {
    id: "portals",
    title: "Portals",
    group: "Group 16 — Advanced React",
    summary: "Portals let you render a component outside of its parent HTML DOM element hierarchy, placing it in a different DOM node.",
    howItWorks: "You use ReactDOM.createPortal(child, containerNode). Even though the component sits inside a parent component's JSX structure (inheriting props/state contexts), its physical HTML tag mounts in the specified container (like document.body), preventing styling issues.",
    realLife: "A projection screen. The projector sits inside a classroom, but the image is projected onto the outer wall of the building across the street.",
    codeExample: `import ReactDOM from 'react-dom';

function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;
  
  return ReactDOM.createPortal(
    <div className="modal-box">
      <p>I am rendered at the root body tag!</p>
      <button onClick={onClose}>Close</button>
    </div>,
    document.body // Target container outside root div
  );
}`,
    howThisAppUsesIt: "We use Portals below to display a modal popup. Opening it appends the tag to the HTML body, avoiding dashboard styling constraints.",
    outcomeToCheck: "Open the modal popup. Inspect the modal element with DevTools. You will find its HTML nested under body, not our main dashboard container."
  },
  {
    id: "forward-refs",
    title: "Forwarding Refs (forwardRef)",
    group: "Group 16 — Advanced React",
    summary: "Forwarding Refs (forwardRef) is a technique that lets parent components pass a ref down to a child component's native HTML elements.",
    howItWorks: "Normally, child refs cannot be accessed by parents because refs are not passed down like normal props. By wrapping a child in React.forwardRef((props, ref) => {}), the child accepts a ref argument and attaches it to its inner DOM tag.",
    realLife: "A receptionist passing a phone call directly to a doctor's desk phone, rather than talking to you and relaying message responses.",
    codeExample: `import React, { forwardRef } from 'react';

// Child component wrapped in forwardRef:
const CustomInput = forwardRef((props, ref) => {
  return <input ref={ref} className="special-input" />;
});

// Parent focuses child input:
function Parent() {
  const inputRef = useRef(null);
  const click = () => inputRef.current.focus();

  return (
    <>
      <CustomInput ref={inputRef} />
      <button onClick={click}>Focus Child</button>
    </>
  );
}`,
    howThisAppUsesIt: "We provide a forwarded input demo below. Clicking the Focus button in the parent card directs focus into the child component's input field.",
    outcomeToCheck: "Click the focus trigger button. You will see focus highlight the custom child input element directly."
  },
  {
    id: "ssr-basics",
    title: "Server Side Rendering (SSR) Basics",
    group: "Group 16 — Advanced React",
    summary: "Server Side Rendering (SSR) builds the HTML page on the server for each request, rather than sending a blank page and building it in the client.",
    howItWorks: "In Client-Side Rendering (CSR, like Vite), the server sends a blank HTML page and a big JS bundle. The browser downloads the JS and then draws the page. In SSR, the server parses the React tree, generates the complete HTML, and sends it to the browser. The browser displays HTML instantly and then loads JS (hydration) to make it interactive.",
    realLife: "CSR is ordering a box of uncooked ingredients with a recipe card to cook dinner yourself. SSR is ordering a hot, fully cooked meal delivered to your table.",
    codeExample: `// Client Side Rendering (CSR) HTML:
// <div id="root"></div> <script src="bundle.js"></script>

// Server Side Rendering (SSR) HTML:
// <div id="root"><h1>Hello World</h1><p>Welcome</p></div>`,
    howThisAppUsesIt: "We show a visual step-by-step loading simulator comparing CSR and SSR load steps.",
    outcomeToCheck: "Click 'Start Loading Simulation' below. Note the speed differences in viewing content between Client-Side and Server-Side rendering."
  },
  {
    id: "why-nextjs",
    title: "What is Next.js & Why it exists",
    group: "Group 17 — Next.js Basics",
    summary: "Next.js is a React framework that adds features like Server Side Rendering, static site generation, image optimization, and file-based routing to React apps.",
    howItWorks: "Standard React is built for client-side SPAs. However, this causes poor SEO (search engines read blank HTML) and slow initial loads. Next.js solves this by running React on both the server and client. It generates static or dynamic HTML pages server-side, providing SEO benefits out-of-the-box.",
    realLife: "Adding a professional kitchen and delivery truck to a grocery store, transforming it from a place where you buy raw ingredients to a restaurant.",
    codeExample: `// Next.js features:
// 1. File-based routing (pages/app directories)
// 2. Hybrid SSR & SSG rendering models
// 3. API routes (writing backend APIs in React)
// 4. Built-in Image optimization component`,
    howThisAppUsesIt: "We provide an intro dashboard summarizing the React vs Next.js features list and technical design options.",
    outcomeToCheck: "Read the Next.js vs React feature grid below to understand when and why you should migrate a standard React app to Next.js."
  },
  {
    id: "file-routing",
    title: "File-Based Routing",
    group: "Group 17 — Next.js Basics",
    summary: "File-Based Routing is a system where the directory folder structure of your code automatically defines the URL routes of your application.",
    howItWorks: "Instead of writing route configurations in JS (like <Route path='/about'>), Next.js looks at your file directory structure. In the App Router, files named page.js inside folders generate routes automatically:\n- app/page.js -> / (Home)\n- app/about/page.js -> /about (About page)\n- app/blog/[id]/page.js -> /blog/123 (Dynamic route).",
    realLife: "A library filing system. Files are sorted into cabinets labeled 'History', 'Sci-Fi', etc. Walking to cabinet 3 folder A is like navigating /scifi/alien URL.",
    codeExample: `// Next.js directory layout mapping:
app/
├── page.js           (URL: /)
├── about/
│   └── page.js       (URL: /about)
└── products/
    └── [id]/
        └── page.js   (URL: /products/:id)`,
    howThisAppUsesIt: "We present an interactive project tree explorer below demonstrating how folder hierarchies correspond to URL routing endpoints.",
    outcomeToCheck: "Click folders in the explorer. Observe the dynamic URL bar updates showing what URL path each file generates in Next.js."
  },
  {
    id: "server-vs-client-components",
    title: "Server Components vs Client Components",
    group: "Group 17 — Next.js Basics",
    summary: "Next.js separates components into Server Components (rendered on the server) and Client Components (rendered in the browser, marked with 'use client').",
    howItWorks: "1. Server Components: The default component type. They run only on the server, can access databases directly, and send 0 bytes of JS to the browser, making page loads fast.\n2. Client Components: Marked with 'use client' at the top. They load Javascript in the browser, allowing you to use hooks (useState, useEffect) and interactive click events.",
    realLife: "Server component is a chef in the kitchen baking pizza (browser only gets final food). Client component is a tabletop hot pot where you cook ingredients yourself at the table.",
    codeExample: `// 1. Server Component (Default):
async function UserProfile() {
  const users = await db.query("SELECT * FROM users"); // Direct database!
  return <h1>Users: {users.length}</h1>;
}

// 2. Client Component (interactive):
"use client";
import { useState } from 'react';
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}`,
    howThisAppUsesIt: "We provide a simulator comparing how client and server components interact and process data queries on the screen.",
    outcomeToCheck: "Inspect the side-by-side component representations. Notice how Server Components reduce client JS size to zero."
  },
  {
    id: "ssr-ssg-data-fetching",
    title: "getServerSideProps vs getStaticProps",
    group: "Group 17 — Next.js Basics",
    summary: "These are data fetching methods in Next.js (Pages Router) used to request page data at request time (SSR) or build time (SSG).",
    howItWorks: "1. getServerSideProps runs on every request. Ideal for user dashboards or news feeds where data updates constantly.\n2. getStaticProps runs once during build. It generates HTML pages that are cached globally, making them load instantly. Ideal for blogs or documentation sites.",
    realLife: "getServerSideProps is a waiter fetching a fresh glass of orange juice for you. getStaticProps is purchasing a pre-bottled soda from a grocery store shelf.",
    codeExample: `// Runs on EVERY request (SSR):
export async function getServerSideProps() {
  const data = await fetch("https://api/news");
  return { props: { news: data } };
}

// Runs ONCE during build (SSG):
export async function getStaticProps() {
  const data = await fetch("https://api/doc");
  return { props: { doc: data } };
}`,
    howThisAppUsesIt: "We present a live query timing simulator demonstrating request latency differences between SSG and SSR models.",
    outcomeToCheck: "Trigger the simulations below. Observe that the Static (SSG) page renders instantly (0ms fetch), while Server (SSR) has a request delay."
  },
  {
    id: "api-routes",
    title: "API Routes",
    group: "Group 17 — Next.js Basics",
    summary: "API Routes allow you to build backend API endpoints directly inside your Next.js application without a separate server.",
    howItWorks: "You create route handlers inside the app/api/ folder (or pages/api/ folder). Next.js automatically maps these files to API URLs. Inside them, you write NodeJS functions that take requests and return JSON responses.",
    realLife: "A drive-thru window on the side of a restaurant building. You drive up, place your order, and retrieve your food directly from the kitchen staff.",
    codeExample: `// File: app/api/user/route.js:
export async function GET(request) {
  const data = { id: 1, name: "David" };
  return Response.json(data);
}

// File: app/page.js:
const res = await fetch("/api/user");`,
    howThisAppUsesIt: "We render an interactive console representing an API handler. Submitting names sends mock payloads to show API responses.",
    outcomeToCheck: "Type your name and click test endpoint. View the mock JSON response generated by the simulated Next.js serverless route handler."
  },
  {
    id: "image-optimization",
    title: "Image Optimization",
    group: "Group 17 — Next.js Basics",
    summary: "Next.js provides an Image component (<Image />) that automatically optimizes dimensions, quality format, and lazy loads images.",
    howItWorks: "Standard <img> tags load original heavy files and cause layout shifts as they load. The Next.js <Image /> component automatically compresses images, converts them to modern formats (like WebP), resizes them based on screen size, and lazy loads them.",
    realLife: "A tailor resizing a large blanket into a custom fitted sweater before you leave the house, making it easier to carry in your bag.",
    codeExample: `import Image from 'next/image';

function Banner() {
  return (
    <Image 
      src="/hero.png" 
      alt="Hero banner" 
      width={500} 
      height={300} 
      priority // Loads immediately without delay
    />
  );
}`,
    howThisAppUsesIt: "We show a sliding comparison panel showing loading speed and pixel optimization difference between optimized and unoptimized images.",
    outcomeToCheck: "Move the slider below. Notice that the optimized image loading is smooth and significantly smaller in bytes weight than raw tags."
  },
  {
    id: "vercel-deployment",
    title: "Deployment on Vercel",
    group: "Group 17 — Next.js Basics",
    summary: "Vercel is the cloud platform created by the developers of Next.js, built to host and deploy Next.js apps with zero configuration.",
    howItWorks: "Vercel integrates directly with GitHub. When you push changes to your repository, Vercel automatically detects the Next.js framework, runs the build commands, deploys serverless API functions, and publishes the site to a global CDN.",
    realLife: "An automatic publishing press. Every time you write a new chapter in your book and save it (git push), the printing company automatically prints, binds, and delivers the books to bookshops.",
    codeExample: `// Vercel CLI standard deployment:
// npm install -g vercel
// vercel login
// vercel (runs build and deploys project automatically)`,
    howThisAppUsesIt: "We provide a visual simulation representing Vercel's automated git-push to live-hosting pipeline steps.",
    outcomeToCheck: "Click the mock 'Trigger Push' button. Observe the step logs showing code compile, serverless function bindings, and deployment generation."
  }
];
