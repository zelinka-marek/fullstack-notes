import { useEffect, useState } from "react";
import { ErrorAlert } from "./components/error-alert";
import { NoteDetails } from "./components/note-details";
import { NoteForm } from "./components/note-form";
import { NoteList } from "./components/note-list";
import { getNotes, updateNote } from "./services/note";

export function App() {
  const [notes, setNotes] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showAll, setShowAll] = useState(true);
  const noteList = showAll ? notes : notes.filter((note) => note.important);

  useEffect(() => {
    getNotes().then(setNotes);
  }, []);

  const setError = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 3500);
  };

  const toggleNote = (id) => {
    const note = notes.find((note) => note.id === id);
    const newNote = { ...note, important: !note.important };

    updateNote(id, newNote)
      .then((updatedNote) => {
        setNotes((notes) =>
          notes.map((note) => (note.id === id ? updatedNote : note))
        );
      })
      .catch(() => {
        setError(`the note "${note.content}" was already deleted from server`);
        setNotes(notes.filter((note) => note.id !== id));
      });
  };

  const addNote = (newNote) => {
    addNote(newNote).then((createdNote) =>
      setNotes((notes) => notes.concat(createdNote))
    );
  };

  return (
    <>
      <h1>Notes</h1>
      {errorMessage && <ErrorAlert message={errorMessage} />}
      <div>
        <button type="button" onClick={() => setShowAll((showAll) => !showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <NoteList
        items={noteList}
        renderNote={(note) => <NoteDetails note={note} onToggle={toggleNote} />}
      />
      <h2>Add Note</h2>
      <NoteForm onSubmit={addNote} />
    </>
  );
}
