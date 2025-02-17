import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ClientComponent } from './client/client.component';
import { DetailclientComponent } from './detailclient/detailclient.component';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'client', component: ClientComponent  ,canActivate: [AuthGuardService]},
  { path: 'detailclient/:id', component: DetailclientComponent , canActivate: [AuthGuardService] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }




  // { path: '', redirectTo: '/client', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
