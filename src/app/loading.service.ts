import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loading: boolean;

  constructor() { }

  showLoading() {
    this.loading = true;
  }
  hideLoading() {
    this.loading = false;
  }
  isLoading(): boolean {
    return this.loading;
  }
}
