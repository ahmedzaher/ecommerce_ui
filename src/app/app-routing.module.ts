import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { AuthenticationComponent } from './authentication/authentication.component';


const routes: Routes = [
  {path: '', redirectTo: '/store', pathMatch: 'full'},
  {path: 'store', component: StoreComponent},
  {path: 'authenticate', component: AuthenticationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
