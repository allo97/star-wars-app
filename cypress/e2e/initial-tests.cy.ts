/// <reference types="cypress" />

describe('e2e', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('initial tests', () => {
    it('header should contain Star Wars text', () => {
      cy.get('h1').contains('Star Wars');
    });

    it('new game button should be visible', () => {
      cy.get('[data-cy=new-game-button]').should('be.visible');
    });

    it('play button should be visible', () => {
      cy.get('[data-cy=play-button]').should('be.visible');
    });

    it('initial Player1 properties should not exist', () => {
      cy.get('[data-cy=properties]').should('not.exist');
    });

    it('initial Player2 properties should not exist', () => {
      cy.get('[data-cy=properties]').should('not.exist');
    });

    it('initial Player1 score should be 0', () => {
      cy.get('[data-cy=score]').eq(0).should('contain.text', 0);
    });

    it('initial Player2 score should be 0', () => {
      cy.get('[data-cy=score]').eq(1).should('contain.text', 0);
    });
  });
});
