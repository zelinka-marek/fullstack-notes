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
