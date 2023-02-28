import { useEffect, useState } from "react";
import { ErrorAlert } from "./components/error-alert";
import { NoteDetails } from "./components/note-details";
import { NoteForm } from "./components/note-form";
import { NoteList } from "./components/note-list";
import { createNote, getNotes, updateNote } from "./services/note";

function Footer() {
  const style = {
    color: "green",
    fontSize: 14,
    marginTop: 12,
  };

  return (
    <footer style={style}>
      <em>FullStack - Note, Marek Zelinka, &copy; 2023 </em>
    </footer>
  );
}

export function App() {
  const [notes, setNotes] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showAll, setShowAll] = useState(true);
  const noteList = showAll ? notes : notes.filter((note) => note.important);

  useEffect(() => {
    getNotes().then(setNotes);
  }, []);

  const notify = (message) => {
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
        notify(`the note "${note.content}" was already deleted from server`);
        setNotes(notes.filter((note) => note.id !== id));
      });
  };

  const addNote = (newNote) => {
    createNote(newNote).then((createdNote) =>
      setNotes((notes) => notes.concat(createdNote))
    );
  };

  return (
    <div className="app">
      <main>
        <h1>Notes</h1>
        {errorMessage && <ErrorAlert message={errorMessage} />}
        <div>
          <button
            type="button"
            onClick={() => setShowAll((showAll) => !showAll)}
          >
            show {showAll ? "important" : "all"}
          </button>
        </div>
        <NoteList
          items={noteList}
          renderNote={(note) => (
            <NoteDetails note={note} onToggle={toggleNote} />
          )}
        />
        <NoteForm onSubmit={addNote} />
      </main>
      <Footer />
    </div>
  );
}
