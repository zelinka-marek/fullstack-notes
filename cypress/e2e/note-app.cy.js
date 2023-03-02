describe("Note app", () => {
  it("front page can be opened", () => {
    cy.visit("http://localhost:5173/");
    cy.findByText("Notes").should("exist");
    cy.findByText("FullStack - Note, Marek Zelinka, © 2023").should("exist");
  });
});
