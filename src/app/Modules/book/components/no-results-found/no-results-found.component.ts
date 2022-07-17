import { Component } from '@angular/core';
import { Images } from 'src/app/Enums/images.enum';

@Component({
  selector: 'app-no-results-found',
  templateUrl: './no-results-found.component.html',
  styleUrls: ['./no-results-found.component.scss'],
})
export class NoResultsFoundComponent {
  svg = Images.NotFound;
}
