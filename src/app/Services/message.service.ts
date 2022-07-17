import { HttpClient } from '@angular/common/http';
import { Message } from '../Constants/message-endpoints';
import { Injectable } from '@angular/core';
import { API } from '../Constants/api-info';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}

  deleteMessage(id: string): Observable<boolean> {
    return this.http.delete<boolean>(API.Endpoint(Message.DeleteById(id)));
  }
}
