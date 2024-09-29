import {
  getAllPeopleTestResponse,
  getAllPeopleUrl,
  getAllStarshipsTestResponse,
  getAllStarshipsUrl,
  getPeopleByIdTestResponse,
  getPeopleByIdUrl,
  getStarshipByIdResponse,
  getStarshipByIdUrl
} from '@star-wars-app/star-wars';

export const intercept = (cy: Cypress.cy & CyEventEmitter) =>
  cy
    .intercept(
      {
        method: 'GET',
        url: getPeopleByIdUrl
      },
      {
        body: getPeopleByIdTestResponse
      }
    )
    .intercept(
      {
        method: 'GET',
        url: getStarshipByIdUrl
      },
      {
        body: getStarshipByIdResponse
      }
    )
    .intercept(
      {
        method: 'GET',
        url: getAllPeopleUrl
      },
      {
        body: getAllPeopleTestResponse
      }
    )
    .intercept(
      {
        method: 'GET',
        url: getAllStarshipsUrl
      },
      {
        body: getAllStarshipsTestResponse
      }
    );
