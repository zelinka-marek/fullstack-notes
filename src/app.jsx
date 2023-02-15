import { NoteList } from "./components/note-list";

export function App(props) {
  const { notes } = props;

  return (
    <>
      <h1>Notes</h1>
      <NoteList items={notes} />
    </>
  );
}
