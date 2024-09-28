import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PeopleProperties } from '../../util/models/star-wars-models';
import { peopleTestCardData } from './../../util/models/test-data';
import { CardDataComponent } from './card-data.component';

describe('StarWarsComponent', () => {
  let component: CardDataComponent<PeopleProperties>;
  let fixture: ComponentFixture<CardDataComponent<PeopleProperties>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDataComponent<PeopleProperties>],
      providers: [provideAnimationsAsync()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardDataComponent<PeopleProperties>);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('mat card should not be null when cardData is present', () => {
    component.cardData = peopleTestCardData;
    fixture.detectChanges();

    const matCard = fixture.debugElement.query(By.css('[test-id=mat-card]'));
    expect(matCard).not.toBeNull();
  });

  it('mat card should be null when cardData is not present', () => {
    const matCard = fixture.debugElement.query(By.css('[test-id=mat-card]'));
    expect(matCard).toBeNull();
  });

  it('should render mat card title with player 1 from input', () => {
    component.cardData = peopleTestCardData;
    component.player = 'Player 1';
    fixture.detectChanges();
    const matCardTitle = fixture.debugElement.query(By.css('[test-id=player]'));

    expect(matCardTitle.nativeElement.textContent).toEqual('Player 1');
  });

  it('should display win-button when round is won', () => {
    component.cardData = peopleTestCardData;
    fixture.detectChanges();
    const winButton = fixture.debugElement.query(By.css('.win-button'));

    expect(winButton.nativeElement.textContent).toContain('Winner');
  });
});
