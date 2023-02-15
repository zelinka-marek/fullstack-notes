export function NoteDetails(props) {
  const { note, onToggle } = props;

  return (
    <div className="note">
      {note.content}{" "}
      <button onClick={() => onToggle(note.id)}>
        {note.important ? "make not important" : "make important"}
      </button>
    </div>
  );
}
