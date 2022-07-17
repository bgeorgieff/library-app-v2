import { Component } from '@angular/core';
import { Images } from 'src/app/Enums/images.enum';
@Component({
  selector: 'app-success-registration',
  templateUrl: './success-registration.component.html',
  styleUrls: ['./success-registration.component.scss'],
})
export class SuccessRegistrationComponent {
  logo = Images.MainLogo;
}
