import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
import { StoreItem } from '../model/StoreItem';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  pageSize: number = 5;
  storeItems: StoreItem[] = [];

  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
      this.loadStoreItems({offset: 0, pageSize: this.pageSize});
  }

  loadStoreItems(filter?: {}) {
    this.storeService.getStoreItems(filter)
      .subscribe( storeItems => this.storeItems = storeItems);
  }

  changePage(e) {
    this.loadStoreItems(
      {
        offset: e.pageIndex * e.pageSize, 
        pageSize: e.pageSize
      }
    );
  }

}
