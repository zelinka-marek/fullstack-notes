import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NoteForm } from "./note-form";

describe("<NoteForm />", () => {
  beforeEach(() => {
    cleanup();
  });

  it("should call onSubmit with right data", async () => {
    const content = "testing a form...";

    const onSubmit = vi.fn();
    render(<NoteForm onSubmit={onSubmit} />);

    const input = screen.getByRole("textbox", { name: /content/i });
    await userEvent.type(input, content);

    const submitButton = screen.getByRole("button", { name: /save/i });
    await userEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({ content, important: false });
  });

  it("should create an important note", async () => {
    const content = "testing a form...";

    const onSubmit = vi.fn();
    render(<NoteForm onSubmit={onSubmit} />);

    const input = screen.getByRole("textbox", { name: /content/i });
    await userEvent.type(input, content);

    const important = screen.getByRole("checkbox", { name: /important/i });
    await userEvent.click(important);

    const submitButton = screen.getByRole("button", { name: /save/i });
    await userEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({ content, important: true });
  });
});
