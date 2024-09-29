import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BehaviorSubject, combineLatest, firstValueFrom, map, tap } from 'rxjs';
import { ApiService } from '../../data-access/services/api/api.service';
import { CardDataComponent } from '../../ui/participant-card/card-data.component';
import { GameState, initialGameState, RoundResult } from '../../util/models/star-wars-models';
import { StarWarsService } from './../../data-access/services/star-wars/star-wars.service';

@Component({
  selector: 'sw-star-wars',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, CardDataComponent],
  templateUrl: './star-wars.component.html',
  styleUrl: './star-wars.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarWarsComponent {
  private getAll$ = combineLatest([
    this.apiService.getAll(initialGameState.player1.resource),
    this.apiService.getAll(initialGameState.player2.resource)
  ]);
  private isLoading$ = new BehaviorSubject<boolean>(false);
  private gameState$ = new BehaviorSubject<GameState>(initialGameState);

  public vm$ = combineLatest([this.getAll$, this.isLoading$.asObservable(), this.gameState$.asObservable()]).pipe(
    tap(([[people, starships]]) => {
      this.starWarsService.idsCollection = {
        people: people.map((result) => result.uid),
        starships: starships.map((result) => result.uid)
      };
    }),
    map(([, isLoading, gameState]) => ({ isLoading, gameState }))
  );

  constructor(private readonly apiService: ApiService, private readonly starWarsService: StarWarsService) {}

  public async play() {
    this.isLoading$.next(true);
    const updatedGameState = await firstValueFrom(this.playRound());
    this.gameState$.next(updatedGameState);
    this.isLoading$.next(false);
  }

  public startNewGame() {
    this.gameState$.next(initialGameState);
  }

  private playRound() {
    const player1Resource = this.gameState$.value.player1.resource;
    const player2Resource = this.gameState$.value.player2.resource;

    return combineLatest([
      this.apiService.getById(
        this.starWarsService.getRandomId(this.starWarsService.idsCollection[player1Resource]),
        player1Resource
      ),
      this.apiService.getById(
        this.starWarsService.getRandomId(this.starWarsService.idsCollection[player2Resource]),
        player2Resource
      )
    ]).pipe(
      map(([player1Result, player2Result]) => {
        const roundResults = this.starWarsService.getRoundResults(player1Result.properties, player2Result.properties);
        const updatedGameState = {
          player1: {
            roundResult: roundResults.player1Result,
            score: (roundResults.player1Result === RoundResult.Win ? 1 : 0) + this.gameState$.value.player1.score,
            properties: player1Result.properties,
            resource: this.gameState$.value.player1.resource,
            uid: player1Result.uid
          },
          player2: {
            roundResult: roundResults.player2Result,
            score: (roundResults.player2Result === RoundResult.Win ? 1 : 0) + this.gameState$.value.player2.score,
            properties: player2Result.properties,
            resource: this.gameState$.value.player2.resource,
            uid: player2Result.uid
          }
        } as GameState;

        return updatedGameState;
      })
    );
  }
}
