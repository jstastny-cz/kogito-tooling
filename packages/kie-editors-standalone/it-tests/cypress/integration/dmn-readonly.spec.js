/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />

before("Visit page", () => {
  cy.visit("localhost:9001/dmn-read-only");
});

describe("Dmn Read Only.", () => {
  it("Test Load File And View", () => {
    cy.get("div#root")
      .should("exist")
      .componentType("editor")
      .componentId("dmn-read-only")
      .should("exist");
    cy.componentType("editor").frameLoaded("iframe");
    cy.iframe()
      .find("[data-testid='loading-screen-div']", { timeout: 100 })
      .should("be.visible");
    cy.iframe()
      .find("[data-testid='loading-screen-div']", { timeout: 60000 })
      .should("not.exist");
    cy.iframe()
      .find("[data-field='palettePanel']")
      .should("not.be.visible");
    cy.iframe()
      .find(".qe-docks-bar-W", { timeout: 10000 })
      .should("be.visible");
    cy.componentType("file-upload-form").within($form => {
      cy.get("input[type='file']").attachFile("call centre drd.dmn");
      cy.get("button").click(); // upload file from fixtures
    });
    cy.componentType("file-list")
      .componentType("file-list-item")
      .componentId("call centre drd.dmn")
      .should("be.visible")
      .componentType("file-list-item-button")
      .componentId("view")
      .should("be.visible")
      .click(); // choose file to view
    cy.iframe()
      .find(".qe-docks-bar-W button")
      .first()
      .should("be.visible")
      .click(); // open DecisionNavigator
    cy.iframe()
      .find(".qe-docks-bar-expanded-W")
      .within($navigator => {
        cy.wrap($navigator)
          .find("[data-field='item'][title='DRG']")
          .should("be.visible")
          .siblings("[data-field='item']")
          .should("have.length", 4)
          .first()
          .should("have.attr", "title", "call centre drd")
          .next()
          .should("have.attr", "title", "DRDs")
          .next()
          .should("have.attr", "title", "call centre")
          .next()
          .should("have.attr", "title", "preconditions");
      });
  });
});
