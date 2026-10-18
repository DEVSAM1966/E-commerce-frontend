import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-user',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-user.html',
  styleUrl: './header-user.css',
})
export class HeaderUser {}
