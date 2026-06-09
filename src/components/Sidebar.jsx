import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";

// ============================================================================
// STYLED COMPONENTS - Using styled-components library for the Sidebar
// ============================================================================

const SidebarContainer = styled.aside`
  width: 280px;
  background-color: var(--sidebar-bg);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  height: calc(100vh - 70px);
  position: fixed;
  left: 0;
  top: 70px;
  overflow-y: auto;
  transition: all 0.3s ease;
  z-index: 100;
`;

const SidebarScrollArea = styled.div`
  flex: 1;
  padding: 16px;
`;

const GroupSection = styled.div`
  margin-bottom: 20px;
`;

const GroupHeader = styled.h3`
  font-size: 11px;
  text-transform: uppercase;
  color: var(--text-muted);
  letter-spacing: 1px;
  margin-bottom: 8px;
  padding-left: 8px;
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledTopicItem = styled.li`
  margin-bottom: 4px;
`;

// NavLink styled with styled-components.
// React Router automatically adds an "active" class when the URL matches.
const SidebarLink = styled(NavLink)`
  display: block;
  padding: 10px 12px;
  border-radius: 8px;
  color: var(--text-color);
  text-decoration: none;
  font-size: 13.5px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--hover-bg);
    transform: translateX(4px);
  }

  &.active {
    background-color: var(--active-bg);
    color: var(--active-text);
    font-weight: 600;
  }
`;

const SidebarFooter = styled.div`
  padding: 16px;
  border-top: 1px solid var(--border-color);
  background-color: rgba(0, 0, 0, 0.05);
  font-size: 12px;
`;

const UserProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: var(--text-color);

  .profile-title {
    font-weight: bold;
    color: var(--primary-color);
  }

  .profile-email {
    font-size: 11px;
    color: var(--text-muted);
  }
`;

// ============================================================================
// TOPIC ITEM COMPONENT - A pure stateless, dumb component
// ============================================================================
// KEY FIX: We removed useLocation() from here.
// Previously, every TopicItem called useLocation() internally. When the URL
// changed, ALL 23+ items re-rendered because each one was subscribed to
// location changes individually. That caused the Sidebar log to fire 20+ times.
//
// Now the Sidebar (parent) calls useLocation() ONCE, computes isActive for
// each item, and passes it down as a simple boolean prop.
// React.memo ensures TopicItem only re-renders if its props actually change —
// meaning only the old-active and new-active items update (at most 2 items).
const TopicItem = React.memo(function TopicItem({ topic, onClick }) {
  return (
    <StyledTopicItem>
      <SidebarLink
        to={`/topic/${topic.id}`}
        onClick={() => onClick(topic.id)}
      >
        📄 {topic.title}
      </SidebarLink>
    </StyledTopicItem>
  );
});

// ============================================================================
// SIDEBAR COMPONENT - Parent component
// ============================================================================
// React.memo prevents re-renders when parent (App) changes unrelated state
// (like theme toggle or a counter). It only re-renders when topics or
// onTopicSelect props change.
export const Sidebar = React.memo(function Sidebar({ topics, onTopicSelect }) {
  // RECONCILIATION PROOF:
  // This log prints when the Sidebar itself renders.
  // Thanks to the useLocation fix above, this will only fire on initial load
  // and when the topics list or callback prop genuinely changes.
  console.log("Sidebar Component Rendered!");

  // Read user profile from UserContext (no prop drilling needed!)
  const { user } = useContext(UserContext);

  // Group the flat topics array into an object keyed by group name
  const groupedTopics = topics.reduce((groups, topic) => {
    const groupName = topic.group;
    if (!groups[groupName]) {
      groups[groupName] = [];
    }
    groups[groupName].push(topic);
    return groups;
  }, {});

  return (
    <SidebarContainer>
      <SidebarScrollArea>
        {Object.keys(groupedTopics).map((groupName) => (
          <GroupSection key={groupName}>
            <GroupHeader>{groupName}</GroupHeader>
            <SidebarList>
              {groupedTopics[groupName].map((topic) => {
                return (
                  <TopicItem
                    key={topic.id}
                    topic={topic}
                    onClick={onTopicSelect}
                  />
                );
              })}
            </SidebarList>
          </GroupSection>
        ))}

        {/* Private Notes page link */}
        <GroupSection style={{ marginTop: "20px" }}>
          <GroupHeader>My Work</GroupHeader>
          <SidebarList>
            <StyledTopicItem>
              <SidebarLink to="/notes" onClick={() => onTopicSelect("notes")}>
                📝 My Notes (Private)
              </SidebarLink>
            </StyledTopicItem>
          </SidebarList>
        </GroupSection>
      </SidebarScrollArea>

      {/* User profile in footer — reads from UserContext with no prop drilling */}
      <SidebarFooter>
        {user ? (
          <UserProfileBox>
            <div className="profile-title">API User (jsonplaceholder):</div>
            <div>{user.name}</div>
            <div className="profile-email">{user.email}</div>
            <div className="profile-email">🏢 {user.company.name}</div>
          </UserProfileBox>
        ) : (
          <div style={{ color: "var(--text-muted)", fontSize: "11px" }}>
            Loading user profile...
          </div>
        )}
      </SidebarFooter>
    </SidebarContainer>
  );
});

export default Sidebar;
