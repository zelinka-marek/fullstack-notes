import { useEffect, useState } from "react";
import { ErrorAlert } from "./components/error-alert";
import { LoginForm } from "./components/login-form";
import { LogoutForm } from "./components/logout-form";
import { NoteDetails } from "./components/note-details";
import { NoteForm } from "./components/note-form";
import { NoteList } from "./components/note-list";
import { login } from "./services/login";
import { createNote, getNotes, updateNote } from "./services/note";
import { getSavedUser, removeUser, saveUser } from "./utils/auth";

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
  const [user, setUser] = useState(() => getSavedUser(localStorage));
  const [notes, setNotes] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showAll, setShowAll] = useState(true);
  const noteList = showAll ? notes : notes.filter((note) => note.important);

  useEffect(() => {
    getNotes().then(setNotes);
  }, []);

  useEffect(() => {
    if (user) {
      saveUser(user);
    } else {
      removeUser(user);
    }
  }, [user]);

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

  const addNote = (data) => {
    createNote(data).then((note) => setNotes((notes) => notes.concat(note)));
  };

  const loginUser = async (data) => {
    try {
      const user = await login(data);

      setUser(user);
    } catch (error) {
      notify(`Wrong credentials, try again!`);
    }
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <div className="app">
      <main>
        <h1>Notes</h1>
        {errorMessage && <ErrorAlert message={errorMessage} />}
        {user ? (
          <>
            <p>Logged in as {user.name ?? user.username}.</p>
            <LogoutForm onSubmit={logoutUser} />
            <NoteForm onSubmit={addNote} />
          </>
        ) : (
          <LoginForm onSubmit={loginUser} />
        )}
        <div style={{ marginTop: 16 }}>
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
      </main>
      <Footer />
    </div>
  );
}
