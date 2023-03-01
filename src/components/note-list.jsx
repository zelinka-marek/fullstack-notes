import PropTypes from "prop-types";

export function NoteList(props) {
  const { items, renderNote } = props;

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{renderNote(item)}</li>
      ))}
    </ul>
  );
}

NoteList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      important: PropTypes.bool.isRequired,
    })
  ).isRequired,
  renderNote: PropTypes.func.isRequired,
};
