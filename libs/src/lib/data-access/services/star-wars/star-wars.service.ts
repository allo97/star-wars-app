import { Injectable } from '@angular/core';
import {
  IdsCollection,
  PeopleProperties,
  Properties,
  RoundResult,
  StarshipProperties
} from '../../../util/models/star-wars-models';

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {
  public idsCollection = {} as IdsCollection;

  public getRandomId(ids: string[]) {
    return Number(ids[Math.floor(Math.random() * ids.length)]);
  }

  public getRoundResults(player1Properties: Properties, player2Properties: Properties) {
    const player1Weight = this.convertWeight(this.mapPropertiesToWeight(player1Properties));
    const player2Weight = this.convertWeight(this.mapPropertiesToWeight(player2Properties));

    const player1Result =
      player1Weight === player2Weight
        ? RoundResult.Draw
        : player1Weight > player2Weight
        ? RoundResult.Win
        : RoundResult.Lose;

    const player2Result =
      player1Weight === player2Weight
        ? RoundResult.Draw
        : player2Weight > player1Weight
        ? RoundResult.Win
        : RoundResult.Lose;

    return {
      player1Result,
      player2Result
    };
  }

  public mapPropertiesToWeight(properties: Properties) {
    return (<PeopleProperties>properties).mass
      ? (<PeopleProperties>properties).mass
      : (<StarshipProperties>properties).crew;
  }

  public convertWeight(weight: string) {
    const weightWithoutComma = weight.replace(',', '').replace('unknown', '0');
    return Number(weightWithoutComma.includes('-') ? weightWithoutComma.split('-')[1] : weightWithoutComma);
  }
}
