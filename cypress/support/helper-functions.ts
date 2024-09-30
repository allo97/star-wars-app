export const getPeopleTestResponse = (mass: string) => ({
  result: {
    properties: {
      mass: mass,
      name: 'Test People1'
    }
  }
});

export const getStarshipTestResponse = (crew: string) => ({
  result: {
    properties: {
      crew: crew,
      name: 'Test Starship1'
    }
  }
});

export const getAllTestResponse = (uids: string[]) => ({
  results: uids.map((uid) => ({ uid }))
});
