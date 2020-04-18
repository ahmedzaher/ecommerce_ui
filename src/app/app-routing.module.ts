import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CartComponent } from './cart/cart.component';


const routes: Routes = [
  {path: '', redirectTo: '/store', pathMatch: 'full'},
  {path: 'store', component: StoreComponent},
  {path: 'authenticate', component: AuthenticationComponent},
  {path: 'cart', component: CartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
