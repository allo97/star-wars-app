/// <reference types="cypress" />
import { getAllTestResponse, getPeopleTestResponse, getStarshipTestResponse } from '../support/helper-functions';

describe('e2e', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('behavioural tests', () => {
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

    it('player1 should have score 1 and status win', () => {
      cy.intercept(
        {
          method: 'GET',
          url: 'https://www.swapi.tech/api/people/*'
        },
        {
          body: getPeopleTestResponse('2')
        }
      ).intercept(
        {
          method: 'GET',
          url: 'https://www.swapi.tech/api/starships/*'
        },
        {
          body: getStarshipTestResponse('1')
        }
      );

      cy.get('[data-cy=play-button]').click();
      cy.get('[data-cy=score]').eq(0).should('contain.text', 1);
      cy.get('[data-cy=score]').eq(1).should('contain.text', 0);

      cy.get('[data-cy=win-button]').should('be.visible');
      cy.get('[data-cy=lose-button]').should('be.visible');
    });

    it('round status should be Draw and score 0 when mass is the same', () => {
      cy.intercept(
        {
          method: 'GET',
          url: 'https://www.swapi.tech/api/people/*'
        },
        {
          body: getPeopleTestResponse('1')
        }
      ).intercept(
        {
          method: 'GET',
          url: 'https://www.swapi.tech/api/starships/*'
        },
        {
          body: getStarshipTestResponse('1')
        }
      );

      cy.get('[data-cy=play-button]').click();
      cy.get('[data-cy=score]').eq(0).should('contain.text', 0);
      cy.get('[data-cy=score]').eq(1).should('contain.text', 0);

      cy.get('[data-cy=draw-button]').eq(0).should('be.visible');
      cy.get('[data-cy=draw-button]').eq(1).should('be.visible');
    });

    it('values should reset after clicking a new game button', () => {
      cy.intercept(
        {
          method: 'GET',
          url: 'https://www.swapi.tech/api/people/*'
        },
        {
          body: getPeopleTestResponse('2')
        }
      ).intercept(
        {
          method: 'GET',
          url: 'https://www.swapi.tech/api/starships/*'
        },
        {
          body: getStarshipTestResponse('1')
        }
      );

      cy.get('[data-cy=play-button]').click();
      cy.get('[data-cy=new-game-button]').click();
      cy.get('[data-cy=score]').eq(0).should('contain.text', 0);
      cy.get('[data-cy=score]').eq(1).should('contain.text', 0);
      cy.get('[data-cy=properties]').should('not.exist');
      cy.get('[data-cy=winner-loser-buttons]').should('not.exist');
      cy.get('[data-cy=win-button]').should('not.exist');
    });

    it('should provide a random resources from mocked getAll requests', () => {
      const peopleData = [
        { uid: '1', name: 'Luke Skywalker' },
        { uid: '2', name: 'C-3PO' }
      ];

      const starshipsData = [
        { uid: '2', name: 'CR90 corvette' },
        { uid: '3', name: 'Star Destroyer' }
      ];

      cy.intercept(
        {
          method: 'GET',
          url: 'https://www.swapi.tech/api/people?page=1&limit=100'
        },
        {
          body: getAllTestResponse(peopleData.map((people) => people.uid))
        }
      ).intercept(
        {
          method: 'GET',
          url: 'https://www.swapi.tech/api/starships?page=1&limit=100'
        },
        {
          body: getAllTestResponse(starshipsData.map((starshipsData) => starshipsData.uid))
        }
      );

      cy.get('[data-cy=play-button]').click();
      cy.get('[data-cy=resource-name]')
        .eq(0)
        .invoke('text')
        .should(
          'be.oneOf',
          peopleData.map((people) => people.name)
        );
      cy.get('[data-cy=resource-name]')
        .eq(1)
        .invoke('text')
        .should(
          'be.oneOf',
          starshipsData.map((starshipsData) => starshipsData.name)
        );
    });
  });
});
