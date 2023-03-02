import PropTypes from "prop-types";

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

NoteDetails.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    important: PropTypes.bool.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
};
