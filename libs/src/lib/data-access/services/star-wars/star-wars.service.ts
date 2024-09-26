import { Injectable } from '@angular/core';
import {
  IdsFromResponse,
  PeopleProperties,
  Properties,
  Resource,
  StarshipProperties
} from '../../../util/models/star-wars-models';

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {
  public peopleRoute = 'people';
  public starshipsRoute = 'starships';
  public idsFromResponse = {} as IdsFromResponse;

  public getDrawData(resource: Resource) {
    return resource === 'people'
      ? { ids: this.idsFromResponse.peopleIds, route: this.peopleRoute }
      : { ids: this.idsFromResponse.starshipIds, route: this.starshipsRoute };
  }

  public getRandomId(ids: string[]) {
    return Number(ids[Math.floor(Math.random() * ids.length)]);
  }

  public hasPlayer1Won(player1Properties: Properties, player2Properties: Properties) {
    const player1Weight = this.convertWeight(this.mapPropertiesToWeight(player1Properties));
    const player2Weight = this.convertWeight(this.mapPropertiesToWeight(player2Properties));

    return player1Weight === player2Weight ? undefined : player1Weight > player2Weight;
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
