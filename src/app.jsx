import { useState } from "react";
import { NoteForm } from "./components/note-form";
import { NoteList } from "./components/note-list";

export function App(props) {
  const { notes: initialNotes } = props;
  const [notes, setNotes] = useState(initialNotes);
  const [showAll, setShowAll] = useState(true);
  const noteList = showAll ? notes : notes.filter((note) => note.important);

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
