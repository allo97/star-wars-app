import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { Resource } from '../../../util/models/star-wars-models';
import { getAllPeopleTestResponse, getPeopleByIdTestResponse } from '../../../util/models/test-data';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService, provideHttpClient(), provideHttpClientTesting()]
    });
    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  it('Get all should return a list of People', async () => {
    const getAllPromise = firstValueFrom(apiService.getAll(Resource.People));
    const req = httpTestingController.expectOne(
      { method: 'GET', url: 'https://www.swapi.tech/api/people?page=1&limit=100' },
      'Request to load people'
    );

    req.flush(getAllPeopleTestResponse);
    expect(await getAllPromise).toEqual(getAllPeopleTestResponse.results);
  });

  it('Get by Id should return a concrete people', async () => {
    const uid = getPeopleByIdTestResponse.result.uid;
    const getByIdPromise = firstValueFrom(apiService.getById(Number(uid), Resource.People));
    const req = httpTestingController.expectOne(
      { method: 'GET', url: `https://www.swapi.tech/api/people/${uid}` },
      'Request to load one people'
    );

    req.flush(getPeopleByIdTestResponse);
    expect(await getByIdPromise).toEqual(getPeopleByIdTestResponse.result);
  });

  it('throws an error if request fails', async () => {
    let actualError: HttpErrorResponse | undefined;

    apiService.getAll(Resource.People).subscribe({
      next: () => {
        fail('Succes should not be called');
      },
      error: (err) => {
        actualError = err;
      }
    });
    const req = httpTestingController.expectOne(
      { method: 'GET', url: `https://www.swapi.tech/api/people?page=1&limit=100` },
      'Request to load people'
    );

    req.flush('Server error', {
      status: 422,
      statusText: 'Unprocessible entity'
    });

    if (!actualError) throw new Error('Error needs to be defined');

    expect(actualError.status).toEqual(422);
    expect(actualError.statusText).toEqual('Unprocessible entity');
  });
});
