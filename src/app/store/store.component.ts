import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StoreService } from '../store.service';
import { StoreItem } from '../model/StoreItem';
import { CartService } from '../cart.service';
import { AuthenticationService } from '../authentication.service';
import { CommunicatationService } from '../communicatation.service';
import { AlertsService } from '../alerts.service';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  pageSize: number = 5;
  storeItems: StoreItem[] = [];

  @Output() requireAuthentication = new EventEmitter();
  constructor(
    private communicatationService: CommunicatationService,
    private authenticationService: AuthenticationService,
    private loadingService: LoadingService,
    private alertsService: AlertsService, 
    private storeService: StoreService,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
      this.loadStoreItems({offset: 0, pageSize: this.pageSize});
  }

  loadStoreItems(filter?: {}) {
    this.loadingService.showLoading();
    this.storeService.getStoreItems(filter)
      .subscribe( storeItems => {
        this.loadingService.hideLoading();
        if(storeItems) {
          this.storeItems = storeItems;
        } else {
          this.alertsService.addFail("Failed to load store");
        }
        
      });
  }

  addToCart(itemId: number, itemName: string) {
    if(!this.isAuthenticated()) {
      this.communicatationService.requireAuthenticationEmit();
      return;
    }
    this.loadingService.showLoading();
    this.cartService.addToCart(itemId).subscribe(
      result => {
        this.loadingService.hideLoading();
        if(result) {
          this.alertsService.addSuccess(`${itemName} add to cart`);
        } else {
          this.alertsService.addFail("Failed to load store");
        }
      }
    );
  }

  changePage(e) {
    this.loadStoreItems(
      {
        offset: e.pageIndex * e.pageSize, 
        pageSize: e.pageSize
      }
    );
  }

  isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated();
  }

}
