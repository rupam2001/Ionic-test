import { Injectable } from '@angular/core';
// import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}
  showNotification(text: string) {
    // this.localNotifications.schedule({ id: 1, text: text });
  }
}
