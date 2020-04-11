import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
import { StoreItem } from '../model/StoreItem';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  storeItems: StoreItem[] = [];

  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
      this.storeService.getStoreItems()
        .subscribe( storeItems => this.storeItems = storeItems);
  }

}
