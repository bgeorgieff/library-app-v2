import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-section',
  templateUrl: './info-section.component.html',
  styleUrls: ['./info-section.component.scss'],
})
export class InfoSectionComponent {
  title = 'The Curious Readers';
  @Input() booksCount = 0;
  @Input() genresCount = 0;
  @Input() readersCount = 0;
}
