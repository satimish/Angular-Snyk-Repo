import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { PopoverComponent } from './components/popover/popover.component';
import { SearchComponent } from './components/search/search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GridComponent } from './components/grid/grid.component';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TooltipComponent,
    PopoverComponent,
    SearchComponent,
    GridComponent,
    ReactiveFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgbModule,
    ReactiveFormsModule
  ],
  exports:[
    TooltipComponent,
    PopoverComponent,
    SearchComponent,
    GridComponent,
    ReactiveFormComponent
  ],
  entryComponents: [
    TooltipComponent,
    PopoverComponent,
    SearchComponent,
    GridComponent,
    ReactiveFormComponent
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: []
    }
  }
}
