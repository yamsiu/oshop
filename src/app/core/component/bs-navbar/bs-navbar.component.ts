import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../shared/service/auth.service';
import {AppUser} from '../../../shared/models/app-user';
import {ShoppingCartService} from '../../../shared/service/shopping-cart.service';
import {ShoppingCart} from '../../../shared/models/shopping-cart';
import {Observable} from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  navbarCollapsed: boolean;
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
  }
  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.shoppingCartService.getCart();

  }

  logout() {
    this.auth.logout();
  }

}
