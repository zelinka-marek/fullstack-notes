import { useEffect, useState } from "react";
import { NoteForm } from "./components/note-form";
import { NoteItem } from "./components/note-item";
import { NoteList } from "./components/note-list";
import { getNotes, updateNote } from "./services/note";

export function App() {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const noteList = showAll ? notes : notes.filter((note) => note.important);

  useEffect(() => {
    getNotes().then(setNotes);
  }, []);

  const toggleNote = (id) => {
    const note = notes.find((note) => note.id === id);
    const newNote = { ...note, important: !note.important };

    updateNote(id, newNote)
      .then((updatedNote) => {
        if (!updatedNote.id) {
          throw new Error(
            `the note "${note.content}" was already deleted from server`
          );
        }
        setNotes((notes) =>
          notes.map((note) => (note.id === id ? updatedNote : note))
        );
      })
      .catch((error) => {
        alert(error);
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
