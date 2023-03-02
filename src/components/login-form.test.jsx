import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { LoginForm } from "./login-form";

describe("<LoginForm />", () => {
  it("should call onSubmit with right data", async () => {
    const credentials = {
      username: "mzelinka",
      password: "123456",
    };

    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    const username = screen.getByRole("textbox", { name: /username/i });
    await userEvent.type(username, credentials.username);

    const password = screen.getByLabelText(/password/i);
    await userEvent.type(password, credentials.password);

    const button = screen.getByRole("button", { name: /sign in/i });
    await userEvent.click(button);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(credentials);
  });
});
