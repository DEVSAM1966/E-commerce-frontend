import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="notificationService.notification$ | async as n"
         class="toast show"
         [class.toast-success]="n.type === 'success'"
         [class.toast-error]="n.type === 'error'"
         [class.toast-info]="n.type === 'info'">
      {{ n.message }}
    </div>
  `,
  styles: [`
    .toast {
      position: fixed;
      top: 1rem;
      right: 1rem;
      padding: 0.75rem 1rem;
      border-radius: 4px;
      color: #fff;
      z-index: 9999;

      opacity: 0;
      transform: translateY(-10px);
      transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .toast.show {
      opacity: 1;
      transform: translateY(0);
    }

    .toast-success { background: #28a745; }
    .toast-error { background: #dc3545; }
    .toast-info { background: #17a2b8; }
  `]
})
export class NotificationComponent {
  constructor(public notificationService: NotificationService) {}
}


