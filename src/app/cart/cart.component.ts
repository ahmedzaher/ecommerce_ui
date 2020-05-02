import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { AlertsService } from '../alerts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items: any = [];
  cartId: number;
  constructor(
    private cartService: CartService,
    private alertService: AlertsService
  ) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

  private loadCartItems() {
    this.cartService.getUserCart()
      .subscribe(result => {
        console.log(result);
        if(result) {
          this.items = result.items;
          this.cartId = result.id;
        } else {
          this.alertService.addFail('Failed to load cart');
        }
      });
  }

}
