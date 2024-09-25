import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Properties } from '../../util/models/star-wars-models';
import { CardData } from './../../util/models/star-wars-models';

@Component({
  selector: 'sw-card-data',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './card-data.component.html',
  styleUrl: './card-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardDataComponent<T extends Properties> {
  @Input({ required: true }) public cardData?: CardData<T>;
  @Input({ required: true }) public player?: string;
  @Input({ required: true }) public isLoading = false;

  public resources = ['people', 'starship'];
}
