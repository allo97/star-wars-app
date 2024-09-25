import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BehaviorSubject, combineLatest, map, Subject, switchMap, tap } from 'rxjs';
import { ApiService } from '../../data-access/services/api/api.service';
import { CardDataComponent } from '../../ui/participant-card/card-data.component';
import {
  GameState,
  GetByIdRequestData,
  IdsFromResponse,
  initialGameState,
  Resource,
  Response,
  RoundResults
} from '../../util/models/star-wars-models';
import { PeopleProperties, Properties, StarshipProperties } from './../../util/models/star-wars-models';

@Component({
  selector: 'sw-star-wars',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, CardDataComponent],
  templateUrl: './star-wars.component.html',
  styleUrl: './star-wars.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarWarsComponent {
  private peopleRoute = 'people';
  private starshipsRoute = 'starships';
  private getAll$ = combineLatest([
    this.apiService.getAll(this.peopleRoute),
    this.apiService.getAll(this.starshipsRoute)
  ]);
  private isLoading$ = new BehaviorSubject<boolean>(false);
  private gameState$ = new BehaviorSubject<GameState>(initialGameState);
  private idsFromResponse = {} as IdsFromResponse;

  public play$ = new Subject<GetByIdRequestData>();
  public playPipeline$ = this.play$.asObservable().pipe(
    switchMap((requestData) =>
      combineLatest([
        this.apiService.getById(requestData.player1RequestData.id, requestData.player1RequestData.route),
        this.apiService.getById(requestData.player2RequestData.id, requestData.player2RequestData.route)
      ])
    ),
    map(([player1Response, player2Response]) => ({ player1Response, player2Response })),
    tap((response) => {
      const roundResults = this.calculateRoundResults(response);
      const updatedGameState = {
        player1: {
          playerState: {
            isRoundWon: roundResults.player1Result.isRoundWon,
            score: roundResults.player1Result.score
          },
          properties: response.player1Response.result.properties,
          resource: this.gameState$.value.player1.resource,
          uid: response.player1Response.result.uid
        },
        player2: {
          playerState: {
            isRoundWon: roundResults.player2Result.isRoundWon,
            score: roundResults.player2Result.score
          },
          properties: response.player2Response.result.properties,
          resource: this.gameState$.value.player2.resource,
          uid: response.player2Response.result.uid
        }
      } as GameState;

      this.gameState$.next(updatedGameState);
      this.isLoading$.next(false);
    })
  );

  public vm$ = combineLatest([this.getAll$, this.isLoading$.asObservable(), this.gameState$.asObservable()]).pipe(
    map(([getAllData, isLoading, gameState]) => ({ getAllData, isLoading, gameState })),
    tap((vm) => {
      this.idsFromResponse = {
        peopleIds: vm.getAllData[0].results.map((result) => result.uid),
        starshipsIds: vm.getAllData[1].results.map((result) => result.uid)
      };
    })
  );

  constructor(private readonly apiService: ApiService) {}

  public play() {
    this.isLoading$.next(true);

    const player1DrawData = this.getDrawData(this.gameState$.value.player1.resource);
    const player2DrawData = this.getDrawData(this.gameState$.value.player2.resource);

    const getByIdRequestData = {
      player1RequestData: { id: this.getRandomId(player1DrawData.ids), route: player1DrawData.route },
      player2RequestData: { id: this.getRandomId(player2DrawData.ids), route: player2DrawData.route }
    } as GetByIdRequestData;

    this.play$.next(getByIdRequestData);
  }

  public startNewGame() {
    this.gameState$.next(initialGameState);
  }

  private getDrawData(resource: Resource) {
    return resource === 'people'
      ? { ids: this.idsFromResponse.peopleIds, route: this.peopleRoute }
      : { ids: this.idsFromResponse.starshipsIds, route: this.starshipsRoute };
  }

  private getRandomId(ids: string[]) {
    return Number(ids[Math.floor(Math.random() * ids.length)]);
  }

  private getWeight(properties: Properties) {
    const weight = (<PeopleProperties>properties).mass
      ? (<PeopleProperties>properties).mass
      : (<StarshipProperties>properties).crew;

    const weightWithoutComma = weight.replace(',', '').replace('unknown', '0');
    return Number(weightWithoutComma.includes('-') ? weightWithoutComma.split('-')[1] : weightWithoutComma);
  }

  private calculateRoundResults(response: Response) {
    const player1Weight = this.getWeight(response.player1Response.result.properties);
    const player2Weight = this.getWeight(response.player2Response.result.properties);

    const hasPlayer1Won = player1Weight === player2Weight ? undefined : player1Weight > player2Weight;
    const hasPlayer2Won = player1Weight === player2Weight ? undefined : player2Weight > player1Weight;

    return {
      player1Result: {
        isRoundWon: hasPlayer1Won,
        score: +!!hasPlayer1Won + this.gameState$.value.player1.playerState.score
      },
      player2Result: {
        isRoundWon: hasPlayer2Won,
        score: +!!hasPlayer2Won + this.gameState$.value.player2.playerState.score
      }
    } as RoundResults;
  }
}
