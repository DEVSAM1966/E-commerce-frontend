import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  type: 'success' | 'error' | 'info';
  message: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notificationSubject = new BehaviorSubject<Notification | null>(null);
  notification$ = this.notificationSubject.asObservable();

  show(type: Notification['type'], message: string) {
    this.notificationSubject.next({ type, message });
    setTimeout(() => this.clear(), 3000); // se oculta a los 3s
  }

  clear() {
    this.notificationSubject.next(null);
  }

  success(message: string) {
    this.show('success', message);
    console.log('NotificationService: success message shown:', message);
  }

  error(message: string) {
    this.show('error', message);
    console.error('NotificationService: error message shown:', message);
  }

  info(message: string) {
    this.show('info', message);
  }
}
