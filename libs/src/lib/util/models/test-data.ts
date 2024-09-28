import { CardData, PeopleProperties, Resource } from './star-wars-models';

export const peopleTestCardData = {
  isRoundWon: true,
  resource: Resource.People,
  score: 0,
  properties: {
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    created: '2024-09-26T14:31:45.401Z',
    edited: '2024-09-26T14:31:45.401Z',
    name: 'Luke Skywalker',
    homeworld: 'https://www.swapi.tech/api/planets/1',
    url: 'https://www.swapi.tech/api/people/1'
  }
} as CardData<PeopleProperties>;
