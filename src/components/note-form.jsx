import { useState } from "react";

const initialValues = { content: "", important: false };

export function NoteForm(props) {
  const { onSubmit } = props;
  const [formData, setFormData] = useState(initialValues);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit(formData);
    setFormData(initialValues);
  };

  const handleChange = (event) => {
    const { type, name } = event.target;
    setFormData((note) => ({
      ...note,
      [name]: type === "checkbox" ? event.target.checked : event.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Note</h2>
      <div>
        <input
          type="text"
          name="content"
          required
          value={formData.content}
          onChange={handleChange}
          aria-label="Content"
        />{" "}
        <button type="submit">save</button>
      </div>
      <div>
        <label>
          Important?{" "}
          <input
            type="checkbox"
            name="important"
            value={formData.important}
            onChange={handleChange}
          />
        </label>
      </div>
    </form>
  );
}
