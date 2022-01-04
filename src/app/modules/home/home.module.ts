import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { HomeComponent } from '../home/home.component';
import { RouterModule, Routes } from '@angular/router';
//import { SharedModule } from '../../shared/shared.module'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: any = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'profile/:id',
    component: ProfileComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  }
];

@NgModule({
  declarations: [HomeComponent, ProfileComponent],
  imports: [
    CommonModule,
    MaterialModule,
    //SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbModule,
  ],
  exports: [RouterModule],
  entryComponents: [

  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
