// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import "@testing-library/cypress/add-commands";

Cypress.Commands.add("login", (credentials) => {
  cy.request("post", `${Cypress.env("BACKEND")}/login`, credentials).then(
    ({ body }) => {
      localStorage.setItem("loggedInUser", JSON.stringify(body));

      cy.visit("");
    }
  );
});

Cypress.Commands.add("createNote", (note) => {
  const token = JSON.parse(localStorage.getItem("loggedInUser")).token;

  cy.request({
    url: `${Cypress.env("BACKEND")}/notes`,
    method: "post",
    body: note,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  cy.visit("");
});
