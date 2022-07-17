import { Component, OnInit } from '@angular/core';
import { SignalrService } from './Services/signalr.service';
import { StorageService } from './Services/storage.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'the-curious-readers-fe';
  constructor(
    private storageService: StorageService,
    private signalR: SignalrService
  ) {}

  ngOnInit() {
    // Starting new connection on page refresh
    if (this.storageService.getToken()) {
      this.signalR.startConnection();
      this.signalR.watchForMessages();
    }
  }
}
