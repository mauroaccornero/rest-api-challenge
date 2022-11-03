/// <reference types="cypress" />
describe('App e2e test', () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it('should show homepage with the correct content', () => {
    // check header
    cy.get('#header').should('be.visible')
    // check footer
    cy.get('#footer').should('be.visible')
    // check site title
    cy.get('#header h1').should('have.text','Rest API code challenge')
    // check page
    cy.get('#home-page').should('be.visible')
    // check page title
    cy.get('#home-page h2').should('have.text','Welcome to the Rest API code challenge boilerplate')
    // check menu link
    cy.get('#menu a.active').should('have.text','Homepage')
  })

  it('should be able to navigate', () => {
    // click list menu link
    cy.get('#menu a').contains("List").click()
    // check table exist
    cy.get('#table').should('be.visible')
    // check list page title
    cy.get('#list-page h2').should('have.text','All books')
    // click on first item detail link
    cy.get('#table tbody tr:eq(0) td:eq(0) a').click()
    // check card exist
    cy.get('.card').should('be.visible')
    // check detail page title
    cy.get('#detail-page h2').should('have.text','Book detail')
    // click list menu link
    cy.get('#menu a').contains("List").click()
    // click on first item update link
    cy.get('#table tbody tr:eq(0) td:eq(3) a').click()
    // check card exist
    cy.get('#form').should('be.visible')
    // check update page title
    cy.get('#update-page h2').should('have.text','Update book')
    /// click create menu link
    cy.get('#menu a').contains("Create").click()
    // check form exist
    cy.get('#form').should('be.visible')
    // check create page title
    cy.get('#create-page h2').should('have.text','Create new book')
  })
})
