import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { DefaultComponent } from './modules/default/default.component';
import { LoginComponent } from './modules/login/login.component';
import { InvalidRequestComponent } from './shared/components/invalid-request/invalid-request.component';
import { ActivateGuard } from './activate-guard';

// const routes: Routes = [
//   { path: '', redirectTo: 'default', pathMatch: 'full' },
//   {
//     path: 'default',
//     component: DefaultComponent,
//     children: [{
//       path: '',
//       component: DefaultComponent
//     },


//     ]
//   },
//   {
//     path: 'home',
//     loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
//   },
//   {
//     path: 'invalid-request', component: InvalidRequestComponent
//   },
//   { path: '**', redirectTo: 'invalid-request' }
// ];


const routes: Routes = [
  { path: '', redirectTo: 'default', pathMatch: 'full' },
  {
    path: 'default',
    canActivate:[ActivateGuard],
    component: DefaultComponent,
    // loadChildren: () => import('./modules/default/default.module').then(m => m.DefaultModule)
    // loadChildren: async () => (await import('./modules/default/default.module')).DefaultModule,
  },
  {
    path: 'login',    
    component: LoginComponent,    
  },
  {
    path: 'home',
    //loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
    loadChildren: async () => (await import('./modules/home/home.module')).HomeModule,
  },
  {
    path: 'invalid-request', component: InvalidRequestComponent
  },
  { path: '**', redirectTo: 'invalid-request' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
