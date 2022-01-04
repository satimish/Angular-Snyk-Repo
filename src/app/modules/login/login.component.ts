import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../shared/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;

  constructor(private dataService: DataService, private router: Router,) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(form: FormGroup) {
    if ((form.value.username == "abc") && (form.value.password == "123")){
      this.dataService.doLogin();
      alert('Logged In Successfully');
      this.router.navigateByUrl('/default');
    }
    else {
      this.dataService.isLogin = false;
      alert('Invalid Credentials');
    }
  }


}
