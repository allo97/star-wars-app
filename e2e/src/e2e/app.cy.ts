describe('e2e', () => {
  beforeEach(() => {
    // wanted to intercept request to provide test data but I have error with JIT compiler (@angular/compiler is not present)
    // could be related with nx and cypress
    // intercept(cy)

    cy.visit('/');
  });

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

  it('winner-loser-buttons should be visible after play is clicked', () => {
    cy.get('[data-cy=play-button]').click();
    cy.get('[data-cy=winner-loser-buttons]').should('be.visible');
  });

  it('player1 mat-select resource should change value from people to starships when selected starships', () => {
    cy.get('[data-cy=select-resource]').eq(0).click();
    cy.get('[data-cy=select-resource]').eq(0).type('{downArrow}{enter}');
    cy.get('[data-cy=select-resource]').eq(0).should('contain.text', 'Starships');
  });

  it('player1 properties should contains crew when changed selection to starships', () => {
    cy.get('[data-cy=select-resource]').eq(0).click();
    cy.get('[data-cy=select-resource]').eq(0).type('{downArrow}{enter}');
    cy.get('[data-cy=select-resource]').eq(0).should('contain.text', 'Starships');
    cy.get('[data-cy=play-button]').click();
    cy.get('[data-cy=properties]').eq(0).should('contain.text', 'crew');
  });

  it('values should reset after clicking start a new game button', () => {
    cy.get('[data-cy=new-game-button]').click();
    cy.get('[data-cy=score]').eq(0).should('contain.text', 0);
    cy.get('[data-cy=score]').eq(1).should('contain.text', 0);
    cy.get('[data-cy=properties]').should('not.exist');
  });

  //test for score and Win Lose Draw statuses, use MockService and Partial<Properties> to compare only mass or crew
});
