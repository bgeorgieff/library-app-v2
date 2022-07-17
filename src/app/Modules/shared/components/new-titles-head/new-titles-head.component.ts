import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { SwitchCardsViewService } from 'src/app/Services/switch-cards-view.service';

@Component({
  selector: 'app-new-titles-head',
  templateUrl: './new-titles-head.component.html',
  styleUrls: ['./new-titles-head.component.scss'],
})
export class NewTitlesHeadComponent {
  @Input() title = '';
  @Input() showResult = true;
  @Input() count = 0;
  subscriptions: Subscription[] = [];
  isBlockView!: boolean;

  constructor(private switchCardsViewService: SwitchCardsViewService) {
    this.isBlockView = this.switchCardsViewService.getIsBlockViewDefault();
  }

  setView(blockView: boolean) {
    this.switchCardsViewService.changeBlockView(blockView);
    this.isBlockView = blockView;
    localStorage.setItem('isBlockView', this.isBlockView.toString());
  }
}
