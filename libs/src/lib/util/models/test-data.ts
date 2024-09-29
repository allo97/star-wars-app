import {
  CardData,
  GetAllResponse,
  GetByIdResponse,
  PeopleProperties,
  Resource,
  RoundResult,
  StarshipProperties
} from './star-wars-models';

const peopleTestProperties: PeopleProperties = {
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
};

export const peopleTestCardData = {
  roundResult: RoundResult.Win,
  resource: Resource.People,
  score: 0,
  properties: peopleTestProperties
} as CardData<PeopleProperties>;

export const getPeopleByIdTestResponse: GetByIdResponse<PeopleProperties> = {
  message: 'ok',
  result: {
    __v: 0,
    _id: '5f63a36fee9fd7000499be53',
    description: 'A person within the Star Wars universe',
    uid: '1',
    properties: peopleTestProperties
  }
};

export const getAllPeopleTestResponse: GetAllResponse = {
  message: 'ok',
  total_records: 82,
  total_pages: 9,
  previous: '',
  next: '',
  results: [
    {
      uid: '1',
      name: 'Luke Skywalker',
      url: 'https://www.swapi.tech/api/people/1'
    },
    {
      uid: '2',
      name: 'C-3PO',
      url: 'https://www.swapi.tech/api/people/2'
    }
  ]
};

const starshipTestProperties: StarshipProperties = {
  model: 'CR90 corvette',
  starship_class: 'corvette',
  manufacturer: 'Corellian Engineering Corporation',
  cost_in_credits: '3500000',
  length: '150',
  crew: '30-165',
  passengers: '600',
  max_atmosphering_speed: '950',
  hyperdrive_rating: '2.0',
  MGLT: '60',
  cargo_capacity: '3000000',
  consumables: '1 year',
  pilots: [],
  created: '2020-09-17T17:55:06.604Z',
  edited: '2020-09-17T17:55:06.604Z',
  name: 'CR90 corvette',
  url: 'https://www.swapi.tech/api/starships/2'
};

export const getStarshipByIdResponse: GetByIdResponse<StarshipProperties> = {
  message: 'ok',
  result: {
    __v: 0,
    _id: '5f63a36fee9fd7000499be53',
    description: 'A person within the Star Wars universe',
    uid: '1',
    properties: starshipTestProperties
  }
};

export const starshipsTestCardData = {
  roundResult: RoundResult.Win,
  resource: Resource.People,
  score: 0,
  properties: starshipTestProperties
} as CardData<StarshipProperties>;

export const getAllStarshipsTestResponse: GetAllResponse = {
  message: 'ok',
  total_records: 36,
  total_pages: 4,
  previous: '',
  next: '',
  results: [
    {
      uid: '2',
      name: 'CR90 corvette',
      url: 'https://www.swapi.tech/api/starships/2'
    },
    {
      uid: '3',
      name: 'Star Destroyer',
      url: 'https://www.swapi.tech/api/starships/3'
    }
  ]
};

export const getAllPeopleUrl = 'https://www.swapi.tech/api/people/?page=1&limit=100';
export const getAllStarshipsUrl = 'https://www.swapi.tech/api/starships/?page=1&limit=100';
export const getPeopleByIdUrl = 'https://www.swapi.tech/api/people/1';
export const getStarshipByIdUrl = 'https://www.swapi.tech/api/starships/2';
