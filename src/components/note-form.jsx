import { useState } from "react";

const initialNote = { content: "", important: false };

export function NoteForm(props) {
  const { onSubmit } = props;
  const [newNote, setNewNote] = useState(initialNote);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(newNote);
    setNewNote(initialNote);
  };

  const handleChange = (event) => {
    const { type, name } = event.target;
    setNewNote((note) => ({
      ...note,
      [name]: type === "checkbox" ? event.target.checked : event.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="content"
          required
          value={newNote.content}
          onChange={handleChange}
          aria-label="Content"
        />
        <button type="submit">save</button>
      </div>
      <div>
        <label>
          Important?{" "}
          <input
            type="checkbox"
            name="important"
            value={newNote.important}
            onChange={handleChange}
          />
        </label>
      </div>
    </form>
  );
}
