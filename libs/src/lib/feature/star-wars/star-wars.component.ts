import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BehaviorSubject, combineLatest, map, take, tap } from 'rxjs';
import { ApiService } from '../../data-access/services/api/api.service';
import { CardDataComponent } from '../../ui/participant-card/card-data.component';
import { GameState, initialGameState } from '../../util/models/star-wars-models';
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
    this.apiService.getAll(this.starWarsService.peopleRoute),
    this.apiService.getAll(this.starWarsService.starshipsRoute)
  ]);
  private isLoading$ = new BehaviorSubject<boolean>(false);
  private gameState$ = new BehaviorSubject<GameState>(initialGameState);

  public vm$ = combineLatest([this.getAll$, this.isLoading$.asObservable(), this.gameState$.asObservable()]).pipe(
    tap(([[peopleIds, starshipIds]]) => {
      this.starWarsService.idsFromResponse = {
        peopleIds: peopleIds.results.map((result) => result.uid),
        starshipIds: starshipIds.results.map((result) => result.uid)
      };
    }),
    map(([, isLoading, gameState]) => ({ isLoading, gameState }))
  );

  constructor(private readonly apiService: ApiService, private readonly starWarsService: StarWarsService) {}

  public play() {
    this.playRound()
      .pipe(take(1))
      .subscribe((updatedGameState) => this.gameState$.next(updatedGameState));
  }

  public startNewGame() {
    this.gameState$.next(initialGameState);
  }

  private playRound() {
    this.isLoading$.next(true);

    const player1DrawData = this.starWarsService.getDrawData(this.gameState$.value.player1.resource);
    const player2DrawData = this.starWarsService.getDrawData(this.gameState$.value.player2.resource);

    return combineLatest([
      this.apiService.getById(this.starWarsService.getRandomId(player1DrawData.ids), player1DrawData.route),
      this.apiService.getById(this.starWarsService.getRandomId(player2DrawData.ids), player2DrawData.route)
    ]).pipe(
      map(([player1Response, player2Response]) => {
        const hasPlayer1Won = this.starWarsService.hasPlayer1Won(
          player1Response.result.properties,
          player2Response.result.properties
        );
        const updatedGameState = {
          player1: {
            playerState: {
              isRoundWon: hasPlayer1Won,
              score: +!!hasPlayer1Won + this.gameState$.value.player1.playerState.score
            },
            properties: player1Response.result.properties,
            resource: this.gameState$.value.player1.resource,
            uid: player1Response.result.uid
          },
          player2: {
            playerState: {
              isRoundWon: !hasPlayer1Won,
              score: +!hasPlayer1Won + this.gameState$.value.player2.playerState.score
            },
            properties: player2Response.result.properties,
            resource: this.gameState$.value.player2.resource,
            uid: player2Response.result.uid
          }
        } as GameState;

        this.isLoading$.next(false);
        return updatedGameState;
      })
    );
  }
}
