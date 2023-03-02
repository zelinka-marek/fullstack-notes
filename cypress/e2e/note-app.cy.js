describe("Note app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("should be able to open the front page", () => {
    cy.findByText("Notes").should("exist");
    cy.findByText("FullStack - Note, Marek Zelinka, © 2023").should("exist");
  });

  it("should open the login form when clicked", () => {
    cy.findByRole("button", { name: /sign in/i }).click();
  });

  it("should allow users to log in", () => {
    cy.findByRole("button", { name: /sign in/i }).click();

    cy.findByRole("textbox", { name: /username/i }).type("root");
    cy.findByLabelText(/password/i).type("123456");
    cy.findByRole("button", { name: /sign in/i }).click();

    cy.findByText("Logged in as root.").should("exist");
  });

  describe("when logged in", () => {
    beforeEach(() => {
      cy.findByRole("button", { name: /sign in/i }).click();

      cy.findByRole("textbox", { name: /username/i }).type("root");
      cy.findByLabelText(/password/i).type("123456");
      cy.findByRole("button", { name: /sign in/i }).click();

      cy.findByText("Logged in as root.").should("exist");
    });

    it("should create a new note when form is submitted", () => {
      const newNoteContent = "new note created by cypress...";
      cy.findByRole("button", { name: /new note/i }).click();

      cy.findByRole("textbox", { name: /content/i }).type(
        "new note created by cypress..."
      );
      cy.findByRole("button", { name: /save/i }).click();

      cy.findByText(newNoteContent).should("exist");
    });
  });
});
