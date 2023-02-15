import { useEffect, useState } from "react";
import { NoteForm } from "./components/note-form";
import { NoteItem } from "./components/note-item";
import { NoteList } from "./components/note-list";

export function App() {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const noteList = showAll ? notes : notes.filter((note) => note.important);

  useEffect(() => {
    fetch("http://localhost:3001/notes")
      .then((response) => response.json())
      .then(setNotes);
  }, []);

  const toggleNote = (id) => {
    const note = notes.find((note) => note.id === id);
    const updatedNote = { ...note, important: !note.important };

    fetch(`http://localhost:3001/notes/${id}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedNote),
    })
      .then((response) => response.json())
      .then((data) => {
        setNotes((notes) =>
          notes.map((note) => (note.id === id ? data : note))
        );
      });
  };

  const addNote = (newNote) => {
    fetch("http://localhost:3001/notes", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote),
    })
      .then((response) => response.json())
      .then((data) => setNotes((notes) => notes.concat(data)));
  };

  return (
    <>
      <h1>Notes</h1>
      <div>
        <button type="button" onClick={() => setShowAll((showAll) => !showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <NoteList
        items={noteList}
        renderNote={(note) => <NoteItem note={note} onToggle={toggleNote} />}
      />
      <h2>Add Note</h2>
      <NoteForm onSubmit={addNote} />
    </>
  );
}
