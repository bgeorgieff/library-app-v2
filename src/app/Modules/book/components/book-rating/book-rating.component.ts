import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Images } from 'src/app/Enums/images.enum';

@Component({
  selector: 'app-book-rating',
  templateUrl: './book-rating.component.html',
  styleUrls: ['./book-rating.component.scss'],
})
export class BookRatingComponent {
  star = Images.Star;
  star_empty = Images.StarEmpty;

  maxRating = [1, 2, 3, 4, 5];
  @Input() rating = 0;
  @Input() editable = false;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();
  ratingInitialValue = 1;

  changeRating(event: MouseEvent, rating?: number) {
    if (this.editable) {
      if (event.type === 'click' && rating) {
        this.rating = rating;
        this.ratingInitialValue = rating;
      } else if (event.type === 'mouseover' && rating) {
        this.rating = rating;
      } else if (event.type === 'mouseout') {
        this.rating = this.ratingInitialValue;
      }

      this.ratingChange.emit(this.rating);
    }
  }
}
