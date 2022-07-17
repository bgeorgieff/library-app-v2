import { Component, Input } from '@angular/core';
import { ToastService } from 'src/app/Services/toast.service';
@Component({
  selector: 'app-toast',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss'],
})
export class ToastrComponent {
  @Input() message = '';
  title = '';

  constructor(private toastrService: ToastService) {}

  onSuccess(message: string, title: string) {
    this.toastrService.showSuccess(message, title);
  }
  onError(message: string, title: string) {
    this.toastrService.onError(message, title);
  }
  onInfo(message: string, title: string) {
    this.toastrService.onInfo(message, title);
  }
  onWarning(message: string, title: string) {
    this.toastrService.onWarning(message, title);
  }
}
