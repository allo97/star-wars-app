import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StarshipProperties } from '../../util/models/star-wars-models';
import { CardDataComponent } from './card-data.component';

describe('StarWarsComponent', () => {
  let component: CardDataComponent<StarshipProperties>;
  let fixture: ComponentFixture<CardDataComponent<StarshipProperties>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDataComponent<StarshipProperties>]
    }).compileComponents();

    fixture = TestBed.createComponent(CardDataComponent<StarshipProperties>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
