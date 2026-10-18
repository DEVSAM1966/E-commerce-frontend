import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderUser } from '../../header-user/header-user';

@Component({
  selector: 'app-sumary-order',
  standalone: true,
  imports: [RouterLink, HeaderUser],
  templateUrl: './sumary-order.html',
  styleUrl: './sumary-order.css',
})
export class SumaryOrder {}
