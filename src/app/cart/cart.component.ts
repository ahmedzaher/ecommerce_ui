import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items: any = [];
  cartId: number;
  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

  private loadCartItems() {
    this.cartService.getUserCart()
      .subscribe(result => {
        if(result) {
          this.items = result.items;
          this.cartId = result.id;
        }
        
      });
  }

}
