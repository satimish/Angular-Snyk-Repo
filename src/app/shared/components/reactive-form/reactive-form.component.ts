import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';


@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {
  myForm: FormGroup;

  genders=['male','female']

  constructor() { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(5), Validators.minLength(3)]),
      lastName: new FormControl(''),
      email: new FormControl('', Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')),
      gender: new FormControl('male', Validators.required),
      selected: new FormControl(null,[Validators.required,Validators.pattern('valid')]),
      date:new FormControl(''),
    });
    this.customValidation();
  }

  customValidation() {
    this.myForm.get("lastName").setValidators([Validators.required]);
    this.myForm.get("lastName").updateValueAndValidity();

    //this.myForm.disable();
  }

  onSubmit(form: FormGroup) {
    debugger
    let form2 = form;
    console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.firstName);
    console.log('Email', form.value.lastName);
  }

}
