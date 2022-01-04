import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient } from "@angular/common/http";
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DefaultModule } from './modules/default/default.module';
import { InvalidRequestComponent } from './shared/components/invalid-request/invalid-request.component';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import {HomeModule} from './modules/home/home.module';
import { LoginComponent } from './modules/login/login.component';
import { ActivateGuard } from './activate-guard';
import { DataService } from './shared/data.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    InvalidRequestComponent,
    LoginComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    DefaultModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    HomeModule,
    HttpClientModule
  ],
  providers: [DataService,ActivateGuard,HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
