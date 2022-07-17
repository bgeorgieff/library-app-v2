import { Component } from '@angular/core';
import { Images } from 'src/app/Enums/images.enum';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent {
  logo = Images.MainLogo;
}
