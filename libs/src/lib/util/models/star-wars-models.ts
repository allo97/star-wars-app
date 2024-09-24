export interface GetByIdResponse<T extends Properties> {
  message: string;
  result: Result<T>;
}

export interface Result<T> {
  properties: T;
  description: string;
  _id: string;
  uid: string;
  __v: number;
}

export interface Properties {
  created: string;
  edited: string;
  name: string;
  url: string;
}

export interface PeopleProperties extends Properties {
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
}

export interface StarshipProperties extends Properties {
  model: string;
  starship_class: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  hyperdrive_rating: string;
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  pilots: PeopleProperties[];
}

export interface GetAllResponse {
  message: string;
  total_records: number;
  total_pages: number;
  previous: string;
  next: string;
  results: GetAllResult[];
}

export interface GetAllResult {
  uid: string;
  name: string;
  url: string;
}
