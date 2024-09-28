import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import {
  GetAllResponse,
  GetAllResult,
  GetByIdResponse,
  PeopleProperties,
  Resource,
  Result
} from '../../../util/models/star-wars-models';
import { peopleTestCardData } from '../../../util/models/test-data';
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
    const getAllResult = [{ name: 'test', uid: '1', url: 'test.com' } as GetAllResult];
    const getAllResponse: GetAllResponse = {
      message: 'ok',
      total_records: 82,
      total_pages: 1,
      previous: '',
      next: '',
      results: getAllResult
    };
    req.flush(getAllResponse);
    expect(await getAllPromise).toEqual(getAllResult);
  });

  it('Get by Id should return a concrete people', async () => {
    const uid = 1;
    const getByIdPromise = firstValueFrom(apiService.getById(uid, Resource.People));
    const req = httpTestingController.expectOne(
      { method: 'GET', url: `https://www.swapi.tech/api/people/${uid}` },
      'Request to load one people'
    );
    const getAllResult = {
      __v: 0,
      _id: '5f63a36fee9fd7000499be53',
      description: 'A person within the Star Wars universe',
      uid: String(uid),
      properties: peopleTestCardData.properties
    } as Result<PeopleProperties>;
    const getByIdResponse: GetByIdResponse<PeopleProperties> = {
      message: 'ok',
      result: getAllResult
    };
    req.flush(getByIdResponse);
    expect(await getByIdPromise).toEqual(getAllResult);
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
