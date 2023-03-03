describe("Note app", () => {
  beforeEach(() => {
    cy.request("post", "http://localhost:3001/api/testing/reset");
    cy.request("post", "http://localhost:3001/api/users/", {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    });
    cy.visit("http://localhost:5173/");
  });

  it("should be able to open the front page", () => {
    cy.findByText(/notes/i).should("exist");
    cy.findByText(/fullStack - note, marek zelinka, © 2023/i).should("exist");
  });

  it("should open the login form when clicked", () => {
    cy.findByRole("button", { name: /sign in/i }).click();

    cy.findByRole("textbox", { name: /username/i }).should("exist");
    cy.findByLabelText(/password/i).should("exist");
    cy.findByRole("button", { name: /sign in/i }).should("exist");
  });

  describe("logging in", () => {
    beforeEach(() => {
      cy.findByRole("button", { name: /sign in/i }).click();
    });

    it("succeeds if credentials are valid", () => {
      cy.findByRole("textbox", { name: /username/i }).type("mluukkai");
      cy.findByLabelText(/password/i).type("salainen");
      cy.findByRole("button", { name: /sign in/i }).click();

      cy.findByText(/logged in as Matti Luukkainen/i).should("exist");
    });

    it("fails with error message if credentails are invalid", () => {
      cy.findByRole("textbox", { name: /username/i }).type("mluukkai");
      cy.findByLabelText(/password/i).type("wrongpassword");
      cy.findByRole("button", { name: /sign in/i }).click();

      cy.findByText(/wrong credentials/i).should("exist");
      cy.findByText(/logged in as Matti Luukkainen/i).should("not.exist");
    });
  });

  describe("when logged in", () => {
    beforeEach(() => {
      cy.findByRole("button", { name: /sign in/i }).click();

      cy.findByRole("textbox", { name: /username/i }).type("mluukkai");
      cy.findByLabelText(/password/i).type("salainen");
      cy.findByRole("button", { name: /sign in/i }).click();

      cy.findByText(/logged in as Matti Luukkainen/i).should("exist");
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

    describe("a saved note exists", () => {
      const newNoteContent = "new note created by cypress...";

      beforeEach(() => {
        cy.findByRole("button", { name: /new note/i }).click();

        cy.findByRole("textbox", { name: /content/i }).type(newNoteContent);
        cy.findByRole("button", { name: /save/i }).click();
      });

      it("should be able to make it important", () => {
        cy.findByText(newNoteContent)
          .findByRole("button", { name: /make important/i })
          .click();

        cy.findByText(newNoteContent)
          .findByRole("button", { name: /make not important/i })
          .should("exist");
      });
    });
  });
});
