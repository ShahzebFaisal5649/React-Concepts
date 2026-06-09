import React, { useState } from "react";
import { topics } from "../data/topics";

export function NotesPage() {
  // 1. State for the list of notes. We initialize it by reading from localStorage.
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("student_notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  // 2. States for note input fields
  const [selectedTopicId, setSelectedTopicId] = useState(topics[0]?.id || "");
  const [noteText, setNoteText] = useState("");

  // Save the notes list to localStorage and update state
  const saveNotesList = (updatedNotes) => {
    setNotes(updatedNotes);
    localStorage.setItem("student_notes", JSON.stringify(updatedNotes));
  };

  // Add a new note to the list
  const handleAddNote = (event) => {
    event.preventDefault(); // Stop page reload
    
    if (noteText.trim() === "") {
      alert("Please enter some text for your note!");
      return;
    }

    // Find the topic title matching the selected ID
    const matchedTopic = topics.find((t) => t.id === selectedTopicId);
    const topicTitle = matchedTopic ? matchedTopic.title : "General";

    // Create the note object
    const newNote = {
      id: Date.now(), // Unique ID using milliseconds
      topicId: selectedTopicId,
      topicTitle: topicTitle,
      text: noteText,
      createdAt: new Date().toLocaleTimeString()
    };

    // Update list
    const updated = [newNote, ...notes];
    saveNotesList(updated);

    // Clear textarea
    setNoteText("");
  };

  // Delete a note from the list
  const handleDeleteNote = (idToDelete) => {
    const updated = notes.filter((note) => note.id !== idToDelete);
    saveNotesList(updated);
  };

  return (
    <div className="notes-page-container">
      <h2>📝 My Notes (Private Route Area)</h2>
      <p className="notes-desc">
        Welcome to your private study notebook! Here you can save reminders about each React concept. 
        These notes are saved inside your browser's <code>localStorage</code>, so they will survive browser refreshes.
      </p>

      {/* Note Creation Form */}
      <form onSubmit={handleAddNote} className="note-form">
        <div className="form-group">
          <label htmlFor="topic-select">Select a React Topic:</label>
          <select
            id="topic-select"
            value={selectedTopicId}
            onChange={(e) => setSelectedTopicId(e.target.value)}
          >
            {topics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="note-textarea">Write your note:</label>
          <textarea
            id="note-textarea"
            rows="4"
            placeholder="Type your study note here..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="add-note-btn">
          ➕ Save Study Note
        </button>
      </form>

      {/* Notes Display list */}
      <div className="notes-list-section">
        <h3>Saved Study Notes ({notes.length})</h3>
        
        {notes.length === 0 ? (
          <div className="no-notes-card">
            <span className="empty-icon">📂</span>
            <p>No study notes saved yet. Write your first note above!</p>
          </div>
        ) : (
          <div className="notes-grid">
            {notes.map((note) => (
              <div key={note.id} className="note-card">
                <div className="note-card-header">
                  <span className="note-topic-tag">{note.topicTitle}</span>
                  <span className="note-time">{note.createdAt}</span>
                </div>
                <p className="note-card-body">{note.text}</p>
                <button 
                  className="delete-note-btn" 
                  onClick={() => handleDeleteNote(note.id)}
                >
                  🗑️ Delete Note
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NotesPage;
