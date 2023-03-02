import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { NoteForm } from "./note-form";

describe("<NoteForm />", () => {
  it("should call onSubmit when submit button is clicked", async () => {
    const onSubmit = vi.fn();

    render(<NoteForm onSubmit={onSubmit} />);

    const content = "testing a form...";

    const input = screen.getByRole("textbox", { name: /content/i });
    await userEvent.type(input, content);

    const submitButton = screen.getByRole("button", { name: /save/i });
    await userEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({ content, important: false });
  });
});
