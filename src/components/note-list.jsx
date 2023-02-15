function NoteItem(props) {
  const { note } = props;

  return <li key={note.id}>{note.content}</li>;
}

export function NoteList(props) {
  const { items } = props;

  return (
    <ul>
      {items.map((item) => (
        <NoteItem key={item.id} note={item} />
      ))}
    </ul>
  );
}
