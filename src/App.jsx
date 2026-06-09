import React, { useState, useMemo, useCallback, useContext } from "react";
import { Routes, Route, Navigate, useNavigate, Outlet, useLocation } from "react-router-dom";
import { topics } from "./data/topics";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { ThemeContext } from "./context/ThemeContext";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TopicPage from "./components/TopicPage";
import LoginPage from "./pages/LoginPage";
import NotesPage from "./pages/NotesPage";
import PrivateRoute from "./components/PrivateRoute";

// ============================================================================
// MAIN LAYOUT COMPONENT
// ============================================================================
// It defines the persistent frame (Header & Sidebar) and mounts child routes in the Outlet.
function DashboardLayout({ filteredTopics, onTopicSelect, isLoggedIn, onLoginToggle, searchQuery, setSearchQuery }) {
  const { theme } = useContext(ThemeContext);

  return (
    // Apply global dark or light theme class based on ThemeContext
    <div className={`app-container ${theme}-theme`}>
      {/* Persistent Header */}
      <Header 
        onSearchChange={setSearchQuery} 
        isLoggedIn={isLoggedIn} 
        onLoginToggle={onLoginToggle} 
      />

      <div className="app-body">
        {/* Persistent Sidebar (memoized, won't re-render on page switches) */}
        <Sidebar 
          topics={filteredTopics} 
          onTopicSelect={onTopicSelect} 
        />

        {/* Dynamic content viewport */}
        <main className="main-content">
          <div className="content-container">
            {/* Swapped sub-pages render here */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

// ============================================================================
// APP ENTRY POINT COMPONENT
// ============================================================================
export function App() {
  const navigate = useNavigate();

  // 1. Persistent User authentication state (saved in localStorage)
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("student_logged_in") === "true";
  });

  // useCallback ensures handleLoginToggle is the same function reference between renders,
  // so Header (wrapped in React.memo) won't re-render just because App re-rendered.
  const handleLoginToggle = useCallback(() => {
    const nextLoginState = !isLoggedIn;
    setIsLoggedIn(nextLoginState);
    localStorage.setItem("student_logged_in", String(nextLoginState));
  }, [isLoggedIn]);

  // 2. Persistent last visited topic (loads from our custom useLocalStorage hook)
  // Defaults to "reconciliation" if no previous page was visited
  const [lastVisitedTopic, setLastVisitedTopic] = useLocalStorage("last_topic_id", "reconciliation");

  // 3. Search query state (propagated from Header and used to filter Sidebar)
  const [searchQuery, setSearchQuery] = useState("");

  // 4. Memoized topic selection click callback (child-parent interaction)
  // Wrapping this in useCallback ensures the Sidebar (wrapped in React.memo)
  // does not re-render every time the URL path changes!
  const handleTopicSelect = useCallback((topicId) => {
    // If it's a real topic ID, update our last-read storage tracker
    if (topicId !== "notes" && topicId !== "login") {
      setLastVisitedTopic(topicId);
    }
  }, [setLastVisitedTopic]);

  // 5. useMemo to optimize sidebar filtering
  // This loop only executes when searchQuery or the static topics array changes,
  // preventing calculation runs on theme switches or page clicks.
  const filteredTopics = useMemo(() => {
    console.log("useMemo: Filtering topics list based on query: ", searchQuery);
    
    return topics.filter((topic) => {
      const titleMatch = topic.title.toLowerCase().includes(searchQuery.toLowerCase());
      const summaryMatch = topic.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return titleMatch || summaryMatch;
    });
  }, [searchQuery]);

  return (
    <Routes>
      {/* We nest all paths inside our DashboardLayout */}
      <Route 
        path="/" 
        element={
          <DashboardLayout 
            filteredTopics={filteredTopics}
            onTopicSelect={handleTopicSelect}
            isLoggedIn={isLoggedIn}
            onLoginToggle={handleLoginToggle}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        }
      >
        {/* When user hits exactly "/", redirect to the last visited topic */}
        <Route index element={<Navigate to={`/topic/${lastVisitedTopic}`} replace />} />
        
        {/* Public dynamic topic route */}
        <Route path="topic/:id" element={<TopicPage />} />

        {/* Public login page */}
        <Route 
          path="login" 
          element={
            <LoginPage 
              isLoggedIn={isLoggedIn} 
              onLoginToggle={handleLoginToggle} 
            />
          } 
        />

        {/* Protected private route block */}
        <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
          <Route path="notes" element={<NotesPage />} />
        </Route>
        
        {/* Fallback route for unknown paths redirects to index */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
