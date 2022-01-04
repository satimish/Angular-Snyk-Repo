import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './shared/data.service';

@Injectable()
export class ActivateGuard implements CanActivate {   

    constructor(
        private router: Router,
        private dataService: DataService,
        
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(this.dataService.isLoggedIn()==false){
            this.router.navigateByUrl('/login');
           return false;
        }
        else {
            return true;
        }
    }
}