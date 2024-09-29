import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  GetAllResult,
  PeopleProperties,
  Resource,
  Result,
  StarshipProperties
} from '../../../util/models/star-wars-models';

@Injectable({
  providedIn: 'root'
})
export class MockService {
  public getAll = (resource: Resource): Observable<GetAllResult[]> =>
    resource === Resource.People
      ? of([{ uid: '1' } as GetAllResult, { uid: '2' } as GetAllResult])
      : of([{ uid: '2' } as GetAllResult, { uid: '3' } as GetAllResult]);

  public getById = (
    id: number,
    resource: Resource
  ): Observable<Result<PeopleProperties> | Result<StarshipProperties>> =>
    resource === Resource.People
      ? of({ properties: { mass: '1' } } as Result<PeopleProperties>)
      : of({ properties: { crew: '1' } } as Result<StarshipProperties>);
}
