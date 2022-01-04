import { NgModule , CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { DefaultComponent } from './default.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: any = [
  {
  path: '',
  component: DefaultComponent
  },  
];

@NgModule({
  declarations: [DefaultComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgbModule
  ],
  exports: [RouterModule],
  entryComponents: [
    
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DefaultModule { }
