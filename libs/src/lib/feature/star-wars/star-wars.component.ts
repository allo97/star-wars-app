import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { combineLatest, map, tap } from 'rxjs';
import { ApiService } from '../../data-access/services/api/api.service';

@Component({
  selector: 'sw-star-wars',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './star-wars.component.html',
  styleUrl: './star-wars.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarWarsComponent {
  private peopleRoute = 'people';
  private starshipsRoute = 'starships';

  constructor(private readonly apiService: ApiService) {}

  public vm$ = combineLatest([
    this.apiService.getAll(this.peopleRoute),
    this.apiService.getAll(this.starshipsRoute)
  ]).pipe(
    map(([people, starships]) => ({ people, starships })),
    tap((data) => {
      console.log(data);
    })
  );

  public play() {
    
  }
}
