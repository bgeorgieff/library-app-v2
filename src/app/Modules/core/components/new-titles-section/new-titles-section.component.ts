import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBookView } from 'src/app/Interfaces/book/book-view.interface';
import { SwitchCardsViewService } from 'src/app/Services/switch-cards-view.service';

@Component({
  selector: 'app-new-titles-section',
  templateUrl: './new-titles-section.component.html',
  styleUrls: ['./new-titles-section.component.scss'],
})
export class NewTitlesSectionComponent implements OnInit, OnDestroy {
  @Input() books: IBookView[] = [];
  subscriptions: Subscription[] = [];
  isBlockView!: boolean;

  constructor(private switchCardViewService: SwitchCardsViewService) {
    this.isBlockView = this.switchCardViewService.getIsBlockViewDefault();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.switchCardViewService.isBlockView.subscribe({
        next: (isBlockView) => {
          this.isBlockView = isBlockView;
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
