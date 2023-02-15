export function NoteItem(props) {
  const { note, onToggle } = props;

  return (
    <div>
      {note.content}{" "}
      <button onClick={() => onToggle(note.id)}>
        {note.important ? "make not important" : "make important"}
      </button>
    </div>
  );
}
