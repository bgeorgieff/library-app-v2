import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/Services/loader.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinnerComponent implements OnDestroy {
  isVisible!: boolean;
  subscription!: Subscription;

  constructor(private loaderService: LoaderService) {
    this.subscription = this.loaderService.isLoading$().subscribe({
      next: (isVisible) => {
        this.isVisible = isVisible;
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
