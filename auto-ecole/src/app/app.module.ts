import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ClientComponent } from './client/client.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';  
import { AddClientComponent } from './add-client/add-client.component';  
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DetailclientComponent } from './detailclient/detailclient.component';
import { AddSeanceComponent } from './add-seance/add-seance.component';
import { AddPaiementComponent } from './add-paiement/add-paiement.component';
import { AddExmaneComponent } from './add-exmane/add-exmane.component';
import { IntercepterService } from './service/intercepter.service';




@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ClientComponent,
    AddClientComponent,
    DetailclientComponent,
    AddSeanceComponent,
    AddPaiementComponent,
    AddExmaneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: IntercepterService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
