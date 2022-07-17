import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastrServices: ToastrService) {}

  showSuccess(message: string, title: string) {
    this.toastrServices.success(message, title);
  }
  onError(message: string, title: string) {
    this.toastrServices.error(message, title);
  }
  onInfo(message: string, title: string) {
    this.toastrServices.info(message, title);
  }
  onWarning(message: string, title: string) {
    this.toastrServices.warning(message, title);
  }
}
