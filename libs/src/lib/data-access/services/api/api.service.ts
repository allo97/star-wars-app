import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  GetAllResponse,
  GetAllResult,
  GetByIdResponse,
  Properties,
  Resource,
  Result
} from '../../../util/models/star-wars-models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public readonly apiUrl = 'https://www.swapi.tech/api';

  constructor(private http: HttpClient) {}

  public getAll = (resource: Resource): Observable<GetAllResult[]> =>
    this.http
      .get<GetAllResponse>(`${this.apiUrl}/${resource}?page=1&limit=100`)
      .pipe(map((getAllResponse) => getAllResponse.results));

  public getById = <T extends Properties>(id: number, resource: Resource): Observable<Result<T>> =>
    this.http
      .get<GetByIdResponse<T>>(`${this.apiUrl}/${resource}/${id}`)
      .pipe(map((getByIdResponse) => getByIdResponse.result));
}
