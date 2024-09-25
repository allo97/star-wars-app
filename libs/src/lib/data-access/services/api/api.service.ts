import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllResponse, GetByIdResponse, Properties } from '../../../util/models/star-wars-models';

const config = {
  peopleApi: 'https://www.swapi.tech/api/people',
  starshipsApi: 'https://www.swapi.tech/api/starships',
  api: 'https://www.swapi.tech/api'
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public getAll = (route: string): Observable<GetAllResponse> =>
    this.http.get<GetAllResponse>(`${config.api}/${route}?page=1&limit=100`);

  public getById = <T extends Properties>(id: number, route: string): Observable<GetByIdResponse<T>> =>
    this.http.get<GetByIdResponse<T>>(`${config.api}/${route}/${id}`);
}
