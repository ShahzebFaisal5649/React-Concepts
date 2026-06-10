import React, { useRef, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { topics } from "../data/topics";

// Import all interactive demo components from our pages/topics directory
import {
  ReconciliationDemo,
  VirtualDomDemo,
  SpaDemo,
  WhyReactDemo
} from "../pages/topics/Group1Fundamentals";
import {
  ComponentsDemo,
  HocDemo,
  StatelessStatefulDemo,
  StyledComponentsDemo,
  JsxJsSyntaxDemo,
  JsxJsDifferenceDemo,
  ConditionalRenderingDemo,
  ListsKeysDemo,
  ReactFragmentsDemo
} from "../pages/topics/Group2Components";
import {
  ParentChildDemo,
  WhatIsStateDemo,
  WhatIsPropsDemo,
  LiftingStateUpDemo,
  ControlledVsUncontrolledDemo
} from "../pages/topics/Group3DataFlow";
import {
  WhatIsHookDemo,
  TypesOfHooksDemo,
  UseStateDemo,
  UseEffectDemo,
  UseRefDemo,
  UseCallbackDemo,
  UseMemoDemo,
  UseContextDemo
} from "../pages/topics/Group4Hooks";
import {
  LocalStorageDemo,
  SessionStorageDemo,
  CookieStorageDemo,
  StorageDifferencesDemo
} from "../pages/topics/Group5Storage";
import {
  ReactRouterDemo,
  RoutesPublicPrivateDemo,
  LinkVsNavLinkDemo,
  ReactRouterHooksDemo
} from "../pages/topics/Group6Routing";
import {
  DashboardLayoutDemo
} from "../pages/topics/Group7Layout";
import {
  PreloadDemo,
  PrefetchDemo,
  PreflightRequestDemo,
  PreloadPrefetchPreflightDiffDemo
} from "../pages/topics/Group8Performance";
import {
  FetchApiDemo,
  AxiosApiDemo,
  AxiosVsFetchDemo,
  AxiosFetchPreflightDemo,
  AsyncAwaitDemo,
  ReactQueryDemo
} from "../pages/topics/Group9ApiCalls";
import {
  ComponentLifecycleDemo,
  ReactMemoDemo
} from "../pages/topics/Group10Lifecycle";
import {
  ContextReducerDemo,
  ReduxToolkitDemo,
  ZustandDemo
} from "../pages/topics/Group11StateManagement";
import {
  ControlledFormsDemo,
  ReactHookFormDemo,
  FormValidationDemo
} from "../pages/topics/Group12Forms";
import {
  CssModulesDemo,
  TailwindCssDemo,
  InlineStylesDemo
} from "../pages/topics/Group13StylingOptions";
import {
  LazySuspenseDemo,
  CodeSplittingDemo,
  ViteVsCraDemo,
  EnvVariablesDemo,
  FolderStructureDemo
} from "../pages/topics/Group14PerformanceBuild";
import {
  ReactTestingLibraryDemo,
  JestDemo,
  UnitTestingDemo,
  IntegrationTestingDemo
} from "../pages/topics/Group15Testing";
import {
  ErrorBoundaryDemo,
  PortalsDemo,
  ForwardRefsDemo,
  SsrBasicsDemo
} from "../pages/topics/Group16AdvancedReact";
import {
  WhyNextjsDemo,
  FileRoutingDemo,
  ServerVsClientComponentsDemo,
  SsrSsgDataFetchingDemo,
  ApiRoutesDemo,
  ImageOptimizationDemo,
  VercelDeploymentDemo
} from "../pages/topics/Group17NextjsBasics";

// Map each topic ID to its corresponding interactive demo component
const DEMO_MAP = {
  // Group 1
  "reconciliation": ReconciliationDemo,
  "virtual-vs-real-dom": VirtualDomDemo,
  "spa": SpaDemo,
  "why-react": WhyReactDemo,
  // Group 2
  "react-components": ComponentsDemo,
  "hoc-vs-lower": HocDemo,
  "stateless-vs-stateful": StatelessStatefulDemo,
  "styled-components": StyledComponentsDemo,
  "jsx-vs-js-syntax": JsxJsSyntaxDemo,
  "jsx-vs-js-difference": JsxJsDifferenceDemo,
  "conditional-rendering": ConditionalRenderingDemo,
  "lists-keys": ListsKeysDemo,
  "react-fragments": ReactFragmentsDemo,
  // Group 3
  "communication-parent-child": ParentChildDemo,
  "what-is-state": WhatIsStateDemo,
  "what-is-props": WhatIsPropsDemo,
  "lifting-state-up": LiftingStateUpDemo,
  "controlled-vs-uncontrolled": ControlledVsUncontrolledDemo,
  // Group 4
  "what-is-hook": WhatIsHookDemo,
  "types-of-hooks": TypesOfHooksDemo,
  "usestate-hook": UseStateDemo,
  "useeffect-hook": UseEffectDemo,
  "useref-hook": UseRefDemo,
  "usecallback-hook": UseCallbackDemo,
  "usememo-hook": UseMemoDemo,
  "usecontext-hook": UseContextDemo,
  // Group 5
  "localstorage": LocalStorageDemo,
  "sessionstorage": SessionStorageDemo,
  "cookie-storage": CookieStorageDemo,
  "storage-differences": StorageDifferencesDemo,
  // Group 6
  "react-router-dom": ReactRouterDemo,
  "routes-public-private": RoutesPublicPrivateDemo,
  "link-vs-navlink": LinkVsNavLinkDemo,
  "react-router-hooks": ReactRouterHooksDemo,
  // Group 7
  "dashboard-layout": DashboardLayoutDemo,
  // Group 8
  "preload": PreloadDemo,
  "prefetch": PrefetchDemo,
  "preflight-request": PreflightRequestDemo,
  "preload-prefetch-preflight-diff": PreloadPrefetchPreflightDiffDemo,
  // Group 9
  "fetch-api": FetchApiDemo,
  "axios-api": AxiosApiDemo,
  "axios-vs-fetch": AxiosVsFetchDemo,
  "axios-fetch-preflight": AxiosFetchPreflightDemo,
  "async-await-react": AsyncAwaitDemo,
  "react-query": ReactQueryDemo,
  // Group 10
  "component-lifecycle": ComponentLifecycleDemo,
  "react-memo": ReactMemoDemo,
  // Group 11
  "context-reducer": ContextReducerDemo,
  "redux-toolkit": ReduxToolkitDemo,
  "zustand": ZustandDemo,
  // Group 12
  "controlled-forms": ControlledFormsDemo,
  "react-hook-form": ReactHookFormDemo,
  "form-validation": FormValidationDemo,
  // Group 13
  "css-modules": CssModulesDemo,
  "tailwind-css": TailwindCssDemo,
  "inline-styles": InlineStylesDemo,
  // Group 14
  "lazy-suspense": LazySuspenseDemo,
  "code-splitting": CodeSplittingDemo,
  "vite-vs-cra": ViteVsCraDemo,
  "env-variables": EnvVariablesDemo,
  "folder-structure": FolderStructureDemo,
  // Group 15
  "react-testing-library": ReactTestingLibraryDemo,
  "jest-testing": JestDemo,
  "unit-testing": UnitTestingDemo,
  "integration-testing": IntegrationTestingDemo,
  // Group 16
  "error-boundaries": ErrorBoundaryDemo,
  "portals": PortalsDemo,
  "forward-refs": ForwardRefsDemo,
  "ssr-basics": SsrBasicsDemo,
  // Group 17
  "why-nextjs": WhyNextjsDemo,
  "file-routing": FileRoutingDemo,
  "server-vs-client-components": ServerVsClientComponentsDemo,
  "ssr-ssg-data-fetching": SsrSsgDataFetchingDemo,
  "api-routes": ApiRoutesDemo,
  "image-optimization": ImageOptimizationDemo,
  "vercel-deployment": VercelDeploymentDemo
};

// ============================================================================
// HIGHER ORDER COMPONENT (HOC)
// ============================================================================
// A Higher Order Component is a function that wraps a component and returns a new one.
// We wrap our main TopicPage with this withLogger function.
function withLogger(WrappedComponent) {
  return function LoggedComponent(props) {
    // This logs inside the browser console whenever the wrapped page mounts.
    useEffect(() => {
      console.log(`[HOC Log] Topic content wrapped with withLogger HOC has mounted!`);
    }, []); // Runs only when component first mounts

    // Return the original component, passing all props through
    return <WrappedComponent {...props} />;
  };
}

// ============================================================================
// MAIN TOPIC PAGE COMPONENT
// ============================================================================
function RawTopicPage() {
  // Get the id parameter from the URL (e.g. /topic/usestate -> id is "usestate")
  const { id } = useParams();

  // Find the details for this specific topic from our database
  const topic = topics.find((t) => t.id === id);

  // 1. Ref to track the previous topic we were reading.
  // Unlike state, changing a ref does NOT cause the page to re-render.
  const prevTopicRef = useRef(null);
  
  // 2. State to hold the name of the previous topic so we can render it.
  const [prevTopicTitle, setPrevTopicTitle] = useState(null);

  // Whenever the active topic changes (the URL id parameter changes)
  useEffect(() => {
    // If we have a saved topic in our ref box, that was the PREVIOUS topic!
    if (prevTopicRef.current) {
      setPrevTopicTitle(prevTopicRef.current.title);
    }
    
    // Save the current topic into the ref box.
    // Next time the user clicks a different topic, this will become the previous one!
    prevTopicRef.current = topic;
  }, [id, topic]); // Dependency array: run this code when 'id' or 'topic' changes

  // If the URL topic ID doesn't exist in our data array
  if (!topic) {
    return (
      <div className="error-panel">
        <h2>⚠️ Topic Not Found</h2>
        <p>We couldn't find a topic with ID: "{id}". Use the sidebar to choose a valid topic.</p>
        <Link to="/" className="home-link">Go back to home</Link>
      </div>
    );
  }

  // Retrieve the matching live demo component if we have one defined
  const DemoComponent = DEMO_MAP[topic.id];

  return (
    <div className="topic-page-content">
      {/* Group Header */}
      <span className="topic-group-badge">{topic.group}</span>
      
      {/* Title */}
      <h2>{topic.title}</h2>

      {/* Sections 1–3 grouped with React.Fragment — no extra wrapper div in DOM */}
      <React.Fragment>
        {/* 1. Quick Summary Section */}
        <div className="topic-section summary-box">
          <h3>💡 Quick Summary</h3>
          <p>{topic.summary}</p>
        </div>

        {/* 2. How it works Section */}
        <div className="topic-section">
          <h3>🔍 How It Works</h3>
          <div className="explain-text">
            {topic.howItWorks.split("\n").map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>
        </div>

        {/* 3. Real Life Example Section */}
        <div className="topic-section analogy-box">
          <h3>🏢 Real-Life Analogy</h3>
          <p>{topic.realLife}</p>
        </div>
      </React.Fragment>

      {/* 4. Code Example Section */}
      <div className="topic-section">
        <h3>💻 Simple Code Example</h3>
        <pre className="code-block">
          <code>{topic.codeExample}</code>
        </pre>
      </div>

      {/* 5. How this app uses it Section */}
      <div className="topic-section app-usage-box">
        <h3>🛠️ How This App Uses It</h3>
        <p>{topic.howThisAppUsesIt}</p>
      </div>

      {/* 6. What to check / outcome Section */}
      <div className="topic-section outcome-box">
        <h3>🎯 What to Check / Expected Outcome</h3>
        <p>{topic.outcomeToCheck}</p>
      </div>

      {/* Interactive Demonstration Area */}
      {DemoComponent && (
        <div className="topic-section demo-panel">
          <h3>🎮 Live Interactive Demonstration</h3>
          <div className="demo-content">
            <DemoComponent />
          </div>
        </div>
      )}

      {/* Previous Topic Info Box using useRef */}
      {prevTopicTitle && (
        <div className="prev-read-footer">
          📖 You were just reading: <span className="prev-topic-link">{prevTopicTitle}</span>
        </div>
      )}
    </div>
  );
}

// Wrap the RawTopicPage with the HOC logger before exporting it
const TopicPage = withLogger(RawTopicPage);
export default TopicPage;
