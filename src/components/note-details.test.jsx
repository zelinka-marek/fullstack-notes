import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NoteDetails } from "./note-details";

describe("<NoteDetails />", () => {
  beforeEach(() => {
    cleanup();
  });

  it("should render correctly", () => {
    const note = {
      content: "Component testing is done with react-testing-library",
      important: true,
    };

    render(<NoteDetails note={note} />);
    expect(screen.getByText(note.content)).toBeInTheDocument();
  });

  it("should call onToggle when the button is clicked", async () => {
    const note = {
      content: "Component testing is done with react-testing-library",
      important: true,
    };

    const onToggle = vi.fn();

    render(<NoteDetails note={note} onToggle={onToggle} />);

    const button = screen.getByRole("button", {
      name: /make not important/i,
    });
    await userEvent.click(button);

    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
