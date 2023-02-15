import { useEffect, useState } from "react";
import { NoteForm } from "./components/note-form";
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

  const addNote = (newNote) => {
    const noteObject = {
      id: notes.length + 1,
      ...newNote,
    };
    setNotes((notes) => notes.concat(noteObject));
  };

  return (
    <>
      <h1>Notes</h1>
      <div>
        <button type="button" onClick={() => setShowAll((showAll) => !showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <NoteList items={noteList} />
      <h2>Add Note</h2>
      <NoteForm onSubmit={addNote} />
    </>
  );
}
