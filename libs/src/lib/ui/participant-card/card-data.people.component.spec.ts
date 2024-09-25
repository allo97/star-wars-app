import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeopleProperties } from '../../util/models/star-wars-models';
import { CardDataComponent } from './card-data.component';

describe('StarWarsComponent', () => {
  let component: CardDataComponent<PeopleProperties>;
  let fixture: ComponentFixture<CardDataComponent<PeopleProperties>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDataComponent<PeopleProperties>]
    }).compileComponents();

    fixture = TestBed.createComponent(CardDataComponent<PeopleProperties>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
