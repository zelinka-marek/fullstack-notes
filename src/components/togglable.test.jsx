import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { Togglable } from "./togglable";

describe("<Togglable />", () => {
  beforeEach(() => {
    cleanup();

    render(
      <Togglable openButtonLabel="Show">
        <div data-testid="content">togglable content</div>
      </Togglable>
    );
  });

  it("should render its content", () => {
    const content = screen.getByTestId("content");
    expect(content).toBeInTheDocument();
  });

  it("should not display its content by default", () => {
    const content = screen.getByTestId("content");
    expect(content).not.toBeVisible();
  });

  it("should display content if toggled", async () => {
    const button = screen.getByRole("button", { name: /Show/i });
    await userEvent.click(button);

    const content = screen.getByTestId("content");
    expect(content).toBeVisible();
  });

  it("should not display content if toggled to default", async () => {
    const openButton = screen.getByRole("button", { name: /Show/i });
    await userEvent.click(openButton);

    const closeButton = screen.getByRole("button", { name: /Cancel/i });
    await userEvent.click(closeButton);

    const content = screen.getByTestId("content");
    expect(content).not.toBeVisible();
  });
});
