import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NoteDetails } from "./note-details";

describe("NoteDetails", () => {
  it("should render correctly", () => {
    const note = {
      content: "Component testing is done with react-testing-library",
      important: true,
    };

    render(<NoteDetails note={note} />);
    expect(screen.getByText(note.content)).toBeInTheDocument();
  });
});
