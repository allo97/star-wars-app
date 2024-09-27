import { TestBed } from '@angular/core/testing';

import { StarWarsService } from './star-wars.service';

describe('StarWarsService', () => {
  let service: StarWarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StarWarsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getRandomId returns correct random id that is inside ids array', () => {
    const ids = ['1', '2', '3', '4', '5'];
    const result = service.getRandomId(ids);
    expect([1, 2, 3, 4, 5]).toContain(result);
  });

  it('convertWeight returns correct weight', () => {
    const testData = [
      { input: '30-165', output: 165 },
      { input: '30,65', output: 3065 },
      { input: 'undefined', output: NaN },
      { input: '50.1', output: 50.1 }
    ];

    for (const elem of testData) {
      const result = service.convertWeight(elem.input);
      expect(result).toBe(elem.output);
    }
  });
});
